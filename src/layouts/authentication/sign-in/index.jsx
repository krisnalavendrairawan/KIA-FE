

import { useState } from "react";
import axios from "axios";
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import TextField from '@mui/material/TextField';
import { token } from "index";
import { useNavigate } from "react-router-dom";
//import sweetalert2 
import Swal from 'sweetalert2';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import { Button } from "@mui/material";

function Basic() {
  if (localStorage.getItem('token')) window.location.href = '/dashboard';
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const { control, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    try {
      //cek apakah username dan password di isi atau tidak jika tidak maka akan muncul alert
      if (data.username === "" || data.password === "") {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Username dan password tidak boleh kosong!'
        })
      }

      else {
        const response = await axios.post('http://127.0.0.1:8000/api/login', data, {
          headers: {
            'Content-Type': 'application/json',
          }
        }).then((response) => {
          console.log(response.data);
          if (response.data.role === "kader" || response.data.role === "admin") {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', response.data.nama);
            localStorage.setItem('username', response.data.username);
            localStorage.setItem('id_user', response.data.id_user);
            localStorage.setItem('role', response.data.role);
            navigate('/admin/dashboard');
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Login Gagal',
              text: 'Username atau Password Salah',
            });
          }
        }).catch((error) => {
          //berikan pesan error jika login gagal
          Swal.fire({
            icon: 'error',
            title: 'Login Gagal',
            text: 'Username atau Password Salah',
          });
        });
      }


    } catch (error) {
      console.log(error);
    }
    console.log(data);
  }

  return (
    <MDBox>
      <DefaultNavbar
        action={{
          type: "internal",
          route: "/authentication/sign-in/bidan",
          label: "Login Sebagai Bidan",
          color: "dark",
        }}
      />
      <BasicLayout image={bgImage}>
        <Card>
          <MDBox
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="info"
            mx={2}
            mt={-3}
            p={2}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              Login Kader
            </MDTypography>
          </MDBox>
          <MDBox pt={4} pb={3} px={3}>
            <MDBox component="form" role="form" onSubmit={handleSubmit(onSubmit)}>
              <MDBox mb={2}>
                <Controller
                  name="username"
                  control={control}
                  defaultValue=""
                  render={({ field }) => <TextField fullWidth {...field} label="Username" variant="outlined" />}
                />
              </MDBox>
              <MDBox mb={2}>
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  render={({ field }) => <TextField fullWidth {...field} label="Password" variant="outlined" type="password" />}
                />
              </MDBox>
              <MDBox display="flex" alignItems="center" ml={-1}>
                <Switch checked={rememberMe} onChange={handleSetRememberMe} />
                <MDTypography
                  variant="button"
                  fontWeight="regular"
                  color="text"
                  onClick={handleSetRememberMe}
                  sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                >
                  &nbsp;&nbsp;Remember me
                </MDTypography>
              </MDBox>
              <MDBox mt={4} mb={1}>
                <MDButton variant="gradient" color="info" fullWidth type="submit">
                  Login
                </MDButton>
              </MDBox>
              <Grid
                mt={3} mb={1} textAlign="center"
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
              >


                {/* <MDTypography variant="button" color="text">
                {" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Login sebagai Bidan
                </MDTypography>
              </MDTypography> */}
                <MDTypography variant="button" color="text" >
                  {" "}
                  <Button variant="contained" id='back-button'
                    href="/home">
                    <ReplyAllIcon sx={{ marginRight: 1 }} />
                    Kembali
                  </Button>
                </MDTypography>
              </Grid>
            </MDBox>
          </MDBox>
        </Card>
      </BasicLayout>
    </MDBox>

  );
}

export default Basic;
