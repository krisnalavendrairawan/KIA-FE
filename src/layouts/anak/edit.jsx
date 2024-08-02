import { Stack, TextField, Box, Grid, MenuItem, InputLabel, Select, InputAdornment, Button, FormControl } from '@mui/material';
import "react-datepicker/dist/react-datepicker.css";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import axios from 'axios';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useState, useEffect } from 'react';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout"
import DashboardNavbar from "examples/Navbars/DashboardNavbar"
import SessionExpired from "layouts/authentication/log-out/session";

const EditAnak = () => {
    SessionExpired();
    const navigate = useNavigate();
    const [datas, setDatas] = useState(null);

    const { nik } = useParams();
    const today = dayjs();

    const { control, handleSubmit } = useForm();

    useEffect(() => {
        axios.get(`http:////127.0.0.1:8000/api/getAnak/${nik}`)
            .then((response) => {
                setDatas(response.data.anak);
                // console.log("Data fetched: ", response.data.anak);
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
            });
    }, []);


    const onSubmit = (data) => {
        const dataAnak = {
            nik: data.nik,
            no_kk: data.no_kk,
            nama_anak: data.nama_anak,
            nama_ibu: data.nama_ibu,
            nama_ayah: data.nama_ayah,
            anak_ke: data.anak_ke,
            //tanggal lahir diubah ke format YYYY-MM-DD
            tanggal_lahir: dayjs(data.tanggal_lahir).format('YYYY-MM-DD'),
            jenis_kelamin: data.jenis_kelamin,
            bb_lahir: data.bb_lahir,
            pb_lahir: data.pb_lahir,
            no_hp_ortu: data.no_hp_orang_tua,
            rt: data.rt,
            rw: data.rw,
            alamat: data.alamat
        }
        console.log(dataAnak);
        axios.put(`http://127.0.0.1:8000/api/updateAnak/${nik}`, dataAnak)
            .then((response) => {
                console.log(response);
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil',
                    text: 'Data anak berhasil diubah',
                });
                navigate('/anak');
            })
            .catch((error) => {
                console.error("Error updating data: ", error);
            });
    };

    console.log(datas);
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
            >
                <h3>Edit Data Anak</h3>
            </Box>
            {datas && (
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
                                        defaultValue={datas.nik}
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
                                        defaultValue={datas.no_kk}
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
                                        defaultValue={datas.nama_anak}
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
                                        defaultValue={datas.nama_ibu}
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
                                        defaultValue={datas.nama_ayah}
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
                                        defaultValue={datas.anak_ke}
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
                                        defaultValue={dayjs(datas.tanggal_lahir)}
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

                                            render={({ field }) => <Select
                                                fullWidth
                                                labelId="jenis-kelamin-label"
                                                id="jenis-kelamin"
                                                {...field}
                                                label="Jenis Kelamin"
                                                defaultValue={datas.jenis_kelamin}
                                                sx={{ height: '40px' }}
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
                                        defaultValue={datas.bb_lahir}
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
                                        defaultValue={datas.pb_lahir}
                                        render={({ field }) => <TextField fullWidth {...field} label="Panjang Badan Lahir" variant="outlined" type='number' InputProps={{
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
                                        defaultValue={datas.rt}
                                        render={({ field }) => <TextField fullWidth {...field} label="RT" variant="outlined" type='number' />}
                                    />
                                    <FormControl variant="outlined" fullWidth>
                                        <InputLabel id="rw-label">RW</InputLabel>
                                        <Controller
                                            name="rw"
                                            control={control}
                                            defaultValue={datas.rw}
                                            render={({ field }) => <Select
                                                fullWidth
                                                labelId="rw-label"
                                                id="rw"
                                                {...field}
                                                label="RW"
                                                defaultValue={1}
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
                                        defaultValue={datas.no_hp_ortu}
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
                                        defaultValue={datas.alamat}
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
            )}




        </DashboardLayout>
    )
}

export default EditAnak