import * as React from 'react';
import { Grid, alpha } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import iconPosyandu from 'assets/images/icon_posyandu.png'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

const url = 'http://127.0.0.1:8000/api'

import axios from 'axios';
import { useState, useEffect } from 'react';
import { useForm, Controller, SubmitHandler } from "react-hook-form"

export default function Hero() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const { control, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            console.log(data);
            const response = await axios.get(`${url}/getAnak/${data.nik}`);
            // console.log(response.data.anak);

            //jika data ada alihkan ke halaman anak, jika muncul message "Anak not found" maka
            if (response.data.anak) {
                Swal.fire({
                    icon: 'success',
                    title: 'Data Anak Ditemukan',
                    text: 'Data anak ditemukan, silahkan klik OK untuk melihat data anak anda',
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate(`/anak/${data.nik}`);
                    }
                })
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                Swal.fire({
                    icon: 'error',
                    title: 'Nik yang Anda Masukan Salah',
                    text: 'Data anak tidak ditemukan, silahkan coba lagi',
                    confirmButtonText: 'OK'
                });
            } else {
                setError(error);
            }
        }
    };





    return (
        <form onSubmit={handleSubmit(onSubmit)} >
            <Box
                id="hero"
                sx={(theme) => ({
                    width: '100%',
                    backgroundImage:
                        theme.palette.mode === 'light'
                            ? 'linear-gradient(180deg, #CEE5FD, #FFF)'
                            : `linear-gradient(#02294F, ${alpha('#090E10', 0.0)})`,
                    backgroundSize: '100% 20%',
                    backgroundRepeat: 'no-repeat',
                })}
            >
                <Container
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        pt: { xs: 14, sm: 20 },
                        pb: { xs: 8, sm: 12 },
                    }}
                >
                    <Stack spacing={2} useFlexGap sx={{ width: { xs: '100%', sm: '70%' } }}>
                        <Typography
                            variant="h1"
                            sx={{
                                display: 'flex',
                                flexDirection: { xs: 'column', md: 'row' },
                                alignSelf: 'center',
                                textAlign: 'center',
                                fontSize: 'clamp(3.5rem, 10vw, 4rem)',
                            }}
                        >
                            Posyandu&nbsp;
                            <Typography
                                component="span"
                                variant="h1"
                                sx={{
                                    fontSize: 'clamp(3rem, 10vw, 4rem)',
                                    color: (theme) =>
                                        theme.palette.mode === 'light' ? 'primary.main' : 'primary.light',
                                }}
                            >
                                Cibeusi
                            </Typography>
                        </Typography>
                        <Typography
                            textAlign="center"
                            color="text.secondary"
                            sx={{ alignSelf: 'center', width: { sm: '100%', md: '80%' } }}
                        >
                            Menjadi perantara untuk pelayanan kesehatan keluarga (ibu, bayi, dan balita) agar dapat menjamin pertumbuhan dan perkembangan bayi secara optimal di lingkungan Desa Cibeusi
                        </Typography>
                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            alignSelf="center"
                            spacing={1}
                            useFlexGap
                            sx={{ pt: 2, width: { xs: '100%', sm: 'auto' } }}
                        >
                            {/* <TextField
                                id="outlined-basic"
                                hiddenLabel
                                size="small"
                                variant="outlined"
                                aria-label="Enter your email address"
                                placeholder="Masukan NIK Anak"
                                inputProps={{
                                    autoComplete: 'off',
                                    'aria-label': 'Enter your email address',
                                }}
                            /> */}

                            <Controller
                                name="nik"
                                control={control}
                                defaultValue=""
                                rules={{ required: 'Masukan NIK Anak' }}
                                render={({ field }) => <TextField
                                    {...field}
                                    id="outlined-basic"
                                    hiddenLabel
                                    size="small"
                                    variant="outlined"
                                    aria-label="Masukan Nik Anak"
                                    placeholder="Masukan NIK Anak"
                                    inputProps={{
                                        autoComplete: 'off',
                                        'aria-label': 'Masukan Nik Anak',
                                    }}
                                />}
                            />

                            <Button variant="contained" color="primary" type='submit'>
                                Cari Anak
                            </Button>
                        </Stack>
                        <Typography variant="caption" textAlign="center" sx={{ opacity: 0.8 }}>
                            Dengan menekan memasukan NIK Anak, anda dapat melihat data anak anda di Posyandu Cibeusi. Dengan menekan tombol cari anak
                            .
                        </Typography>
                    </Stack>
                    <Box
                        id="image"
                        sx={(theme) => ({
                            mt: { xs: 8, sm: 10 },
                            alignSelf: 'center',
                            height: { xs: 200, sm: 700 },
                            width: '100%',
                            // backgroundImage: `url(${iconPosyandu})`,
                            // // theme.palette.mode === 'light'
                            // //     ? { iconPosyandu }
                            // //     : { iconPosyandu },
                            backgroundSize: 'cover',
                            borderRadius: '10px',
                            outline: '1px solid',
                            outlineColor:
                                theme.palette.mode === 'light'
                                    ? alpha('#BFCCD9', 0.5)
                                    : alpha('#9CCCFC', 0.1),
                            boxShadow:
                                theme.palette.mode === 'light'
                                    ? `0 0 12px 8px ${alpha('#9CCCFC', 0.2)}`
                                    : `0 0 24px 12px ${alpha('#033363', 0.2)}`,
                        })}


                    >
                        <Grid container spacing={0} justifyContent="center" alignItems="center" padding={5}>
                            <Grid item xs={12} sm={6}>
                                <Typography
                                    component="span"
                                    variant="h1"
                                    sx={{
                                        fontSize: 'clamp(3rem, 10vw, 4rem)',
                                        color: (theme) =>
                                            theme.palette.mode === 'light' ? 'primary.main' : 'primary.light',
                                    }}
                                >
                                    Selamat Datang di Website Posyandu Cibeusi
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <img src={iconPosyandu} alt="iconPosyandu" />
                            </Grid>
                        </Grid>

                    </Box>
                </Container>
            </Box>
        </form>
    );
}