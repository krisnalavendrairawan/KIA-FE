import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Pagination from "@mui/material/Pagination";
import Stack from '@mui/material/Stack';
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import { Alert } from "@mui/material";
import VaccinesIcon from '@mui/icons-material/Vaccines';

// Import komponen Material Dashboard 2 React
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import { useNavigate } from "react-router-dom";

// Import dataUser
import dataUser from "./data/dataUser";
import SessionExpired from "layouts/authentication/log-out/session";



const User = () => {

  SessionExpired();
  const navigate = useNavigate();
  const { columns, rows } = dataUser();

  // State for the number of rows per page and active page
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  // Function to set the active page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const handleCreateUser = () => {
    navigate('/user/create');
  }

  const handleSearch = (event) => {
    const value = event.target.value;
    console.log("Search term:", value);
    setSearchTerm(value);
    setPage(1); // Reset to first page on search
  };

  const filteredRows = rows.filter((row) =>
    ['nama', 'nik', 'alamat', 'telepon', 'username', 'email', 'password', 'jenis_kelamin', 'rt', 'rw', 'role'].some(
      (field) => {
        if (field === 'nama') {
          return row[field].props.nama.toLowerCase().includes(searchTerm.toLowerCase());
        } else {
          return String(row[field]).toLowerCase().includes(searchTerm.toLowerCase());
        }
      }
    )
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <Stack direction="row" justifyContent="flex-start" alignItems="flex-start" spacing={3}>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', marginTop: '1rem' }}>
          <Button variant="contained" id="create-button" onClick={handleCreateUser}>
            <AddIcon sx={{ marginRight: '10px' }} /> Tambah Data User
          </Button>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', marginTop: '1rem' }}>
          <TextField
            id="search-bar"
            label="Cari Data Anak"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearch}
          />
        </Box>
      </Stack>
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Tabel Daftar User
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{
                    columns,
                    // Displaying filtered data based on the active page
                    rows: filteredRows.slice(startIndex, endIndex)
                  }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
              {/* Pagination */}
              <MDBox display="flex" justifyContent="center" pt={2}>
                <Pagination
                  count={Math.ceil(filteredRows.length / rowsPerPage)}
                  page={page}
                  onChange={handleChangePage}
                  color="primary"
                  size="large"
                  // Showing the number of pages displayed
                  showFirstButton
                  showLastButton
                  shape="rounded"
                  style={{ marginBottom: "20px" }}
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}



export default User;