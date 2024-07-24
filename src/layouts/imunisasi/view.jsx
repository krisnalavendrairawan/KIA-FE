import React, { useState, useEffect } from 'react';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Alert, Grid, Paper, Typography, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Box } from "@mui/material";
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import InfoIcon from '@mui/icons-material/Info';
import PrintIcon from '@mui/icons-material/Print';
import Modal from '@mui/material/Modal';
import axios from "axios";
import { PDFViewer } from '@react-pdf/renderer';
import MyDocument from './document/pdf';
import { useParams } from "react-router-dom";
import { format } from 'date-fns'; // Import date-fns format function
import { id as idLocale } from 'date-fns/locale'; // Correct import for the locale
import SessionExpired from "layouts/authentication/log-out/session";

const DetailImunisasi = () => {
    SessionExpired();
    const { id } = useParams();
    const [datas, setDatas] = useState(null);
    const [showPdf, setShowPdf] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/getImunisasiById/${id}`);
                const data = response.data.imunisasi
                const dataWithId = {
                    id: data.id_imunisasi,
                    nik_anak: data.anak ? data.anak.nik : '',
                    nama_anak: data.anak ? data.anak.nama_anak : '',
                    tgl_imunisasi: data.tgl_imunisasi ? format(new Date(data.tgl_imunisasi), 'dd MMMM yyyy', { locale: idLocale }) : '',
                    jenis_imunisasi: data.jenis_imunisasi ? data.jenis_imunisasi : '',
                    usia: data.usia ? data.usia : '',
                    vitamin: data.vitamin ? data.vitamin : '',
                    mpasi: data.mpasi ? data.mpasi : '',
                    nama_ibu: data.anak ? data.anak.nama_ibu : '',
                    nama_ayah: data.anak ? data.anak.nama_ayah : '',
                    alamat: data.anak ? data.anak.alamat : '',
                    tanggal_lahir: data.anak ? format(new Date(data.anak.tanggal_lahir), 'dd MMMM yyyy', { locale: idLocale }) : '',
                    jenis_kelamin: data.anak ? data.anak.jenis_kelamin : ''
                }
                setDatas(dataWithId);
                console.log(response.data.imunisasi);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [id]);

    const handleExport = () => {
        setShowPdf(true);
    };

    const handleClose = () => {
        setShowPdf(false);
    };

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Alert variant="filled" icon={<InfoIcon fontSize="inherit" />} severity="info">
                Detail Imunisasi Anak
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
                            Informasi Imunisasi Anak
                        </Typography>
                        <Divider />
                        {datas ? (
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell><strong>Tanggal Imunisasi</strong></TableCell>
                                        <TableCell>{datas.tgl_imunisasi}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell><strong>Jenis Imunisasi</strong></TableCell>
                                        <TableCell>{datas.jenis_imunisasi}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell><strong>Usia</strong></TableCell>
                                        <TableCell>{datas.usia} Bulan</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell><strong>Pemberian Vitamin</strong></TableCell>
                                        <TableCell>{datas.vitamin}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell><strong>Pemberian MPASI</strong></TableCell>
                                        <TableCell>{datas.mpasi}</TableCell>
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
                                href="/imunisasi">
                                <ReplyAllIcon sx={{ marginRight: 1 }} />
                                Kembali
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" id="export-button" onClick={handleExport}>
                                <PrintIcon sx={{ marginRight: 1 }} />
                                Print
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Modal
                    open={showPdf}
                    onClose={handleClose}
                    aria-labelledby="pdf-viewer-modal"
                    aria-describedby="pdf-viewer-description"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Box sx={{ width: '80%', height: '90%' }}>
                        <PDFViewer style={{ width: '100%', height: '100%' }}>
                            <MyDocument datas={datas} />
                        </PDFViewer>
                    </Box>
                </Modal>
            </Grid>
        </DashboardLayout>
    );
};

export default DetailImunisasi;
