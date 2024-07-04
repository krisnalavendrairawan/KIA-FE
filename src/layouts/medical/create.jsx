import DashboardLayout from "examples/LayoutContainers/DashboardLayout"
import DashboardNavbar from "examples/Navbars/DashboardNavbar"

import axios from "axios"
import "react-datepicker/dist/react-datepicker.css";
import { Card, CardActionArea, CardMedia, CardContent, Grid,Typography, Stack, TextField, Box, Autocomplete,InputAdornment, Button } from '@mui/material';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Alert } from '@mui/material';
import VaccinesIcon from '@mui/icons-material/Vaccines';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useForm, Controller, SubmitHandler, set } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

import bayiImage from "assets/images/penimbangan/bayi.png";
import dataAnak from "./data/data";

import React, { useEffect, useState } from 'react'

const CreateMedical = () => {
    const [data, setData] = useState([]);
    const [selectedChild, setSelectedChild] = useState(null);
    const { control, handleSubmit } = useForm();
    const navigate = useNavigate();
    const today = dayjs();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/getAnak");
                setData(response.data.anak);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if(selectedChild) {
            console.log(selectedChild);
        }
    }, [selectedChild]);

    const onSubmit = (data) => {
        const payload = {
            nik_anak: selectedChild.nik,
            id_kader: localStorage.getItem('id_user'),
            tgl_rujukan: dayjs(data.tgl_rujukan).format('YYYY-MM-DD'),
            usia: data.usia,
            jenis_penyakit: data.jenis_penyakit,
            rujukan: data.rujukan,
            saran: data.saran,
        };
        console.log(payload);

        const postData = async () => {
            try {
                const response = await axios.post("http://localhost:8000/api/createMedical", payload);
                console.log(response);
                navigate('/medical');
            } catch (error) {
                console.error('Error creating medical:', error);
            }
        }
        postData();
    };

    return (
        <DashboardLayout>
        <DashboardNavbar />
        <Alert variant="filled" icon={<VaccinesIcon fontSize="inherit" />} severity="info" sx={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', marginTop: '1rem' }}>
            Halaman Tambah Riwayat Penyakit Anak
        </Alert>
        <form onSubmit={handleSubmit(onSubmit)} >
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <Box sx={{ width: 500, maxWidth: '100%' }}>
                <Controller
                            name="nik_anak"
                            control={control}
                            defaultValue=""
                            render={({ field }) => 
                                <Autocomplete
                                    freeSolo
                                    id="free-solo-2-demo"
                                    disableClearable
                                    options={dataAnak(data)}
                                    getOptionLabel={(option) => `${option.nama_anak} - ${option.nik}`}
                                    onChange={(event, value) => setSelectedChild(value)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Search input"
                                            InputProps={{
                                                ...params.InputProps,
                                                type: 'search',
                                            }}
                                        />
                                    )}
                                />
                            }
                        />
                </Box>
                {selectedChild && (
                    <Card sx={{marginTop : 2}}>
                        <CardActionArea>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 140 }}>
                            <img src={bayiImage} alt="Bayi" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                        </Box>
                            <CardContent sx={{ textAlign: 'center' }}>
                                <Typography gutterBottom variant="h3" component="div">
                                    Data Anak
                                </Typography>
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 450 }} aria-label="data anak table">
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>Nama Anak</TableCell>
                                                <TableCell>{selectedChild.nama_anak}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Jenis Kelamin</TableCell>
                                                <TableCell>{selectedChild.jenis_kelamin}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Tanggal Lahir</TableCell>
                                                <TableCell>{selectedChild.tanggal_lahir}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Berat Badan</TableCell>
                                                <TableCell>{selectedChild.berat_badan} kg</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Tinggi Badan</TableCell>
                                                <TableCell>{selectedChild.tinggi_badan} cm</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Umur</TableCell>
                                                <TableCell>{selectedChild.umur} bulan</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Alamat</TableCell>
                                                <TableCell>{selectedChild.alamat}</TableCell>
                                            </TableRow>

                                            {/* Tambahkan baris lain sesuai dengan data anak yang ingin ditampilkan */}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                )}
            </Grid>
                <Grid item xs={6}>
                    <Box sx={{ width: 500, maxWidth: '100%' }}>
                    <Controller
                            name="tgl_rujukan"
                            control={control}
                            defaultValue={today} // Set defaultValue to today's date
                            render={({ field }) => <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker fullWidth label="Tanggal Rujukan" {...field} />
                                </DemoContainer>
                            </LocalizationProvider>}
                        />
                    </Box>
                    <Box sx={{ width: 500, maxWidth: '100%', marginTop: 2 }}>
                            <Controller
                                name="jenis_penyakit"
                                control={control}
                                
                                
                                render={({ field }) => <TextField fullWidth {...field} 
                                label="Jenis Penyakit"
                                variant="filled"/>}
                                />
                    </Box>
                    <Box sx={{ width: 500, maxWidth: '100%', marginTop: 2 }}>
                            <Controller
                                name="rujukan"
                                control={control}
                                
                                
                                render={({ field }) => <TextField fullWidth {...field} 
                                label="Tempat Rujukan"
                                variant="filled"/>}
                                />
                    </Box>
                    <Box sx={{ width: 500, maxWidth: '100%', marginTop: 2 }}>
                            <Controller
                                name="saran"
                                control={control}
                                
                                
                                render={({ field }) => <TextField
                                fullWidth 
                                id="outlined-multiline-static"
                                label="saran"
                                multiline
                                rows={4}
                                variant="filled"
                                {...field}
                                />}
                                />
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', marginTop: '1rem', gap : '1rem' }}>
                        <Button variant="contained" id="back-button" type="submit">Kembali</Button>
                        <Button variant="contained" id="save-button" type="submit">Simpan Imunisasi</Button>
                    </Box>
                    
                </Grid>
                {/* Other form fields and buttons */}
            </Grid>
        </form>
    </DashboardLayout>
    )
}

export default CreateMedical