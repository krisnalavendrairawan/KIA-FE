import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import {useState, useEffect, useMemo} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Box } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Edit, Visibility, Delete } from '@mui/icons-material';
import { Alert } from "@mui/material";
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';

import EditMedicalModal from './modal/edit';
import useDeleteData from "hooks/useDelete";
import { format } from 'date-fns'; // Import date-fns format function
import { id } from 'date-fns/locale';

const MEDICAL_COLUMN = [
    'tgl_rujukan',
    // 'nik_anak',
    'nama_anak',
    'jenis_penyakit',
    'rujukan',
    // 'saran',
]

const Medical = () => {
    const [medicalData, setMedicalData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const { loading: deleteLoading, error: deleteError, deleteData } = useDeleteData("http://127.0.0.1:8000/api/deleteMedical");

    useEffect(() => {
        fetchMedicalData();
    }, []);

    const fetchMedicalData = () => {
        axios.get("http://127.0.0.1:8000/api/getMedical")
            .then((response) => {
                console.log(response.data.riwayatPenyakit);
                const dataWithIds = response.data.riwayatPenyakit.map((row, index) => ({
                    ...row,
                    id: row.id_penyakit,
                    nik_anak : row.anak ? row.anak.nik : '',
                    nama_anak : row.anak ? row.anak.nama_anak : '',
                    tgl_rujukan: row.tgl_rujukan ? format(new Date(row.tgl_rujukan), 'dd MMMM yyyy', { locale: id }) : '',
                    jenis_penyakit: row.jenis_penyakit ? row.jenis_penyakit : '',
                    rujukan : row.rujukan ? row.rujukan : '',
                    saran : row.saran ? row.saran : '',
                    id_kader : row.user ? row.user.id : '',
                }));
                setMedicalData(dataWithIds);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const handleCreateMedical = () => {
        navigate("/medical/create");
    };

    const handleEdit = (id) => {
        setSelectedId(id);
        setOpenEditDialog(true);
        console.log("Edit action for row id:", id);
    }

    const handleDelete = async (id) => {
        console.log("Delete action for row id:", id);
        await deleteData(id, setMedicalData);
    }

    const handleView = (id) => {
        navigate(`/medical/detail/${id}`);
    }

    const columns = useMemo(
        () => [
            ...MEDICAL_COLUMN.map((field) => ({
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
        fetchMedicalData();
    }

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Alert variant="filled" icon={<MedicalInformationIcon fontSize="inherit" />} severity="info">
                halaman riwayat penyakit anak
            </Alert>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', marginTop: '1rem' }}>
                <Button variant="contained" id="create-button" onClick={handleCreateMedical}>Create Riwayat Penyakit</Button>
            </Box>

            {loading ? (
                'Loading...'
            ) : (
                <Box sx={{ height: 400, width: '100%', overflowX: 'auto' }}>
                    <DataGrid
                        rows={medicalData}
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
                        // autoPageSize
                        // pageSize={5}
                        // rowsPerPageOptions={[5, 10, 20]}

                    />
                </Box>
            )}
            <EditMedicalModal open={openEditDialog} handleClose={handleCloseEditModal} selectedId={selectedId} />
            
        </DashboardLayout>
    )
}

export default Medical;