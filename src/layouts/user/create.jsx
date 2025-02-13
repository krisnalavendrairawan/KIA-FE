import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Box, TextField, Stack, Grid, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Button, MenuItem, Select } from '@mui/material';

import { useForm, Controller, SubmitHandler } from "react-hook-form"
import axios from 'axios';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';

import { useState } from 'react';


import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

//utils
import { validateNIK, validateRT, validateEmail, validatePasswordMatch, checkUsernameExists, checkEmailExists, checkNIKExists } from './utils/validateUtils';
import SessionExpired from "layouts/authentication/log-out/session";

const CreateUser = () => {
    SessionExpired();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const { control, handleSubmit, formState: { errors } } = useForm();
    const today = dayjs();

    const onSubmit = async (data) => {
        if (!validateEmail(data.email)) {
            return;
        }
        const isPasswordMatch = validatePasswordMatch(data.password, data.confirm_password);
        if (!isPasswordMatch) {
            return;
        }

        const userData = {
            nik: data.nik,
            nama: data.nama,
            username: data.username,
            email: data.email,
            password: data.password,
            confirm_password: data.confirm_password,
            jenis_kelamin: data.jenis_kelamin,
            rt: data.rt,
            rw: data.rw,
            role: data.role,
            telepon: data.telepon,
            alamat: data.alamat
        }

        const nikExists = await checkNIKExists(userData.nik);
        const usernameExists = await checkUsernameExists(userData.username);
        const emailExists = await checkEmailExists(userData.email);

        try {
            const res = await axios.post('http://127.0.0.1:8000/api/register', userData);
            console.log(res);
            Swal.fire({
                icon: 'success',
                title: 'Berhasil',
                text: 'Data user berhasil ditambahkan!',
            }).then(() => {
                window.location.href = '/user';
            });
        } catch (err) {
            console.error(err);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Data user gagal ditambahkan!',
            });
        }


    }

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                mt={5}
                mb={5}
            >
                <h3>Tambah Data User</h3>
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
                                        required: 'Kolom NIK harus diisi',
                                        min: { value: 1, message: "NIK must be at least 1" },
                                    }}
                                    render={({ field }) => <TextField fullWidth {...field} label="NIK" variant="outlined" type='number' error={Boolean(errors.nik)} helperText={errors.nik && errors.nik.message} />}
                                />
                            </Box>
                            <Box
                                sx={{
                                    width: 500,
                                    maxWidth: '100%',
                                }}
                            >
                                <Controller
                                    name="nama"
                                    control={control}
                                    defaultValue=""
                                    rules={{
                                        required: 'Kolom Nama harus diisi',
                                    }}
                                    render={({ field }) => <TextField fullWidth {...field} label="Nama" variant="outlined"
                                        error={Boolean(errors.nama)}
                                        helperText={errors.nama && errors.nama.message}
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
                                    name="username"
                                    control={control}
                                    defaultValue=""
                                    rules={{
                                        required: 'Kolom Username harus diisi',
                                    }}
                                    render={({ field }) => <TextField fullWidth {...field} label="Username" variant="outlined"
                                        error={Boolean(errors.username)}
                                        helperText={errors.username && errors.username.message}
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
                                    name="email"
                                    control={control}
                                    defaultValue=""
                                    rules={{
                                        required: 'Kolom Email harus diisi',
                                    }}
                                    render={({ field }) => <TextField fullWidth {...field} label="Email" variant="outlined"
                                        error={Boolean(errors.email)}
                                        helperText={errors.email && errors.email.message}
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
                                    name="password"
                                    control={control}
                                    defaultValue=""
                                    rules={{
                                        required: 'Kolom Password harus diisi',
                                    }}
                                    render={({ field }) => (
                                        <FormControl fullWidth variant="outlined">
                                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                            <OutlinedInput
                                                {...field}
                                                id="outlined-adornment-password"
                                                type={showPassword ? 'text' : 'password'}
                                                error={Boolean(errors.password)}
                                                helperText={errors.password && errors.password.message}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                        >
                                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                                label="Password"
                                            />
                                        </FormControl>
                                    )}
                                />
                            </Box>


                            {/* confirm password */}
                            <Box
                                sx={{
                                    width: 500,
                                    maxWidth: '100%',
                                }}
                            >
                                <Controller
                                    name="confirm_password"
                                    control={control}
                                    defaultValue=""
                                    rules={{
                                        required: 'Kolom Confirm Password harus diisi',
                                    }}
                                    render={({ field }) => (
                                        <FormControl fullWidth variant="outlined">
                                            <InputLabel htmlFor="outlined-adornment-confirm_password">Confirm Password</InputLabel>
                                            <OutlinedInput
                                                {...field}
                                                id="outlined-adornment-confirm_password"
                                                type={showConfirmPassword ? 'text' : 'password'}
                                                error={Boolean(errors.confirm_password)}
                                                helperText={errors.confirm_password && errors.confirm_password.message}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle confirm_password visibility"
                                                            onClick={handleClickShowConfirmPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                        >
                                                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                                label="Confirm Password"
                                            />
                                        </FormControl>
                                    )}
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
                                        defaultValue="Perempuan"
                                        rules={{
                                            required: 'Kolom Jenis Kelamin harus diisi'
                                        }}
                                        render={({ field }) => <Select
                                            fullWidth
                                            labelId="jenis-kelamin-label"
                                            id="jenis-kelamin"
                                            {...field}
                                            label="Jenis Kelamin"
                                            defaultValue='Perempuan'
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
                                    name="rt"
                                    control={control}
                                    defaultValue=""
                                    rules={{
                                        required: 'Kolom RT harus diisi',
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

                            </Box>
                            <Box
                                sx={{
                                    width: 500,
                                    maxWidth: '100%',
                                }}
                            >
                                <FormControl variant="outlined" fullWidth>
                                    <InputLabel id="rw-label">RW</InputLabel>
                                    <Controller
                                        name="rw"
                                        control={control}
                                        defaultValue=""
                                        rules={{
                                            required: 'Kolom RW harus diisi',
                                        }}
                                        render={({ field }) => <Select
                                            fullWidth
                                            error={Boolean(errors.rw)}
                                            helperText={errors.rw && errors.rw.message}
                                            labelId="rw-label"
                                            id="rw"
                                            {...field}
                                            label="RW"
                                            defaultValue={1}
                                            sx={{ height: '40px' }}
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
                                <FormControl variant="outlined" fullWidth>
                                    <InputLabel id="role-label">Petugas</InputLabel>
                                    <Controller
                                        name="role"
                                        control={control}
                                        defaultValue=""
                                        rules={{
                                            required: 'Kolom Petugas harus diisi',
                                        }}
                                        render={({ field }) => <Select
                                            fullWidth
                                            error={Boolean(errors.role)}
                                            helperText={errors.role && errors.role.message}
                                            labelId="role-label"
                                            id="role"
                                            {...field}
                                            label="Petugas"
                                            defaultValue={1}
                                            sx={{ height: '40px' }}
                                        >
                                            <MenuItem value="kader">Kader</MenuItem>
                                            <MenuItem value="bidan">Bidan</MenuItem>

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
                                    name="telepon"
                                    control={control}
                                    defaultValue=""
                                    rules={{
                                        required: 'Kolom Nomer Telepon harus diisi',
                                        min: { value: 1, message: "Nomor Telepon must be at least 1" },
                                    }}
                                    render={({ field }) => <TextField fullWidth {...field} label="Nomor Telepon" variant="outlined"
                                        type='number'
                                        error={Boolean(errors.telepon)}
                                        helperText={errors.telepon && errors.telepon.message}
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
                                        required: 'Kolom Alamat harus diisi',
                                    }}
                                    render={({ field }) =>
                                        <TextField
                                            fullWidth
                                            id="outlined-multiline-static"
                                            label="Alamat"
                                            multiline
                                            rows={4}
                                            {...field}
                                            variant="outlined"
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
                                            href="/user"
                                        >
                                            Kembali
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button variant="contained" id='btn-add-data-anak' type='submit'>
                                            Tambah Data User
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Stack>
                    </Grid>
                </Grid>
            </form>

        </DashboardLayout>
    );
}

export default CreateUser;