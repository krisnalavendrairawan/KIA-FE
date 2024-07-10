// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { useState, useEffect } from "react";
import axios from "axios";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import { useNavigate } from "react-router-dom";
import MainFeaturedPost from "./mainFeaturedPost";
import Schedule from "./infoUser";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";

import SessionExpired from "layouts/authentication/log-out/session";
const role = localStorage.getItem('role');
const user = localStorage.getItem('user');
const url = 'http://127.0.0.1:8000/api'
const mainFeaturedPost = {
  title: 'Selamat Datang di Aplikasi Posyandu Cibeusi',
  description: `Anda login sebagai ${role}. Anda dapat meninjau data anak yang terdaftar di posyandu cibeusi, melihat data imunisasi anak, dan melihat data pertumbuhan anak.`,
  image: 'https://source.unsplash.com/random?wallpapers',
  imageText: 'main image description',
};

const Jadwal = {
  title: `User yang sedang Login`,
  description: 'This is a wider card with supporting text below as a natural lead-in to additional content.',
  image: 'https://source.unsplash.com/random?wallpapers',
  imageLabel: 'Image Text',
}

function Dashboard() {
  SessionExpired();
  const [totalChild, setTotalChild] = useState(0);
  const [totalKader, setTotalKader] = useState(0);
  const [totalBidan, setTotalBidan] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resultAnak = await axios.get(`${url}/getAnak`);
        const data = resultAnak.data.anak;
        //hitung jumlah anak
        setTotalChild(data.length);
        const resultKader = await axios.get(`${url}/getKader`);
        const dataKader = resultKader.data.kader;
        //hitung jumlah kader
        setTotalKader(dataKader.length);
        const resultBidan = await axios.get(`${url}/getBidan`);
        const dataBidan = resultBidan.data.bidan;
        //hitung jumlah bidan
        setTotalBidan(dataBidan.length);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person"
                title="Total Anak"
                count={totalChild ? totalChild : 0}
                percentage={{
                  color: "success",
                  label: "Jumlah Anak yang terdaftar di aplikasi posyandu cibeusi",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person"
                title="Total Kader"
                count={totalKader ? totalKader : 0}
                percentage={{
                  color: "success",
                  label: "Jumlah Kader yang terdaftar di aplikasi posyandu cibeusi",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person"
                title="Total Bidan"
                count={totalBidan ? totalBidan : 0}
                percentage={{
                  color: "success",
                  label: "Jumlah Bidan yang terdaftar di aplikasi posyandu cibeusi",
                }}
              />
            </MDBox>
          </Grid>
          {/* <Grid item xs={12} md={9} lg={9}>
            <MDBox mb={1.5}>
              <Schedule post={Jadwal} />
            </MDBox>
          </Grid> */}
        </Grid>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <Projects />
            </Grid>
            {/* <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid> */}
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
