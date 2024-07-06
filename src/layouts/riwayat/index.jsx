import * as React from 'react';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useState } from "react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import PrintIcon from '@mui/icons-material/Print';
import { Box, InputLabel, FormControl, Select, MenuItem, Button, CircularProgress, Typography, Modal } from "@mui/material";
import { Alert } from "@mui/material";
import MonitorWeightIcon from '@mui/icons-material/MonitorWeight';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import MyDocument from './document/pdf';
import { PDFViewer } from '@react-pdf/renderer';
import { CSVLink } from 'react-csv';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import './style.css'

const URL = "http://localhost:8000/api";

const VISIBLE_FIELDS_PENIMBANGAN = ['tgl_penimbangan', 'nama_anak', 'berat_badan', 'tinggi_badan', 'keterangan', 'saran', 'usia'];
const VISIBLE_FIELDS_IMUNISASI = ['tgl_imunisasi', 'nama_anak', 'jenis_imunisasi', 'usia'];

const Riwayat = () => {
    const [dataPenimbangan, setDataPenimbangan] = useState([]);
    const [dataImunisasi, setDataImunisasi] = useState([]);
    const { control, handleSubmit } = useForm();
    const [month, setMonth] = useState('01');
    const [year, setYear] = useState('2024');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showPdf, setShowPdf] = useState(false);

    const handleChange = (event) => {
        setMonth(event.target.value);
    };

    const handleYearChange = (event) => {
        setYear(event.target.value);
    };

    const handleExport = () => {
        setShowPdf(true);
    };

    const handleClose = () => {
        setShowPdf(false);
    };

    const onSubmit = async (data) => {
        setLoading(true);
        setError(null);

        try {
            const penimbanganResponse = await axios.get(`${URL}/getPenimbanganByBulan/${data.year}/${data.month}`);
            const dataWithIds = penimbanganResponse.data.penimbangan.map((row, index) => ({
                ...row,
                id: row.id_penimbangan,
                // no: index,
                nama_anak: row.anak ? row.anak.nama_anak : '',
                berat_badan: row.berat_badan ? row.berat_badan + " kg" : '',
                tinggi_badan: row.tinggi_badan ? row.tinggi_badan + " cm" : '',
                usia: row.usia ? row.usia + " bulan" : '',
                tgl_penimbangan: row.tgl_penimbangan ? format(new Date(row.tgl_penimbangan), 'dd MMMM yyyy', { locale: id }) : '',
            }));
            const filteredData = dataWithIds.filter(data => data.status_gizi !== '-');
            setDataPenimbangan(filteredData);
            console.log(filteredData);

            const imunisasiResponse = await axios.get(`${URL}/getImunisasiByBulan/${data.year}/${data.month}`);
            const dataWithIdsImunisasi = imunisasiResponse.data.imunisasi.map((row, index) => ({
                ...row,
                id: row.id_imunisasi,
                // no: index + 1,
                nama_anak: row.anak ? row.anak.nama_anak : '',
                tgl_imunisasi: row.tgl_imunisasi ? format(new Date(row.tgl_imunisasi), 'dd MMMM yyyy', { locale: id }) : '',
                usia: row.usia ? row.usia + " bulan" : '',
            }));
            setDataImunisasi(dataWithIdsImunisasi);

        } catch (error) {
            setError("Failed to fetch data. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const columnsPenimbangan = VISIBLE_FIELDS_PENIMBANGAN.map((field) => ({
        field,
        headerName: field.replace('_', ' ').toUpperCase(),
        flex: 1,
        minWidth: 150
    }));

    const columnsImunisasi = VISIBLE_FIELDS_IMUNISASI.map((field) => ({
        field,
        headerName: field.replace('_', ' ').toUpperCase(),
        flex: 1,
        minWidth: 150
    }));

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ width: 500, maxWidth: '100%', marginTop: 2 }}>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel id="month">Bulan</InputLabel>
                        <Controller
                            name="month"
                            control={control}
                            defaultValue="01"
                            render={({ field }) => (
                                <Select
                                    labelId="month"
                                    id="month"
                                    label="Bulan"
                                    sx={{ height: '40px' }}
                                    onChange={(e) => { handleChange(e); field.onChange(e); }}
                                    {...field}
                                >
                                    <MenuItem value={'01'}>Januari</MenuItem>
                                    <MenuItem value={'02'}>Februari</MenuItem>
                                    <MenuItem value={'03'}>Maret</MenuItem>
                                    <MenuItem value={'04'}>April</MenuItem>
                                    <MenuItem value={'05'}>Mei</MenuItem>
                                    <MenuItem value={'06'}>Juni</MenuItem>
                                    <MenuItem value={'07'}>Juli</MenuItem>
                                    <MenuItem value={'08'}>Agustus</MenuItem>
                                    <MenuItem value={'09'}>September</MenuItem>
                                    <MenuItem value={'10'}>Oktober</MenuItem>
                                    <MenuItem value={'11'}>November</MenuItem>
                                    <MenuItem value={'12'}>Desember</MenuItem>
                                </Select>
                            )}
                        />
                    </FormControl>
                </Box>
                <Box sx={{ width: 500, maxWidth: '100%', marginTop: 2 }}>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel id="year">Tahun</InputLabel>
                        <Controller
                            name="year"
                            control={control}
                            defaultValue="2024"
                            render={({ field }) => (
                                <Select
                                    labelId="year"
                                    id="year"
                                    label="Tahun"
                                    sx={{ height: '40px' }}
                                    onChange={(e) => { handleYearChange(e); field.onChange(e); }}
                                    {...field}
                                >
                                    <MenuItem value={'2023'}>2023</MenuItem>
                                    <MenuItem value={'2024'}>2024</MenuItem>
                                </Select>
                            )}
                        />
                    </FormControl>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', marginTop: '1rem' }}>
                    <Button type="submit" id="show-button" variant="contained" color="primary" disabled={loading}>
                        {loading ? <CircularProgress size={24} /> : <><ManageSearchIcon sx={{ marginRight: '0.5rem' }} /> Tampilkan</>}
                    </Button>
                </Box>
            </form>

            {error && <Alert severity="error">{error}</Alert>}

            {!loading && dataPenimbangan.length === 0 && dataImunisasi.length === 0 && !error && (
                <Typography variant="h6" sx={{ marginTop: '1rem' }}>
                    Belum ada Data Penimbangan dan Imunisasi.
                </Typography>
            )}

            {dataPenimbangan.length > 0 && (
                <>
                    <Alert variant="filled" icon={<MonitorWeightIcon fontSize="inherit" />} severity="info">
                        Data Penimbangan
                    </Alert>
                    <Button sx={{ marginBottom: '1rem', marginTop: '1rem', marginRight: '1rem' }} variant="contained" id="export-button" onClick={handleExport}>
                        <PrintIcon sx={{ marginRight: 1 }} />
                        Print
                    </Button>
                    <CSVLink
                        data={dataPenimbangan}
                        headers={VISIBLE_FIELDS_PENIMBANGAN.map(field => ({ label: field.replace('_', ' ').toUpperCase(), key: field }))}
                        filename={`data_penimbangan_${month}_${year}.csv`}
                        style={{ textDecoration: 'none' }}
                    >
                        <Button sx={{ marginBottom: '1rem', marginTop: '1rem' }} variant="contained" id="export-button">
                            <FileDownloadIcon sx={{ marginRight: 1 }} />
                            Download CSV
                        </Button>
                    </CSVLink>
                    <div style={{ marginBottom: '1rem', width: '100%' }}>
                        <DataGrid
                            rows={dataPenimbangan}
                            columns={columnsPenimbangan}
                            slots={{ toolbar: GridToolbar }}
                            pageSize={10}
                            rowsPerPageOptions={[10, 20, 30]}
                            pagination
                            autoHeight
                        />
                    </div>
                </>
            )}

            {dataImunisasi.length > 0 && (
                <>
                    <Alert variant="filled" icon={<VaccinesIcon fontSize="inherit" />} severity="info">
                        Data Imunisasi
                    </Alert>
                    <CSVLink
                        data={dataImunisasi}
                        headers={VISIBLE_FIELDS_IMUNISASI.map(field => ({ label: field.replace('_', ' ').toUpperCase(), key: field }))}
                        filename={`data_imunisasi_${month}_${year}.csv`}
                        style={{ textDecoration: 'none' }}
                    >
                        <Button sx={{ marginBottom: '1rem', marginTop: '1rem' }} variant="contained" id="export-button">
                            <FileDownloadIcon sx={{ marginRight: 1 }} />
                            Download CSV
                        </Button>
                    </CSVLink>
                    <div style={{ width: '100%' }}>
                        <DataGrid
                            rows={dataImunisasi}
                            disableColumnFilter
                            disableColumnSelector
                            disableDensitySelector
                            columns={columnsImunisasi}
                            slots={{ toolbar: GridToolbar }}
                            pageSize={10}
                            rowsPerPageOptions={[10, 20, 30]}
                            slotProps={{
                                toolbar: {
                                    showQuickFilter: true,
                                },
                            }}
                            pagination
                            autoHeight
                        />
                    </div>
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
                        <MyDocument dataPenimbangan={dataPenimbangan} dataImunisasi={dataImunisasi} year={year} month={month} />
                    </PDFViewer>
                </Box>
            </Modal>
        </DashboardLayout>
    );
};

export default Riwayat;
