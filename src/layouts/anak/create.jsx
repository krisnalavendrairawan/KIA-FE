import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Stack } from '@mui/material';
import "react-datepicker/dist/react-datepicker.css";
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useNavigate } from 'react-router-dom';
import InputAdornment from '@mui/material/InputAdornment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Button from '@mui/material/Button';
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import axios from 'axios';
import dayjs from 'dayjs';
import SessionExpired from "layouts/authentication/log-out/session";

import { validateRT, validateNIK } from 'layouts/anak/utils/validateUtils';
import Swal from 'sweetalert2';

import './style.css';


import { useState } from 'react';

import DashboardLayout from "examples/LayoutContainers/DashboardLayout"
import DashboardNavbar from "examples/Navbars/DashboardNavbar"

const CreateAnak = () => {
    SessionExpired();
    const navigate = useNavigate();
    const [jenisKelamin, setJenisKelamin] = useState('');

    const { control, handleSubmit, formState: { errors } } = useForm();
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
            rt: data.rt,
            rw: data.rw,
            alamat: data.alamat,
            umur: 0,
        }
        // console.log(dataAnak);
        axios.post('http://127.0.0.1:8000/api/createAnak', dataAnak)
            .then(response => {
                const id_kader = localStorage.getItem('id_user');
                const dataPenimbangan = {
                    tgl_penimbangan: dayjs(data.tanggal_lahir).format('YYYY-MM-DD'),
                    nik_anak: data.nik,
                    berat_badan: data.bb_lahir,
                    tinggi_badan: data.pb_lahir,
                    status_gizi: '-',
                    keterangan: '-',
                    saran: '-',
                    id_kader: id_kader,
                    usia: 0,
                    bulan_ke: 0,
                }
                console.log(dataPenimbangan);
                axios.post('http://127.0.0.1:8000/api/createPenimbangan', dataPenimbangan)
                    .then(response => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Berhasil',
                            text: 'Data Anak berhasil ditambahkan',
                        }).then(() => {
                            navigate('/anak')
                        })
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
                                    rules={{
                                        required: 'NIK is tidak boleh kosong',
                                        min: { value: 1, message: "NIK must be at least 1" },
                                        validate: validateNIK // Custom validation function

                                    }}
                                    render={({ field }) => <TextField fullWidth {...field} label="NIK" variant="outlined" type='number'
                                        error={Boolean(errors.nik)}
                                        helperText={errors.nik && errors.nik.message} />}
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
                                    rules={{
                                        required: 'No KK tidak boleh kosong',
                                        min: { value: 1, message: "No KK must be at least 1" },
                                        validate: validateNIK // Custom validation function
                                    }}
                                    render={({ field }) => <TextField fullWidth {...field} label="No KK" variant="outlined" type='number'
                                        error={Boolean(errors.no_kk)}
                                        helperText={errors.no_kk && errors.no_kk.message} />}
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
                                    rules={{
                                        required: 'Nama Anak tidak boleh kosong',
                                        min: { value: 1, message: "Nama Anak harus terisi" },
                                    }}
                                    render={({ field }) => <TextField fullWidth {...field} label="Nama Anak" variant="outlined"
                                        error={Boolean(errors.nama_anak)}
                                        helperText={errors.nama_anak && errors.nama_anak.message}
                                    />}
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
                                    rules={{
                                        required: 'Nama Ibu tidak boleh kosong',
                                        min: { value: 1, message: "Nama Ibu harus terisi" },
                                    }}
                                    render={({ field }) => <TextField fullWidth {...field} label="Nama Ibu" variant="outlined"
                                        error={Boolean(errors.nama_ibu)}
                                        helperText={errors.nama_ibu && errors.nama_ibu.message} />}
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
                                    rules={{
                                        required: 'Nama Ayah tidak boleh kosong',
                                        min: { value: 1, message: "Nama Ayah harus terisi" },

                                    }}
                                    render={({ field }) => <TextField fullWidth {...field} label="Nama Ayah" variant="outlined"
                                        error={Boolean(errors.nama_ayah)}
                                        helperText={errors.nama_ayah && errors.nama_ayah.message} />}
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
                                    rules={{
                                        required: 'urutan lahir anak tidak boleh kosong',
                                        min: { value: 1, message: "Anak ke harus terisi" },

                                    }}
                                    render={({ field }) => <TextField fullWidth {...field} label="Anak Ke-" variant="outlined" type='number'
                                        error={Boolean(errors.anak_ke)}
                                        helperText={errors.anak_ke && errors.anak_ke.message}
                                    />}
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
                                        defaultValue="Laki-Laki"
                                        rules={{
                                            required: 'Jenis Kelamin tidak boleh kosong',

                                        }}
                                        render={({ field }) => <Select
                                            fullWidth
                                            labelId="jenis-kelamin-label"
                                            id="jenis-kelamin"
                                            {...field}
                                            label="Jenis Kelamin"
                                            sx={{ height: '40px' }}
                                            error={Boolean(errors.jenis_kelamin)}
                                            helperText={errors.jenis_kelamin && errors.jenis_kelamin.message}
                                        >
                                            <MenuItem value="Laki-Laki">Laki-Laki</MenuItem>
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
                                    rules={{
                                        required: 'Berat Badan Lahir tidak boleh kosong',
                                        min: { value: 1, message: "Berat Badan Lahir harus terisi" },
                                    }}
                                    render={({ field }) => <TextField fullWidth {...field} label="Berat Badan Lahir" variant="outlined" type='number'
                                        error={Boolean(errors.bb_lahir)}
                                        helperText={errors.bb_lahir && errors.bb_lahir.message}
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
                                    name="pb_lahir"
                                    control={control}
                                    defaultValue=""
                                    rules={{
                                        required: 'Panjang Badan Lahir tidak boleh kosong',
                                        min: { value: 1, message: "Panjang Badan Lahir harus terisi" },
                                    }}
                                    render={({ field }) => <TextField fullWidth {...field} label="Panjang Badan Lahir" variant="outlined" type='number'
                                        error={Boolean(errors.pb_lahir)}
                                        helperText={errors.pb_lahir && errors.pb_lahir.message}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">cm</InputAdornment>,
                                        }} />}
                                />
                            </Box>
                            <Box
                                sx={{
                                    width: 500,
                                    maxWidth: '100%',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    gap: '10px',
                                }}
                            >
                                <Controller
                                    name="rt"
                                    control={control}
                                    defaultValue=""
                                    rules={{
                                        required: 'RT is required',
                                        min: { value: 1, message: "RT must be at least 1" },
                                        validate: validateRT // Custom validation function
                                    }}
                                    render={({ field }) => (
                                        <TextField
                                            fullWidth
                                            {...field}
                                            label="RT"
                                            variant="outlined"
                                            type='number'
                                            error={Boolean(errors.rt)}
                                            helperText={errors.rt && errors.rt.message}
                                        />
                                    )}
                                />

                                <FormControl variant="outlined" fullWidth>
                                    <InputLabel id="rw-label">RW</InputLabel>
                                    <Controller
                                        name="rw"
                                        control={control}
                                        defaultValue={1}
                                        render={({ field }) => <Select
                                            fullWidth
                                            labelId="rw-label"
                                            id="rw"
                                            {...field}
                                            label="RW"
                                            sx={{ height: '100%' }}
                                        >
                                            <MenuItem value="1">01</MenuItem>
                                            <MenuItem value="2">02</MenuItem>
                                            <MenuItem value="3">03</MenuItem>
                                            <MenuItem value="4">04</MenuItem>
                                            <MenuItem value="5">05</MenuItem>
                                            <MenuItem value="6">06</MenuItem>
                                            <MenuItem value="7">07</MenuItem>
                                            <MenuItem value="8">08</MenuItem>
                                            <MenuItem value="9">09</MenuItem>
                                            <MenuItem value="10">10</MenuItem>
                                            <MenuItem value="11">11</MenuItem>
                                            <MenuItem value="12">12</MenuItem>
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
                                    name="no_hp_orang_tua"
                                    control={control}
                                    defaultValue=""
                                    rules={{
                                        required: 'No HP Orang Tua tidak boleh kosong',
                                        min: { value: 1, message: "No HP Orang Tua harus terisi" },
                                    }}
                                    render={({ field }) => <TextField fullWidth {...field} label="No HP Orang Tua" variant="outlined" type='number'
                                        error={Boolean(errors.no_hp_orang_tua)}
                                        helperText={errors.no_hp_orang_tua && errors.no_hp_orang_tua.message}
                                    />}
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
                                    rules={{
                                        required: 'Alamat tidak boleh kosong',
                                        min: { value: 1, message: "Alamat harus terisi" },
                                    }}
                                    render={({ field }) =>
                                        <TextField
                                            fullWidth
                                            id="outlined-multiline-static"
                                            label="Alamat"
                                            multiline
                                            rows={4}
                                            {...field}
                                            error={Boolean(errors.alamat)}
                                            helperText={errors.alamat && errors.alamat.message}
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
