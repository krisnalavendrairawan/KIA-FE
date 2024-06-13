import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import {useState, useEffect, useMemo} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Box } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Edit, Visibility, Delete } from '@mui/icons-material';
import { Alert } from "@mui/material";
import VaccinesIcon from '@mui/icons-material/Vaccines';

import EditImunisasiModal from './modal/edit';
import useDeleteData from "hooks/useDelete";

import './style.css';

const IMUNISASI_COLUMN = [
    'tgl_imunisasi',
    'nik_anak',
    'nama_anak',
    'jenis_imunisasi',
    'usia',
]


const Imunisasi = () => {
    const [dataImunisasi, setDataImunisasi] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const { loading: deleteLoading, error: deleteError, deleteData } = useDeleteData("http://127.0.0.1:8000/api/deleteImunisasi"); // Gunakan custom hook deleteData


    useEffect(() => {
        fetchDataImunisasi();
    }, []);

        const fetchDataImunisasi = () => {
            axios.get("http://127.0.0.1:8000/api/getImunisasi")
                .then((response) => {
                    console.log(response.data.imunisasi);
                    const dataWithIds = response.data.imunisasi.map((row, index) => ({
                        ...row,
                        id: row.id_imunisasi,
                        nama_anak: row.anak ? row.anak.nama_anak : '',
                        jenis_imunisasi: row.jenis_imunisasi ? row.jenis_imunisasi : '',
                        usia: row.usia ? row.usia + " bulan" : ''
                    }));
                    setDataImunisasi(dataWithIds);
                    setLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                    setLoading(false);
                });
                
        };


    const handleCreateImunisasi = () => {
        navigate("/imunisasi/create");
    };

    const handleEdit = (id) => {
        setSelectedId(id);
        setOpenEditDialog(true);
        console.log("Edit action for row id:", id);
    }

    const handleDelete = async (id) => {
        console.log("Delete action for row id:", id);
        await deleteData(id, setDataImunisasi);
    }


    const columns = useMemo(
        () => [
            ...IMUNISASI_COLUMN.map((field) => ({
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
            },
            // {
            //     field: 'id',
            //     headerName: 'ID',
            //     // hide: true,
            // }
        ],[]
    );

    const handleCloseEditModal = () => {
        setOpenEditDialog(false);
        fetchDataImunisasi();
    }


    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Alert variant="filled" icon={<VaccinesIcon fontSize="inherit" />} severity="info">
                halaman imunisasi
            </Alert>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', marginTop: '1rem' }}>
                <Button variant="contained" id="create-button" onClick={handleCreateImunisasi}>Create Imunisasi</Button>
            </Box>

            {loading ? (
                'Loading...'
            ) : (
                <Box sx={{ height: 400, width: '100%', overflowX: 'auto' }}>
                    <DataGrid
                        rows={dataImunisasi}
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
                        //tambahkan agar bisa scroll horizontal
                        autoPageSize
                        pageSize={5}
                        rowsPerPageOptions={[5, 10, 20]}

                    />
                </Box>
            )}
            <EditImunisasiModal open={openEditDialog} handleClose={handleCloseEditModal} selectedId={selectedId} />
            
        </DashboardLayout>
    )
}

export default Imunisasi;