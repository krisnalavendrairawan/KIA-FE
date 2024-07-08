import React, { useState, useEffect } from 'react';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Alert, Grid, Paper, Typography, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from "@mui/material";
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import InfoIcon from '@mui/icons-material/Info';
import axios from "axios";
import { useParams } from "react-router-dom";
import { format } from 'date-fns'; // Import date-fns format function
import { id as idLocale } from 'date-fns/locale'; // Correct import for the locale
import SessionExpired from "layouts/authentication/log-out/session";


const MedicalDetail = () => {
    SessionExpired();
    const { id } = useParams();
    const [datas, setDatas] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/getMedicalById/${id}`);
                const data = response.data.riwayatPenyakit[0]

                const dataWithId = {
                    id: data.id_penyakit,
                    nik_anak : data.anak ? data.anak.nik : '',
                    nama_anak : data.anak ? data.anak.nama_anak : '',
                    tgl_rujukan: data.tgl_rujukan ? format(new Date(data.tgl_rujukan), 'dd MMMM yyyy', { locale: idLocale }) : '',
                    jenis_penyakit: data.jenis_penyakit ? data.jenis_penyakit : '',
                    rujukan : data.rujukan ? data.rujukan : '',
                    saran : data.saran ? data.saran : '',
                    id_kader : data.user ? data.user.id : '',
                    nama_ibu : data.anak ? data.anak.nama_ibu : '',
                    nama_ayah : data.anak ? data.anak.nama_ayah : '',
                    alamat : data.anak ? data.anak.alamat : '',
                    tanggal_lahir : data.anak ? format(new Date(data.anak.tanggal_lahir), 'dd MMMM yyyy', { locale: idLocale }) : '',
                    jenis_kelamin : data.anak ? data.anak.jenis_kelamin : ''

                }
                setDatas(dataWithId);
                console.log(dataWithId);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [id]);

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Alert variant="filled" icon={<InfoIcon fontSize="inherit" />} severity="info">
                Detail Riwayat Penyakit Anak
            </Alert>
            <Grid container spacing={3} style={{ padding: '20px' }}>
                <Grid item xs={12} md={6}>
                    <Paper style={{ padding: '20px' }}>
                        <Typography variant="h6" gutterBottom>
                            Informasi Pribadi Anak
                        </Typography>
                        <Divider />
                        {datas ? (
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell><strong>Nama</strong></TableCell>
                                            <TableCell>{datas.nama_anak}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><strong>NIK Anak</strong></TableCell>
                                            <TableCell>{datas.nik_anak}</TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell><strong>Tanggal Lahir</strong></TableCell>
                                            <TableCell>{datas.tanggal_lahir}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><strong>Jenis Kelamin</strong></TableCell>
                                            <TableCell>{datas.jenis_kelamin}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><strong>Nama Ibu</strong></TableCell>
                                            <TableCell>{datas.nama_ibu}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><strong>Nama Ayah</strong></TableCell>
                                            <TableCell>{datas.nama_ayah}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><strong>Alamat</strong></TableCell>
                                            <TableCell>{datas.alamat}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                        ) : (
                            <Typography variant="body1" style={{ marginTop: '10px' }}>
                                Loading...
                            </Typography>
                        )}
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper style={{ padding: '20px' }}>
                        <Typography variant="h6" gutterBottom>
                            Informasi Riwayat Penyakit Anak
                        </Typography>
                        <Divider />
                        {datas ? (
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell><strong>Tanggal Rujukan</strong></TableCell>
                                            <TableCell>{datas.tgl_rujukan}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><strong>Jenis Penyakit</strong></TableCell>
                                            <TableCell>{datas.jenis_penyakit}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><strong>Tempat Rujukan</strong></TableCell>
                                            <TableCell>{datas.rujukan}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><strong>Saran Dokter</strong></TableCell>
                                            <TableCell>{datas.saran}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                        ) : (
                            <Typography variant="body1" style={{ marginTop: '10px' }}>
                                Loading...
                            </Typography>
                        )}
                    </Paper>
                    <Grid container spacing={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', marginTop: '1rem' }}>
                            <Grid item>
                                <Button variant="contained" id='back-button'
                                    href="/medical">
                                    <ReplyAllIcon sx={{marginRight: 1}} />
                                    Kembali
                                </Button>
                            </Grid>
                        </Grid>
                </Grid>
            </Grid>
        </DashboardLayout>
    );
}

export default MedicalDetail;