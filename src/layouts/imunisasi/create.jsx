import DashboardLayout from "examples/LayoutContainers/DashboardLayout"
import DashboardNavbar from "examples/Navbars/DashboardNavbar"

import axios from "axios"
import "react-datepicker/dist/react-datepicker.css";
import { Card, CardActionArea, CardMedia, CardContent, Grid, Typography, Stack, TextField, Box, Autocomplete, InputAdornment, Button } from '@mui/material';

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
import Swal from "sweetalert2";

import bayiImage from "assets/images/penimbangan/bayi.png";
import dataAnak from "./data/data";

import React, { useEffect, useState } from 'react'
import SessionExpired from "layouts/authentication/log-out/session";


const CreateImunisasi = () => {
    SessionExpired();
    const [data, setData] = useState([]);
    const [selectedChild, setSelectedChild] = useState(null);
    const [jenisImunisasi, setJenisImunisasi] = useState('');
    const { control, handleSubmit, formState: { errors } } = useForm();
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
        if (selectedChild) {
            console.log(selectedChild);
        }
    }, [selectedChild]);

    const onSubmit = (data) => {
        // Check if selectedChild is null or undefined
        if (!selectedChild || !selectedChild.nik) {
            Swal.fire({
                title: 'Gagal!',
                text: 'Data anak belum dipilih!',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
            return; // Prevent form submission
        }

        // Handle optional fields
        if (data.mpasi === undefined) {
            data.mpasi = "Tidak ada";
        }
        if (data.vitamin === undefined) {
            data.vitamin = "Tidak ada";
        }

        const payload = {
            nik_anak: selectedChild.nik,
            id_kader: localStorage.getItem('id_user'),
            tgl_imunisasi: dayjs(data.tgl_imunisasi).format('YYYY-MM-DD'),
            usia: data.usia,
            vitamin: data.vitamin,
            mpasi: data.mpasi,
            jenis_imunisasi: data.jenis_imunisasi
        };
        console.log(payload);

        const postData = async () => {
            try {
                const response = await axios.post("http://localhost:8000/api/createImunisasi", payload);
                console.log(response);
                Swal.fire({
                    title: 'Berhasil!',
                    text: 'Data imunisasi berhasil disimpan!',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                }).then(() => {
                    navigate('/imunisasi');
                });

            } catch (error) {
                console.error('Error creating imunisasi:', error);
            }
        }
        postData();
    };


    const handleChange = (event) => {
        setJenisImunisasi(event.target.value);
    };

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Alert variant="filled" icon={<VaccinesIcon fontSize="inherit" />} severity="info" sx={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', marginTop: '1rem' }}>
                Halaman Create Imunisasi
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
                                                label="Cari Anak"
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
                            <Card sx={{ marginTop: 2 }}>
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
                                name="tgl_imunisasi"
                                control={control}
                                defaultValue={today} // Set defaultValue to today's date
                                render={({ field }) => <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']}>
                                        <DatePicker fullWidth label="Tanggal Imunisasi" {...field} />
                                    </DemoContainer>
                                </LocalizationProvider>}
                            />
                        </Box>
                        <Box sx={{ width: 500, maxWidth: '100%', marginTop: 2 }}>
                            <Controller
                                name="usia"
                                control={control}
                                rules={{
                                    required: "Usia harus diisi",
                                    min: { value: 0, message: "Usia tidak boleh negatif" }
                                }}
                                render={({ field }) => <TextField fullWidth {...field}
                                    label="Usia"
                                    variant="filled"
                                    type='number'
                                    error={Boolean(errors.usia)}
                                    helperText={errors.usia && errors.usia.message}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">bulan</InputAdornment>,
                                    }} />}
                            />
                        </Box>
                        <Box sx={{ width: 500, maxWidth: '100%', marginTop: 2 }}>
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel id="jenis_imunisasi">Jenis Imunisasi</InputLabel>
                                <Controller
                                    name="jenis_imunisasi"
                                    control={control}
                                    defaultValue="BCG"
                                    render={({ field }) => <Select
                                        labelId="jenis_imunisasi"
                                        id="jenis_imunisasi"
                                        value={jenisImunisasi}
                                        label="Jenis Imunisasi"
                                        sx={{ height: '40px' }}
                                        onChange={handleChange}
                                        {...field}
                                    >
                                        {/* tambahkan jenis imunisasi menurut kemenkes */}
                                        <MenuItem value={'BCG'}>BCG</MenuItem>
                                        <MenuItem value={'Polio 1'}>Polio 1</MenuItem>
                                        <MenuItem value={'Polio 2'}>Polio 2</MenuItem>
                                        <MenuItem value={'Polio 3'}>Polio 3</MenuItem>
                                        <MenuItem value={'Polio 4'}>Polio 4</MenuItem>
                                        <MenuItem value={'DPT-HB-Hib 1'}>DPT-HB-Hib 1</MenuItem>
                                        <MenuItem value={'DPT-HB-Hib 2'}>DPT-HB-Hib 2</MenuItem>
                                        <MenuItem value={'DPT-HB-Hib 3'}>DPT-HB-Hib 3</MenuItem>
                                        <MenuItem value={'Campak'}>Campak</MenuItem>
                                        <MenuItem value={'MR'}>MR</MenuItem>
                                        <MenuItem value={'JE'}>JE</MenuItem>
                                        <MenuItem value={'DPT'}>DPT</MenuItem>
                                        <MenuItem value={'Hepatitis B'}>Hepatitis B</MenuItem>
                                    </Select>}
                                />
                            </FormControl>
                        </Box>
                        <Box sx={{ width: 500, maxWidth: '100%', marginTop: 2 }}>
                            <Controller
                                name="vitamin"
                                control={control}
                                render={({ field }) => <TextField fullWidth {...field}
                                    label="Pemberian Vitamin (Opsional)"
                                    variant="outlined"
                                    type='text'
                                    // defaultValue={``}
                                    multiline
                                    rows={4}
                                />}
                            />
                        </Box>
                        <Box sx={{ width: 500, maxWidth: '100%', marginTop: 2 }}>
                            <Controller
                                name="mpasi"
                                control={control}


                                render={({ field }) => <TextField fullWidth {...field}
                                    label="Pemberian MPASI (Opsional)"
                                    variant="outlined"
                                    type='text'
                                    // defaultValue={``}
                                    multiline
                                    rows={4}

                                />}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', marginTop: '1rem', gap: '1rem' }}>
                            <Button variant="contained" id="back-button" type="submit">Kembali</Button>
                            <Button variant="contained" id="save-button" type="submit">Simpan Imunisasi</Button>
                        </Box>

                    </Grid>
                    {/* Other form fields and buttons */}
                </Grid>
            </form>
        </DashboardLayout>
    );
};

export default CreateImunisasi;
