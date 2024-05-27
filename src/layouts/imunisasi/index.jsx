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

    useEffect(() => {
        const fetchDataImunisasi = () => {
            axios.get("http://127.0.0.1:8000/api/getImunisasi")
                .then((response) => {
                    console.log(response.data.imunisasi);
                    const dataWithIds = response.data.imunisasi.map((row, index) => ({
                        ...row,
                        id: index + 1,
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
        fetchDataImunisasi();
    }, []);

    const handleCreateImunisasi = () => {
        navigate("/imunisasi/create");
    };

    const columns = useMemo(
        () => [
            ...IMUNISASI_COLUMN.map((field) => ({
                field,
                headerName: field.replace('_', ' ').toUpperCase(),
                flex: 1,
            })),
            {
                field: 'actions',
                headerName: 'Actions',
                flex: 0.5,
                renderCell: (params) => (
                    <div>
                        <Button onClick={() => handleView(params.row.id)} startIcon={<Visibility />} color="primary">
                            View
                        </Button>
                        <Button onClick={() => handleEdit(params.row.id)} startIcon={<Edit />} color="secondary">
                            Edit
                        </Button>
                        <Button onClick={() => handleDelete(params.row.id)} startIcon={<Delete />} color="error">
                            Delete
                        </Button>
                    </div>
                )
            }
        ],[]
    );


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
                    />
                </Box>
            )}
            
        </DashboardLayout>
    )
}

export default Imunisasi;