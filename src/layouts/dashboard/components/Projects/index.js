import { useState, useEffect } from "react";

// @mui/material components
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React examples
import DataTable from "examples/Tables/DataTable";
import { Edit } from "@mui/icons-material";
import { Delete } from "@mui/icons-material";

// Data
import CreateJadwalModal from "./modal/createJadwal";
import EditJadwal from "./modal/editJadwal";
import axios from "axios";
import { format } from 'date-fns';
import { id as idLocale } from 'date-fns/locale';
import useDeleteData from "hooks/useDelete";
import useUserRole from "hooks/useUserRole";

const url = "http://127.0.0.1:8000/api";

function Projects() {
  const [rows, setRows] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const { deleteData } = useDeleteData(`${url}/deleteJadwal`);
  const [selectedId, setSelectedId] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const userRole = useUserRole();

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

      // Sort the data based on `rw` value
      const sortedData = dataWithId.sort((a, b) => a.rw - b.rw);
      setRows(sortedData.map(item => createRow(item)));
    };

    fetchData();
  }, []);

  const formatDate = (date) => {
    return date ? format(new Date(date), 'dd MMMM yyyy', { locale: idLocale }) : '';
  };

  const handleEdit = (id) => {
    setSelectedId(id);
    setOpenEditDialog(true);
    console.log("Edit action for row id:", id);
  };

  const handleDelete = async (id) => {
    console.log("Delete action for row id:", id);
    await deleteData(id);
    // eslint-disable-next-line react/prop-types
    setRows(prevRows => prevRows.filter(row => row.id !== id));
    setAlertMessage("Data berhasil dihapus");
    setAlertOpen(true);
  };

  const createRow = (item) => ({
    id: item.id,
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
  });

  const handleOpenModal = () => {
    setOpenDialog(true);
  };

  const handleCloseModal = () => {
    setOpenDialog(false);
  };

  const handleOpenEditModal = () => {
    setOpenEditDialog(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditDialog(false);
  };

  const handleSuccess = (newData) => {
    newData.tgl_kegiatan = formatDate(newData.tgl_kegiatan);
    setRows((prevRows) => {
      const updatedRows = [...prevRows, createRow(newData)];
      return updatedRows.sort((a, b) => parseInt(a.rw.props.children) - parseInt(b.rw.props.children)); // Sort after adding new row
    });
  };

  const handleEditSuccess = (updatedData) => {
    updatedData.tgl_kegiatan = formatDate(updatedData.tgl_kegiatan);
    setRows((prevRows) => {
      // eslint-disable-next-line react/prop-types
      const updatedRows = prevRows.map((row) => row.id === updatedData.id ? createRow(updatedData) : row);
      return updatedRows.sort((a, b) => parseInt(a.rw.props.children) - parseInt(b.rw.props.children)); // Sort after editing row
    });
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  let columns = [
    { Header: "Tanggal Kegiatan", accessor: "tgl_kegiatan", width: "30%", align: "left" },
    { Header: "RW", accessor: "rw", width: "10%", align: "left" },
    { Header: "Tempat", accessor: "tempat", align: "center" },
    { Header: "Keterangan", accessor: "keterangan", align: "center" },
  ];
  // Remove Action column if userRole is 'kader'
  if (userRole === 'kader') {
    columns = columns.filter(column => column.accessor !== "action");
  } else {
    // Add Action column definition if userRole is not 'kader'
    columns.push({
      Header: "Action",
      accessor: "action",
      align: "center",
      // eslint-disable-next-line react/prop-types
      Cell: ({ row }) => (
        <MDBox display="flex" justifyContent="center" alignItems="center">
          {/* eslint-disable-next-line react/prop-types */}
          <Button id="edit-button" startIcon={<Edit />} color="secondary" size="small" onClick={() => handleEdit(row.original.id)}>
            Edit
          </Button>
          {/* eslint-disable-next-line react/prop-types */}
          <Button id="delete-button" startIcon={<Delete />} color="error" size="small" onClick={() => handleDelete(row.original.id)} style={{ marginLeft: '8px' }}>
            Delete
          </Button>
        </MDBox>
      )
    });
  }

  return (
    <>
      <Card>
        <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
          <MDBox>
            <MDTypography variant="h6" gutterBottom>
              Jadwal Kegiatan
            </MDTypography>
            <MDBox display="flex" alignItems="center" lineHeight={0}>
              <MDTypography variant="button" fontWeight="regular" color="text">
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', marginTop: '1rem' }}>
                  {rows.length < 12 && !['kader'].includes(userRole) && (
                    <Button variant="contained" id="create-button" onClick={handleOpenModal}>
                      Tambah Jadwal
                    </Button>
                  )}
                </Box>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
        <MDBox>
          <DataTable
            table={{ columns, rows }}
            showTotalEntries={false}
            isSorted={false}
            noEndBorder
            entriesPerPage={false}
          />
        </MDBox>
      </Card>
      <CreateJadwalModal open={openDialog} handleClose={handleCloseModal} onSuccess={handleSuccess} />
      <EditJadwal open={openEditDialog} handleClose={handleCloseEditModal} selectedId={selectedId} onSuccess={handleEditSuccess} />
      <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export default Projects;
