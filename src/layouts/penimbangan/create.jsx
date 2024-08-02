import DashboardLayout from "examples/LayoutContainers/DashboardLayout"
import DashboardNavbar from "examples/Navbars/DashboardNavbar"
import axios from "axios"
import "react-datepicker/dist/react-datepicker.css";
import { Card, CardActionArea, CardMedia, CardContent, Grid, Typography, Stack, TextField, Box, Autocomplete, InputAdornment, Button, Alert } from '@mui/material';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useForm, Controller, SubmitHandler, set } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import Swal from "sweetalert2";

import './style.css';
import dataAnak from "./data/data";
import calculateWeightGain from "./data/calculateWeightGain";
import giziCalculation from "./data/giziCalculation";
import bayiImage from "assets/images/penimbangan/bayi.png";
import MonitorWeightIcon from '@mui/icons-material/MonitorWeight';

import { format } from 'date-fns'; // Import date-fns format function
import { id as idLocale } from 'date-fns/locale'; // Correct import for the locale

import React, { useEffect, useState } from 'react'
import { Create } from "@mui/icons-material";
import SessionExpired from "layouts/authentication/log-out/session";


const CreatePenimbangan = () => {
    SessionExpired();
    const navigate = useNavigate();
    const [data, setData] = useState([])
    const { control, handleSubmit, setValue, watch, formState: { errors } } = useForm();
    const today = dayjs();
    const [selectedAnak, setSelectedAnak] = useState(null);
    const [isUsiaEnabled, setIsUsiaEnabled] = useState(false);
    const [previousWeight, setPreviousWeight] = useState(null);
    const [previousHeight, setPreviousHeight] = useState(null);
    const [previousMonth, setPreviousMonth] = useState(null);

    useEffect(() => {
        if (selectedAnak) {
            // console.log(selectedAnak)
            const berat_badan = data.find(child => child.nik === selectedAnak?.nik)?.berat_badan;
            const tinggi_badan = data.find(child => child.nik === selectedAnak?.nik)?.tinggi_badan;
            const umur = data.find(child => child.nik === selectedAnak?.nik)?.usia;
            const nik = data.find(child => child.nik === selectedAnak?.nik)?.nik;
            if (berat_badan) {
                setValue("berat_badan", berat_badan);
                setValue("nik_anak", nik);
                setPreviousWeight(berat_badan);
                setPreviousHeight(tinggi_badan);
                setPreviousMonth(umur);
            }
            setValue("usia", previousMonth ? previousMonth + 1 : umur + 1);

        }
    }, [selectedAnak, setValue]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/getAnak')
            .then(res => {
                if (Array.isArray(res.data.anak)) {
                    const transformedData = dataAnak(res.data.anak);
                    setData(transformedData);
                    // console.log(selectedAnak);
                    console.log(transformedData);
                } else {
                    console.error('Data anak yang diterima tidak berupa array:', res.data.anak);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [selectedAnak])

    const handleEnableUsiaField = () => {
        setIsUsiaEnabled(true);
    }

    const handleDisableUsiaField = () => {
        setIsUsiaEnabled(false);
    }

    const handleCalculateWeightGain = () => {
        const currentWeight = watch('berat_badan');
        const result = calculateWeightGain(previousWeight, previousMonth, currentWeight);
        setValue("keterangan", result);
    };
    const handleCalculateGizi = () => {
        const jenis_kelamin = data.find(child => child.nik === selectedAnak?.nik)?.jenis_kelamin;
        const currentWeight = watch('berat_badan'); // Get current weight from form
        const usia = watch('usia');
        setValue("status_gizi", giziCalculation(usia, currentWeight, jenis_kelamin));

    }

    const onSubmit = async (data) => {
        const id_kader = localStorage.getItem('id_user');
        if (!selectedAnak || !selectedAnak.nik) {
            Swal.fire({
                title: 'Gagal!',
                text: 'Data anak belum dipilih!',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
            return; // Prevent form submission
        }
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/getPenimbanganByNik/${data.nik_anak}`)
            const bulan_ke = response.data.penimbangan.length;
            const formData = {
                nik_anak: data.nik_anak,
                id_kader: id_kader,
                tgl_penimbangan: dayjs(data.tgl_penimbangan).format('YYYY-MM-DD'),
                bulan_ke: bulan_ke, // Set the bulan_ke from the length of penimbangan data
                usia: data.usia,
                berat_badan: data.berat_badan,
                tinggi_badan: data.tinggi_badan,
                keterangan: data.keterangan,
                status_gizi: data.status_gizi,
                saran: data.saran
            };

            console.log(formData);

            const result = await axios.post('http://localhost:8000/api/createPenimbangan', formData)
                .then(res => {
                    // console.log(res.data);
                    //update umur anak
                    const umur = data.usia;
                    const nik = data.nik_anak;

                    axios.patch(`http://localhost:8000/api/updateUmur/${nik}?umur=${umur}`)
                    //tambahkan swal success
                    Swal.fire({
                        icon: 'success',
                        title: 'Data Berhasil Ditambahkan',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    navigate('/penimbangan');

                })
                .catch(error => {
                    console.error('Error adding data:', error);
                    //tambahkan swal error
                    Swal.fire({
                        icon: 'error',
                        title: 'Data Gagal Ditambahkan',
                        showConfirmButton: false,
                        timer: 1500
                    })
                });


        } catch (error) {
            console.error('Error fetching or adding data:', error);
        }
    };

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Alert variant="filled" icon={<MonitorWeightIcon fontSize="inherit" />} severity="info" sx={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', marginTop: '1rem' }}>
                Halaman Create Imunisasi
            </Alert>
            {data && (
                <form onSubmit={handleSubmit(onSubmit)}>



                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={6}>
                            <Stack direction="column" justifyContent="flex-start" alignItems="flex-start" spacing={3}>

                                <Box
                                    sx={{
                                        width: 500,
                                        maxWidth: '100%',
                                    }}
                                >
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
                                                onChange={(event, value) => setSelectedAnak(value)}
                                                // onChange={(event, value) => console.log(value)}
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
                                {selectedAnak && (
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
                                                                <TableCell>NIK Anak</TableCell>
                                                                <TableCell>{selectedAnak.nama_anak}</TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell>Nama Anak</TableCell>
                                                                <TableCell>{selectedAnak.nama_anak}</TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell>Jenis Kelamin</TableCell>
                                                                <TableCell>{selectedAnak.jenis_kelamin}</TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell>Tanggal Lahir</TableCell>
                                                                <TableCell>{format(new Date(selectedAnak.tanggal_lahir), 'dd MMMM yyyy', { locale: idLocale })}</TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell>Berat Badan</TableCell>
                                                                <TableCell>{previousWeight} kg</TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell>Tinggi Badan</TableCell>
                                                                <TableCell>{previousHeight} cm</TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell>Umur</TableCell>
                                                                <TableCell>{selectedAnak.umur} bulan</TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell>Jenis Kelamin</TableCell>
                                                                <TableCell>{selectedAnak.jenis_kelamin}</TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell>Nama Ibu</TableCell>
                                                                <TableCell>{selectedAnak.nama_ibu}</TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell>Nama Ayah</TableCell>
                                                                <TableCell>{selectedAnak.nama_ayah}</TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell>Alamat</TableCell>
                                                                <TableCell>{selectedAnak.alamat}</TableCell>
                                                            </TableRow>

                                                            {/* Tambahkan baris lain sesuai dengan data anak yang ingin ditampilkan */}
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                )}
                            </Stack>
                        </Grid>
                        <Grid item xs={6}>
                            <Stack direction="column" justifyContent="flex-start" alignItems="flex-start" spacing={3}>
                                <Box
                                    sx={{
                                        width: 500,
                                        maxWidth: '100%',
                                    }}
                                >
                                    <Controller
                                        name="tgl_penimbangan"
                                        control={control}
                                        defaultValue={today} // Set defaultValue to today's date
                                        render={({ field }) => <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DemoContainer components={['DatePicker']}>
                                                <DatePicker fullWidth label="Tanggal Penimbangan" {...field} />
                                            </DemoContainer>
                                        </LocalizationProvider>}
                                    />
                                </Box>
                                <Box
                                    sx={{
                                        width: 500,
                                        maxWidth: '100%',
                                    }}
                                >
                                    <Controller
                                        name="usia"
                                        control={control}
                                        defaultValue=""
                                        rules={{
                                            required: 'Usia harus diisi',
                                            min: { value: 0, message: 'Usia tidak boleh negatif' }
                                        }}
                                        render={({ field }) => <TextField fullWidth {...field} label="Usia" variant="outlined" disabled={!isUsiaEnabled} type='number'
                                            error={Boolean(errors.usia)}
                                            helperText={errors.usia && errors.usia.message}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">bulan</InputAdornment>,
                                            }} />}
                                    />
                                    <Button
                                        size="small"
                                        variant="contained"
                                        color="success"
                                        id="warning-button"
                                        onClick={isUsiaEnabled ? handleDisableUsiaField : handleEnableUsiaField}
                                    >
                                        {isUsiaEnabled ? 'Disabled' : 'Enabled'}
                                    </Button>
                                </Box>
                                <Box
                                    sx={{
                                        width: 500,
                                        maxWidth: '100%',
                                    }}
                                >
                                    <Controller
                                        name="berat_badan"
                                        control={control}
                                        defaultValue=""
                                        rules={{
                                            required: 'Berat badan harus diisi',
                                            min: { value: 0, message: 'Berat badan tidak boleh negatif' }
                                        }}
                                        render={({ field }) => <TextField fullWidth {...field} label="Berat Badan" variant="outlined" type='number'
                                            error={Boolean(errors.berat_badan)}
                                            helperText={errors.berat_badan && errors.berat_badan.message}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">kg</InputAdornment>,
                                            }} />}
                                    />
                                </Box>
                                <Box
                                    sx={{
                                        width: 500,
                                        maxWidth: '100%',
                                    }}
                                >
                                    <Controller
                                        name="tinggi_badan"
                                        control={control}
                                        defaultValue=""
                                        rules={{
                                            required: 'Tinggi badan harus diisi',
                                            min: { value: 0, message: 'Tinggi badan tidak boleh negatif' }
                                        }}
                                        render={({ field }) => <TextField fullWidth {...field} label="Tinggi Badan" variant="outlined" type='number'
                                            error={Boolean(errors.tinggi_badan)}
                                            helperText={errors.tinggi_badan && errors.tinggi_badan.message}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">cm</InputAdornment>,
                                            }} />}
                                    />
                                </Box>
                                <Box
                                    sx={{
                                        width: 500,
                                        maxWidth: '100%',
                                    }}
                                >
                                    <Controller
                                        name="keterangan"
                                        control={control}
                                        defaultValue=""
                                        rules={{
                                            required: 'Keterangan harus diisi'
                                        }}
                                        render={({ field }) => <TextField fullWidth {...field} label="Keterangan" variant="outlined" disabled
                                            error={Boolean(errors.keterangan)}
                                            helperText={errors.keterangan && errors.keterangan.message} />}
                                    />
                                    <Button variant="contained" color="success" id="warning-button" onClick={handleCalculateWeightGain}>
                                        Hitung Kenaikan
                                    </Button>
                                </Box>
                                <Box
                                    sx={{
                                        width: 500,
                                        maxWidth: '100%',
                                    }}
                                >
                                    <Controller
                                        name="status_gizi"
                                        control={control}
                                        defaultValue=""
                                        rules={{
                                            required: 'Status gizi harus diisi'
                                        }}
                                        render={({ field }) => <TextField fullWidth {...field} label="Status Gizi" variant="outlined"
                                            error={Boolean(errors.status_gizi)}
                                            helperText={errors.status_gizi && errors.status_gizi.message} />}
                                    />
                                    <Button variant="contained" color="success" id="warning-button" onClick={handleCalculateGizi}>
                                        Hitung Status Gizi
                                    </Button>
                                </Box>

                                <Box
                                    sx={{
                                        width: 500,
                                        maxWidth: '100%',
                                    }}
                                >
                                    <Controller
                                        name="saran"
                                        control={control}
                                        defaultValue=""
                                        rules={{
                                            required: 'Saran harus diisi'
                                        }}
                                        render={({ field }) =>
                                            <TextField
                                                fullWidth
                                                id="outlined-multiline-static"
                                                label="saran"
                                                multiline
                                                rows={4}
                                                {...field}
                                                error={Boolean(errors.saran)}
                                                helperText={errors.saran && errors.saran.message}
                                            />}
                                    />
                                </Box>
                                <Box
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                    mt={3}
                                >

                                    <Grid container spacing={2}>
                                        <Grid item>
                                            <Button variant="contained" id='back-button'
                                                href="/anak"
                                            >
                                                Kembali
                                            </Button>
                                        </Grid>
                                        <Grid item>
                                            <Button variant="contained" id='save-button' type='submit'>
                                                Tambah Data Anak
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Stack>
                        </Grid>
                    </Grid>
                </form>
            )}

        </DashboardLayout>
    )
}

export default CreatePenimbangan