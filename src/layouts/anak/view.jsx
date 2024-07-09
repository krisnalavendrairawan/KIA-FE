import React, { useState, useEffect } from 'react';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Alert, Grid, Paper, Button, Modal, Box } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import ScaleIcon from '@mui/icons-material/Scale';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import BarChartIcon from '@mui/icons-material/BarChart';
import PrintIcon from '@mui/icons-material/Print';
import axios from "axios";
import { useParams } from "react-router-dom";
import ChildInfoTable1 from "./component/childInfoTable1";
import ChildInfoTable2 from "./component/childInfoTable2";
import ChildWeighingTable from "./component/ChildWeighingTable";
import ChildImmunizationTable from "./component/ChildImmunizationTable";
import BackButton from 'components/BackButton';
import ChildDetailPDF from './utils/pdf';
import { PDFViewer } from '@react-pdf/renderer';
import SessionExpired from "layouts/authentication/log-out/session";

const DetailAnak = () => {
    SessionExpired();
    const { nik } = useParams();
    const [datas, setDatas] = useState(null);
    const [dataPenimbangan, setDataPenimbangan] = useState(null);
    const [dataImunisasi, setDataImunisasi] = useState(null);
    const [showPdfViewer, setShowPdfViewer] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/getAnak/${nik}`);
                setDatas(response.data.anak);
                const filterDataPenimbangan = response.data.anak.penimbangan.filter(data => data.status_gizi !== '-');
                setDataPenimbangan(filterDataPenimbangan);
                setDataImunisasi(response.data.anak.imunisasi);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [nik]);

    const handleOpenPdfViewer = () => {
        setShowPdfViewer(true);
    };

    const handleClosePdfViewer = () => {
        setShowPdfViewer(false);
    };

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Alert variant="filled" icon={<InfoIcon fontSize="inherit" />} severity="info">
                Detail Informasi Anak
            </Alert>
            <Grid container spacing={3} sx={{ padding: '20px' }}>
                <Grid item xs={12} md={6}>
                    {/* <img src={logoPosyandu} alt="Logo Posyandu" style={{ maxWidth: '100%', height: 'auto' }} /> */}
                    <Paper sx={{ padding: '20px' }}>
                        <ChildInfoTable1 datas={datas} />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ padding: '20px' }}>
                        <ChildInfoTable2 datas={datas} nik={nik} />
                    </Paper>
                    <Grid item xs={12}>
                        <Button variant="contained" href={`/anak/detail/grafik/${nik}`} id="grafik-button" sx={{ marginTop: '1rem', marginRight: '1rem' }}><BarChartIcon sx={{ marginRight: 1 }} /> Lihat Grafik Anak</Button>
                        {datas && dataPenimbangan && dataImunisasi && (
                            <Button variant="contained" id='export-button' onClick={handleOpenPdfViewer} sx={{ marginTop: '1rem' }}>
                                <PrintIcon sx={{ marginRight: 1 }} /> Print
                            </Button>
                        )}
                    </Grid>
                    <Grid item xs={6}>

                    </Grid>
                </Grid>
            </Grid>

            <Alert variant="filled" icon={<ScaleIcon fontSize="inherit" />} severity="info">
                Data penimbangan
            </Alert>
            <Grid container spacing={3} sx={{ padding: '20px' }}>
                <Grid item xs={12}>
                    <ChildWeighingTable dataPenimbangan={dataPenimbangan} />
                </Grid>
            </Grid>
            <Alert variant="filled" icon={<VaccinesIcon fontSize="inherit" />} severity="info">
                Data Imunisasi
            </Alert>
            <Grid container spacing={3} sx={{ padding: '20px' }}>
                <Grid item xs={12}>
                    <ChildImmunizationTable dataImunisasi={dataImunisasi} />
                </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', }}>
                <Grid item>
                    <BackButton href="/anak" />
                </Grid>

            </Grid>

            <Modal
                open={showPdfViewer}
                onClose={handleClosePdfViewer}
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
                        <ChildDetailPDF datas={datas} dataPenimbangan={dataPenimbangan} dataImunisasi={dataImunisasi} />
                    </PDFViewer>
                </Box>
            </Modal>
        </DashboardLayout>
    );
}

export default DetailAnak;
