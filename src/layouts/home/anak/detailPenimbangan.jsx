import React, { useState, useEffect } from 'react';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Alert, Grid, Paper, Typography, Divider, Table, TableBody, TableCell, TableRow, Button, Modal, Box, CircularProgress } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import PrintIcon from '@mui/icons-material/Print';
import axios from "axios";
import { useParams } from "react-router-dom";
import { format } from 'date-fns';
import { id as idLocale } from 'date-fns/locale';
import { PDFViewer } from '@react-pdf/renderer';
import MyDocument from './document/pdfPenimbangan';
const URL = 'http://127.0.0.1:8000/api'
import SessionExpired from "layouts/authentication/log-out/session";
import PageLayout from 'examples/LayoutContainers/PageLayout';

const DetailPenimbanganAnak = () => {
    SessionExpired();
    const { id } = useParams();
    const [datas, setDatas] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showPdf, setShowPdf] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${URL}/getPenimbanganById/${id}`);
                const data = response.data.penimbangan;
                const dataWithId = {
                    id: data.id_penimbangan,
                    nik_anak: data.anak ? data.anak.nik : '',
                    nama_anak: data.anak ? data.anak.nama_anak : '',
                    tgl_penimbangan: data.tgl_penimbangan ? format(new Date(data.tgl_penimbangan), 'dd MMMM yyyy', { locale: idLocale }) : '',
                    berat_badan: data.berat_badan ? data.berat_badan : '',
                    tinggi_badan: data.tinggi_badan ? data.tinggi_badan : '',
                    status_gizi: data.status_gizi ? data.status_gizi : '',
                    keterangan: data.keterangan ? data.keterangan : '',
                    saran: data.saran ? data.saran : '',
                    usia: data.usia ? data.usia : '',
                    nama_ibu: data.anak ? data.anak.nama_ibu : '',
                    nama_ayah: data.anak ? data.anak.nama_ayah : '',
                    alamat: data.anak ? data.anak.alamat : '',
                    tanggal_lahir: data.anak ? format(new Date(data.anak.tanggal_lahir), 'dd MMMM yyyy', { locale: idLocale }) : '',
                    jenis_kelamin: data.anak ? data.anak.jenis_kelamin : ''
                };
                console.log(dataWithId);
                setDatas(dataWithId);
                setLoading(false);
            }
            catch (error) {
                console.error(error);
                setLoading(false);
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
        <PageLayout title="Detail Penimbangan Anak">
            <Alert variant="filled" icon={<InfoIcon fontSize="inherit" />} severity="info" >
                Detail Penimbangan Anak
            </Alert>
            <Grid container spacing={3} style={{ padding: '20px' }}>
                {loading ? (
                    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
                        <CircularProgress />
                    </Grid>
                ) : (
                    <>
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
                                    <Alert severity="error">Data tidak ditemukan</Alert>
                                )}
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Paper style={{ padding: '20px' }}>
                                <Typography variant="h6" gutterBottom>
                                    Informasi Penimbangan Anak
                                </Typography>
                                <Divider />
                                {datas ? (
                                    <Table>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell><strong>Tanggal Penimbangan</strong></TableCell>
                                                <TableCell>{datas.tgl_penimbangan}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell><strong>Usia</strong></TableCell>
                                                <TableCell>{datas.usia} bulan</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell><strong>Berat Badan</strong></TableCell>
                                                <TableCell>{datas.berat_badan} kg</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell><strong>Tinggi Badan</strong></TableCell>
                                                <TableCell>{datas.tinggi_badan} cm</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell><strong>Status Gizi</strong></TableCell>
                                                <TableCell>{datas.status_gizi}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell><strong>Keterangan</strong></TableCell>
                                                <TableCell>{datas.keterangan}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell><strong>Saran</strong></TableCell>
                                                <TableCell>{datas.saran}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                ) : (
                                    <Alert severity="error">Data tidak ditemukan</Alert>
                                )}
                            </Paper>
                            <Grid container spacing={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', marginTop: '1rem' }}>
                                <Grid item>
                                    <Button variant="contained" id='back-button' href={`/anak/${datas ? datas.nik_anak : ''}`}>
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
                    </>
                )}
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
        </PageLayout >
    );
}

export default DetailPenimbanganAnak;
