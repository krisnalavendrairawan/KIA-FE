import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Header from "layouts/user/profile/header";

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "examples/Lists/ProfilesList";
import profilesListData from "layouts/profile/data/profilesListData";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import team3 from "assets/images/team-3.jpg";



import MDBox from "components/MDBox";

const ProfilDetailUser = () => {
    const [data, setData] = useState([]);
    const [otherData, setOtherData] = useState([]);
    const { id } = useParams();

    const getUser = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/getUser/${id}`);
            setData(response.data.user);
            // console.log(response.data.user);
        } catch (error) {
            console.error(error);
        }
    };

    const getOtherUser = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/getAllUser`);
            // console.log(response.data.users)
            const filteredData = response.data.users.filter(user => user.id !== parseInt(id));
            setOtherData(filteredData);
            // console.log(filteredData);
            
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getUser();
    }, [id]);

    useEffect(() => {
        getOtherUser();
    }, [id]);

    const transformOtherData = (otherData) => {
        return otherData.map(user => ({
            image: team3, // Ganti dengan path gambar default jika tidak ada gambar
            name: user.nama,
            description: `${user.role}`,
            action: {
                type: "internal",
                route: `/user/detail/${user.id}`,
                color: "info",
                label: "view",
            },
        }));
    };


    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox mb={2} />
            <Header data={data} />
            <MDBox mt={5} mb={3} display="flex" justifyContent="center" alignItems="center">
                <Grid container spacing={3} sx={{ justifyContent: "center", display: "flex" }}>
                    <Grid item xs={12} md={6} xl={4} sx={{ display: "flex", justifyContent: "center" }}>
                        <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
                        <ProfileInfoCard
                            title="Profile Information"
                            description={`Halo Nama saya ${data.nama}. Saya adalah seorang ${data.role} Posyandu di sini. Saya sangat senang bisa menjadi bagian dari tim ini dan siap bertugas untuk membantu meningkatkan kesehatan dan kesejahteraan masyarakat, terutama ibu dan anak-anak.`}
                            info={{
                                Nama: data.nama,
                                nik: data.nik,
                                username: data.username,
                                email: data.email,
                                Telepon: data.telepon,
                                alamat: `${data.alamat}, RT ${data.rt}/RW ${data.rw}`,
                            }}
                            social={[]}
                            action={{ route: `/user/edit/${data.id}/`, tooltip: "Edit Profile" }}
                            shadow={false}
                        />
                        <Divider orientation="vertical" sx={{ mx: 0 }} />
                    </Grid>
                    <Grid item xs={12} xl={4}>
                        <ProfilesList title="User Lainnya" profiles={transformOtherData(otherData)} otherData={otherData} shadow={false} />
                    </Grid>
                </Grid>
            </MDBox>
        </DashboardLayout>
    );
};

export default ProfilDetailUser;
