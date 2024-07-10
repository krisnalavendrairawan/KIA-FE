// @mui material components
import Tooltip from "@mui/material/Tooltip";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDButton from "components/MDButton"; // Import MDButton component
import { useState, useEffect } from "react";
import axios from "axios";
import { format } from 'date-fns';
import { id as idLocale } from 'date-fns/locale';
import Header from "layouts/blog/Header";
import useDeleteData from "hooks/useDelete";

const url = "http://127.0.0.1:8000/api";
export default function data() {
  const [schedule, setSchedule] = useState([]);
  const { loading: deleteLoading, error: deleteError, deleteData } = useDeleteData(`${url}/deleteJadwal`);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`${url}/getJadwal`);
      const dataWithId = result.data.jadwal.map((data) => ({
        id: data.id_jadwal,
        tgl_kegiatan: data.tgl_kegiatan ? format(new Date(data.tgl_kegiatan), 'dd MMMM yyyy', { locale: idLocale }) : '',
        rw: data.rw,
        tempat: data.tempat,
        keterangan: data.keterangan
      }));
      console.log(dataWithId);
      setSchedule(dataWithId);
    };
    fetchData();
  }, []);

  const handleEdit = (id) => {
    // Handle edit action
    console.log("Edit ID:", id);
  };


  const handleDelete = async (id) => {
    console.log("Delete action for row id:", id);
    await deleteData(id, setSchedule);
}

  return {
    columns: [
      { Header: "Tanggal Kegiatan", accessor: "tgl_kegiatan", width: "30%", align: "left" },
      { Header: "RW", accessor: "rw", width: "10%", align: "left" },
      { Header: "Tempat", accessor: "tempat", align: "center" },
      { Header: "Keterangan", accessor: "keterangan", align: "center" },
      { Header: "Action", accessor: "action", align: "center" },
    ],

    rows: schedule.map((item) => ({
      tgl_kegiatan: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {item.tgl_kegiatan}
        </MDTypography>
      ),
      rw: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          0{item.rw}
        </MDTypography>
      ),
      tempat: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {item.tempat}
        </MDTypography>
      ),
      keterangan: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {item.keterangan}
        </MDTypography>
      ),
      action: (
        <MDBox display="flex" justifyContent="center" alignItems="center">
          <MDButton variant="contained" color="info" size="small" onClick={() => handleEdit(item.id)}>
            Edit
          </MDButton>
          <MDButton variant="contained" color="error" size="small" onClick={() => handleDelete(item.id)} style={{ marginLeft: '8px' }}>
            Delete
          </MDButton>
        </MDBox>
      ),
    })),
  };
}
