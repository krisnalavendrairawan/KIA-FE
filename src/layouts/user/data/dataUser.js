import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";
import useUserRole from "hooks/useUserRole";

import useDeleteData from "hooks/useDelete";

import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";

export default function DataUser() {
    const [datas, setDatas] = useState([]);
    const { loading: deleteLoading, error: deleteError, deleteData } = useDeleteData("http://127.0.0.1:8000/api/deleteUser");
    const userRole = useUserRole();

    //get user menggunakan async await
    const getUser = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/getAllUser`,{
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                  }
            })
            console.log(response.data.users);
            setDatas(response.data.users);
            console.log("Data fetched: ", response.data.users);
        }catch (error) {
            console.error("Error fetching data: ", error);
        }
    }

    useEffect(() => {
      getUser();
  }, []);

  const handleDelete = async (id) => {
    console.log("Delete action for row id:", id);
    await deleteData(id, setDatas);
    // await deleteData(id, setDatas);
};


    const Users = ({ image, nama, nik, role }) => (
        <MDBox display="flex" alignItems="center" lineHeight={1}>
          <MDAvatar src={image} name={nama} size="sm" />
          <MDBox ml={2} lineHeight={1}>
            <MDTypography display="block" variant="button" fontWeight="medium">
              {nama}
            </MDTypography>
            <MDTypography variant="caption">{role}</MDTypography>
          </MDBox>
        </MDBox>
      );

    Users.propTypes = {
        image: PropTypes.string.isRequired,
        nama: PropTypes.string.isRequired,
        nik: PropTypes.string.isRequired,
        role: PropTypes.string.isRequired,
    };

    const rows = datas.map((data, index) => ({
        nama: <Users image={team3} nama={data.nama} role={String(data.role)} />,
        nik: String(data.nik),
        role: data.role,
        username: data.username,
        // password: data.password,
        email: data.email,
        alamat: data.alamat,
        jenis_kelamin: data.jenis_kelamin,
        rt: data.rt,
        rw: data.rw,
        action: (
          <MDBox>
          <MDTypography
            component={Link}
            to={`/user/detail/${data.id}`}
            variant="caption"
            color="info"
            fontWeight="medium"
            style={{ marginRight: 8 }}
          >
            Lihat
          </MDTypography>
          {userRole !== 'bidan' && userRole !== 'kader' && (
          <>
          <MDTypography
            component="a"
            href={`/user/edit/${data.id}`}
            variant="caption"
            color="warning"
            fontWeight="medium"
            style={{ marginRight: 8 }}
          >
            Edit
          </MDTypography>
          <MDTypography
            component={Link}
            variant="caption"
            color="error"
            fontWeight="medium"
            style={{ marginRight: 8 }}
            onClick={() => handleDelete(data.id)} // Call handleDelete function on click
          >
            Hapus
          </MDTypography>
          </>
          )}
        </MDBox>
        ),
      }))
      return { columns: [
        { Header: "Nama", accessor: "nama", width: "45%", align: "left" },
        { Header: "Nik", accessor: "nik", align: "left" },
        // { Header: "nik", accessor: "nik", align: "left" },
        { Header: "Username", accessor: "username", align: "center" },
        // { Header: "Password", accessor: "password", align: "center" },
        { Header: "Email", accessor: "email", align: "center" },
        { Header: "Jenis Kelamin", accessor: "jenis_kelamin", align: "center" },
        { Header: "Alamat", accessor: "alamat", align: "center" },
        { Header: "Rt", accessor: "rt", align: "center" },
        { Header: "RW", accessor: "rw", align: "center" },
        { Header: "Aksi", accessor: "action", align: "center" },
      ],
      rows: rows };

}

