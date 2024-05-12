import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Pagination from "@mui/material/Pagination";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

// Import komponen Material Dashboard 2 React
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Import dataAnak
import dataAnak from "./data/dataAnak";
function Tables() {
  //cek terlebih dahulu apakah ada token yang tersimpan di localStorage jika tidak maka akan diarahkan ke halaman sign-in
  if (!localStorage.getItem('token')) {
    window.location.href = '/authentication/sign-in';
  }
  
  // Destructure dataAnak
  const { columns, rows } = dataAnak();
  
  // State untuk jumlah baris per halaman dan halaman yang aktif
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);

  // Fungsi untuk mengatur halaman yang aktif
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Menghitung indeks awal dan akhir data untuk ditampilkan di halaman yang sedang aktif
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Stack direction="row" justifyContent="flex-end" alignItems="flex-end" spacing={3}>
        {/* Tombol "Tambah Anak" dengan logo */}
        <Button
          variant="contained"
          style={{ backgroundColor: 'green', color: '#ffffff' }}
          startIcon={<AddIcon />}
          href="/anak/create"
        >
          Tambah Anak
        </Button>
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
                    // Menampilkan data sesuai dengan halaman yang sedang aktif
                    rows: rows.slice(startIndex, endIndex)
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
                  count={Math.ceil(rows.length / rowsPerPage)}
                  page={page}
                  onChange={handleChangePage}
                  color="primary"
                  size="large"
                  // Menampilkan jumlah halaman yang ditampilkan
                    showFirstButton
                    showLastButton
                    shape="rounded"
                    style={{marginBottom: "20px"}}
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
