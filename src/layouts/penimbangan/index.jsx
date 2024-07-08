import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import axios from "axios";
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { Edit, Visibility, Delete } from '@mui/icons-material';
import { Alert } from "@mui/material";
import MonitorWeightIcon from '@mui/icons-material/MonitorWeight';
import EditPenimbanganModal from './modal/edit'; // Import EditPenimbanganModal component

import useDeleteData from "hooks/useDelete"; // Import useDeleteData custom hook
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import SessionExpired from "layouts/authentication/log-out/session";

const VISIBLE_FIELDS = [
    'tgl_penimbangan',
    // 'nik_anak',
    'nama_anak',
    'berat_badan',
    'tinggi_badan',
    'status_gizi',
    'keterangan',
    // 'saran',
    // 'usia'
];

const Penimbangan = () => {
    SessionExpired();
    const [dataPenimbangan, setDataPenimbangan] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const { loading: deleteLoading, error: deleteError, deleteData } = useDeleteData("http://127.0.0.1:8000/api/deletePenimbangan");

    useEffect(() => {
        // Set bahasa lokal menjadi bahasa Indonesia
        fetchDataPenimbangan();
    }, []);

    const fetchDataPenimbangan = () => {
        axios.get("http://127.0.0.1:8000/api/getPenimbangan")
            .then((response) => {
                const dataWithIds = response.data.penimbangan.map((row, index) => ({
                    ...row,
                    id: row.id_penimbangan,
                    nama_anak: row.anak ? row.anak.nama_anak : '',
                    berat_badan: row.berat_badan ? row.berat_badan + " kg" : '',
                    tinggi_badan: row.tinggi_badan ? row.tinggi_badan + " cm" : '',
                    tgl_penimbangan: row.tgl_penimbangan ? format(new Date(row.tgl_penimbangan), 'dd MMMM yyyy', { locale: id }) : '',
                }))
                const filteredData = dataWithIds.filter(data => data.status_gizi !== '-');

                setDataPenimbangan(filteredData);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    };


    const handleEdit = (id) => {
        console.log("Edit action for row id:", id);
        setSelectedId(id);
        setOpenEditDialog(true);
    };

    const handleView = (id) => {
        console.log("View action for row id:", id);
        navigate(`/penimbangan/detail/${id}`);
    };

    const handleDelete = async (id) => {
        console.log("Delete action for row id:", id);
        await deleteData(id, setDataPenimbangan);
    };

    const handleCreatePenimbangan = () => {
        navigate("/penimbangan/create");
    };

    const columns = useMemo(
        () => [
            ...VISIBLE_FIELDS.map((field) => ({
                field,
                headerName: field.replace('_', ' ').toUpperCase(),
                flex: 1,
                minWidth: 150
            })),
            {
                field: 'actions',
                headerName: 'Actions',
                flex: 0.5,
                minWidth: 350,
                renderCell: (params) => (
                    <div>
                        <Button onClick={() => handleView(params.row.id)} startIcon={<Visibility />} color="primary">
                            View
                        </Button>
                        <Button id="edit-button" onClick={() => handleEdit(params.row.id)} startIcon={<Edit />} color="secondary">
                            Edit
                        </Button>
                        <Button id="delete-button" onClick={() => handleDelete(params.row.id)} startIcon={<Delete />} color="error">
                            Delete
                        </Button>
                    </div>
                )
            }
        ],[]
    );

    const handleCloseEditModal = () => {
        setOpenEditDialog(false);
        fetchDataPenimbangan();
    };

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Alert variant="filled" icon={<MonitorWeightIcon fontSize="inherit" />} severity="info">
                Halmaan Penimbangan
            </Alert>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', marginTop: '1rem' }}>
                <Button variant="contained" id="create-button" color="primary" onClick={handleCreatePenimbangan}>Create Penimbangan</Button>
            </Box>
            {loading ? (
                'Loading...'
            ) : (
                <Box sx={{ height: 400, width: '100%', overflowX: 'auto' }}>
                    <DataGrid
                        rows={dataPenimbangan}
                        disableColumnFilter
                        disableColumnSelector
                        disableDensitySelector
                        columns={columns}
                        slots={{ toolbar: GridToolbar }}
                        slotProps={{
                            toolbar: {
                                showQuickFilter: true,
                            },
                        }}
                        autoHeight
                        autoWidth
                        columnBuffer={5}
                    />
                </Box>
            )}

            <EditPenimbanganModal open={openEditDialog} handleClose={handleCloseEditModal} selectedId={selectedId} />

        </DashboardLayout>
    );
};

export default Penimbangan;
