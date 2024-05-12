import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import Footer from "layouts/authentication/components/Footer";

function Cover() {
  if(localStorage.getItem('token')) window.location.href = '/dashboard';
  return (
    <MDBox>
      <CoverLayout image={bgImage}>
        <Card sx={{ width: '200%', margin: 'auto', right:'50%', '@media (max-width:600px)': { width: '100%', left:'0' } }}>
          <MDBox
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="success"
            mx={2}
            mt={-10}
            p={3}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              Daftar Sebagai Kader
            </MDTypography>
            <MDTypography display="block" variant="button" color="white" my={1}>
              Enter your email and password to register
            </MDTypography>
          </MDBox>
          <MDBox pt={1} pb={3} px={3}>
            <MDBox component="form" role="form">
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <MDBox mb={2} mt={2}>
                    <MDInput type="number" label="NIK" variant="standard" fullWidth />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6}>
                  <MDBox mb={2} mt={2}>
                    <MDInput type="text" label="Nama" variant="standard" fullWidth />
                  </MDBox>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <MDBox mb={2} mt={2}>
                    <MDInput type="number" label="Telepon" variant="standard" fullWidth />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6}>
                  <MDBox mb={2} mt={2}>
                    <MDInput type="text" label="Username" variant="standard" fullWidth />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6}>
                  <MDBox mb={2} mt={2}>
                    <MDInput type="email" label="Email" variant="standard" fullWidth />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6}>
                  <MDBox mb={2} mt={2}>
                    <MDInput type="password" label="Password" variant="standard" fullWidth />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6}>
                  <MDBox mb={2} mt={2}>
                    <MDInput type="password" label="Confirm Password" variant="standard" fullWidth />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6}>
                  <MDBox mb={2} mt={2}>
                    <MDInput type="text" label="Jenis Kelamin" variant="standard" fullWidth />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6}>
                  <MDBox mb={2} mt={2}>
                    <MDInput type="number" label="RT" variant="standard" fullWidth />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6}>
                  <MDBox mb={2} mt={2}>
                    <MDInput type="number" label="RW" variant="standard" fullWidth />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6}>
                  <MDBox mb={2} mt={2}>
                    <MDInput type="text" label="RW" variant="standard" fullWidth sx={{display:'none'}} value='kader' disabled/>
                  </MDBox>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                  <MDBox mb={2} mt={2}>
                    <MDInput type="text" label="Alamat" variant="standard" fullWidth />
                  </MDBox>
                </Grid>
              </Grid>
              <MDBox  mb={1}>
                <MDButton variant="gradient" color="info" fullWidth>
                  Sign in
                </MDButton>
              </MDBox>
              <MDBox mt={3} mb={1} textAlign="center">
                <MDTypography variant="button" color="text">
                  Already have an account?{" "}
                  <MDTypography
                    component={Link}
                    to="/authentication/sign-in"
                    variant="button"
                    color="info"
                    fontWeight="medium"
                    textGradient
                  >
                    Sign In
                  </MDTypography>
                </MDTypography>
              </MDBox>
            </MDBox>
          </MDBox>
        </Card>
      </CoverLayout>
      {/* <MDBox id="footer" sx={{ display: { xs: 'none', sm: 'block' } }}>
        <Footer />
      </MDBox> */}
    </MDBox>
  );
}

export default Cover;
