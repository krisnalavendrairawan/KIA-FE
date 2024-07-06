import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Pagination from "@mui/material/Pagination";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import { Box } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import { useNavigate } from "react-router-dom";
import dataAnak from "./data/dataAnak";

function Tables() {
  if (!localStorage.getItem('token')) {
    window.location.href = '/authentication/sign-in';
  }

  const navigate = useNavigate();
  const { columns, rows } = dataAnak();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleCreateAnak = () => {
    navigate('/anak/create');
  };

  const handleSearch = (event) => {
    const value = event.target.value;
    console.log("Search term:", value);
    setSearchTerm(value);
    setPage(1); // Reset to first page on search
  };


  const filteredRows = rows.filter((row) =>
    ['nama_anak', 'nik', 'no_kk', 'nama_ibu', 'nama_ayah', 'jenis_kelamin', 'tanggal_lahir', 'bb_lahir', 'pb_lahir', 'alamat'].some(
      (field) => {
        if (field === 'nama_anak') {
          return row[field].props.nama_anak.toLowerCase().includes(searchTerm.toLowerCase());
        } else if (field === 'nama_ibu') {
          return row.orang_tua.props.nama_ibu.toLowerCase().includes(searchTerm.toLowerCase());
        } else if (field === 'nama_ayah') {
          return row.orang_tua.props.nama_ayah.toLowerCase().includes(searchTerm.toLowerCase());
        } else {
          return String(row[field]).toLowerCase().includes(searchTerm.toLowerCase());
        }
      }
    )
  );





  console.log("Filtered rows:", filteredRows);

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Stack direction="row" justifyContent="flex-start" alignItems="flex-start" spacing={3}>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', marginTop: '1rem' }}>
          <Button variant="contained" id="create-button" onClick={handleCreateAnak}>
            <AddIcon sx={{ marginRight: '10px' }} /> Tambah Data Anak
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
                  Tabel Daftar Anak
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{
                    columns,
                    rows: filteredRows.slice(startIndex, endIndex)
                  }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
              <MDBox display="flex" justifyContent="center" pt={2}>
                <Pagination
                  count={Math.ceil(filteredRows.length / rowsPerPage)}
                  page={page}
                  onChange={handleChangePage}
                  color="primary"
                  size="large"
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

export default Tables;
