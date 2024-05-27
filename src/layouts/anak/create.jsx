import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Stack } from '@mui/material';
import "react-datepicker/dist/react-datepicker.css";
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputAdornment from '@mui/material/InputAdornment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Button from '@mui/material/Button';
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import axios from 'axios';
import dayjs from 'dayjs';

import './style.css';


import { useState } from 'react';

import DashboardLayout from "examples/LayoutContainers/DashboardLayout"
import DashboardNavbar from "examples/Navbars/DashboardNavbar"

const CreateAnak = () => {
    const [jenisKelamin, setJenisKelamin] = useState('');

    const {control, handleSubmit} = useForm();
    const today = dayjs();

    const handleChange = (event) => {
        setJenisKelamin(event.target.value);
    };

    const onSubmit = (data) => {
        const dataAnak = {
            nik: data.nik,
            no_kk: data.no_kk,
            nama_anak: data.nama_anak,
            nama_ibu: data.nama_ibu,
            nama_ayah: data.nama_ayah,
            anak_ke: data.anak_ke,
            tanggal_lahir: dayjs(data.tanggal_lahir).format('YYYY-MM-DD'),
            jenis_kelamin: data.jenis_kelamin,
            bb_lahir: data.bb_lahir,
            pb_lahir: data.pb_lahir,
            no_hp_ortu: data.no_hp_orang_tua,
            alamat: data.alamat,
            umur: 0,
        }
        // console.log(dataAnak);
        axios.post('http://127.0.0.1:8000/api/createAnak', dataAnak)
        .then(response => {
            const dataPenimbangan = {
                tgl_penimbangan: dayjs(data.tanggal_lahir).format('YYYY-MM-DD'),
                nik_anak: data.nik,
                berat_badan: data.bb_lahir,
                tinggi_badan: data.pb_lahir,
                status_gizi: '-',
                keterangan: '-',
                saran : '-',
                id_kader: localStorage.getItem('id_user'),
                usia : 0,
                bulan_ke : 0,
            }
            console.log(dataPenimbangan);
           axios.post('http://127.0.0.1:8000/api/createPenimbangan', dataPenimbangan)
              .then(response => {
                console.log(response);
                window.location.href = "/anak";
                })
        })
        .catch(error => {
            console.log(error);
        })

    };

    return (
        <DashboardLayout>
            <DashboardNavbar />
            {/* judul tambah data anak */}
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                mt={5}
                mb={5}
                //tambah warna background
                sx={{
                    // bgcolor: "green",
                    // color : "white",
                }}
            >
                <h3>Tambah Data Anak</h3>
            </Box>

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
                            name="nik"
                            control={control}
                            defaultValue=""
                            render={({ field }) => <TextField fullWidth {...field} label="NIK" variant="outlined" type='number' />}
                        />
                    </Box>
                    <Box
                        sx={{
                            width: 500,
                            maxWidth: '100%',
                        }}
                    >
                        <Controller
                            name="no_kk"
                            control={control}
                            defaultValue=""
                            render={({ field }) => <TextField fullWidth {...field} label="No KK" variant="outlined" type='number' />}
                        />
                    </Box>
                    <Box
                        sx={{
                            width: 500,
                            maxWidth: '100%',
                        }}
                    >
                        <Controller
                            name="nama_anak"
                            control={control}
                            defaultValue=""
                            render={({ field }) => <TextField fullWidth {...field} label="Nama Anak" variant="outlined" />}
                        />
                    </Box>
                    <Box
                        sx={{
                            width: 500,
                            maxWidth: '100%',
                        }}
                    >
                        <Controller
                            name="nama_ibu"
                            control={control}
                            defaultValue=""
                            render={({ field }) => <TextField fullWidth {...field} label="Nama Ibu" variant="outlined" />}
                        />
                    </Box>
                    <Box
                        sx={{
                            width: 500,
                            maxWidth: '100%',
                        }}
                    >
                        <Controller
                            name="nama_ayah"
                            control={control}
                            defaultValue=""
                            render={({ field }) => <TextField fullWidth {...field} label="Nama Ayah" variant="outlined" />}
                        />
                    </Box>
                    <Box
                        sx={{
                            width: 500,
                            maxWidth: '100%',
                        }}
                    >
                        <Controller
                            name="anak_ke"
                            control={control}
                            defaultValue=""
                            render={({ field }) => <TextField fullWidth {...field} label="Anak Ke-" variant="outlined" type='number' />}
                        />
                    </Box>

                        {/* Tanggal Lahir */}

                        <Box
                        sx={{
                            width: 500,
                            maxWidth: '100%',
                        }}
                        >
                        <Controller
                            name="tanggal_lahir"
                            control={control}
                            defaultValue={today} // Set defaultValue to today's date
                            render={({ field }) => <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker fullWidth label="Tanggal Lahir" {...field} />
                                </DemoContainer>
                            </LocalizationProvider>}
                        />
                        </Box>
                    </Stack>
                </Grid>
                <Grid item xs={6}>
                <Stack direction="column" justifyContent="flex-start" alignItems="flex-start" spacing={3}>
                    {/* Jenis Kelamin */}
                    <Box
                        sx={{
                            width: 500,
                            maxWidth: '100%',
                        }}
                    >
                    <FormControl variant="outlined" fullWidth>
                            <InputLabel id="jenis-kelamin-label">Jenis Kelamin</InputLabel>
                            <Controller
                                name="jenis_kelamin"
                                control={control}
                                defaultValue=""
                                render={({ field }) => <Select
                                    fullWidth 
                                    labelId="jenis-kelamin-label"
                                    id="jenis-kelamin"
                                    {...field}
                                    label="Jenis Kelamin"
                                    defaultValue='Laki-Laki'
                                    sx={{ height: '40px'}}
                                >
                                    <MenuItem value="Laki-laki">Laki-laki</MenuItem>
                                    <MenuItem value="Perempuan">Perempuan</MenuItem>
                                </Select>}
                            />
                        </FormControl>
                    </Box>
                    <Box
                         sx={{
                            width: 500,
                            maxWidth: '100%',
                        }}
                    >
                    <Controller
                        name="bb_lahir"
                        control={control}
                        defaultValue=""
                        render={({ field }) => <TextField fullWidth {...field} label="Berat Badan Lahir" variant="outlined" type='number' InputProps={{
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
                        name="pb_lahir"
                        control={control}
                        defaultValue=""
                        render={({ field }) => <TextField fullWidth {...field} label="Panjang Badan Lahir" variant="outlined" type='number' InputProps={{
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
                            name="no_hp_orang_tua"
                            control={control}
                            defaultValue=""
                            render={({ field }) => <TextField fullWidth {...field} label="No HP Orang Tua" variant="outlined" type='number' />}
                        />
                    </Box>

                    <Box
                         sx={{
                            width: 500,
                            maxWidth: '100%',
                        }}
                    >
                    <Controller
                        name="alamat"
                        control={control}
                        defaultValue=""
                        render={({ field }) =>
                        <TextField
                            fullWidth 
                            id="outlined-multiline-static"
                            label="Alamat"
                            multiline
                            rows={4}
                            {...field}
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
                            <Button variant="contained" id='btn-back'
                                href="/anak"
                            >
                                Kembali
                            </Button>
                            </Grid>
                            <Grid item>
                            <Button variant="contained" id='btn-add-data-anak' type='submit'>
                                Tambah Data Anak
                            </Button>
                            </Grid>
                        </Grid>
                    </Box>
                    </Stack>
                </Grid>
            </Grid>
            </form>


            
            
        </DashboardLayout>
    )
}

export default CreateAnak;
