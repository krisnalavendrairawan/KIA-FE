import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { Box, TextField, Stack, Grid, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Button, MenuItem, Select, CircularProgress } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { validateRT, checkUsernameExistsEdit, checkEmailExistsEdit } from './utils/validateUtils';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Swal from 'sweetalert2';

const EditUser = () => {
    const [datas, setDatas] = useState({});
    const [loading, setLoading] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const { control, handleSubmit, formState: { errors } } = useForm();
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/getUser/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setDatas(response.data.user);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, [id]);

    
    const onSubmit = async (data) => {
        console.log(data);
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
            alamat: data.alamat,
        }
        const usernameExists = await checkUsernameExistsEdit(userData.username, id);
        const emailExists = await checkEmailExistsEdit(userData.email, id);
        if(data.password !== data.confirm_password){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Password dan Confirm Password tidak sama!',
              })
        }else if(usernameExists === "Username sudah digunakan"){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Username sudah digunakan!',
              })
            return;
        } else if(emailExists === "Email sudah digunakan"){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Email sudah digunakan!',
                })
            return;
        } else{
            try {
                const response = await axios.put(`http://127.0.0.1:8000/api/updateUser/${id}`, userData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                console.log(response);
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil',
                    text: 'Data user berhasil diubah!',
                }).then(() => {
                    window.location.href = '/user';
                });

            } catch (error) {
                console.error("Error updating data: ", error);
            }
        }
    };

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Box>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    flexDirection="column"
                    mt={5}
                    mb={5}
                >
                    <h3>Edit Data User</h3>
                </Box>
                {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                        <CircularProgress />
                    </Box>
                ) : datas && (
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
                                            name="nama"
                                            control={control}
                                            defaultValue={datas.nama}
                                            render={({ field }) => <TextField fullWidth {...field} label="Nama" variant="outlined" />}
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
                                            defaultValue={datas.username}
                                            render={({ field }) => <TextField fullWidth {...field} label="Username" variant="outlined" />}
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
                                            defaultValue={datas.email}
                                            render={({ field }) => <TextField fullWidth {...field} label="Email" variant="outlined" />}
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
                                            defaultValue={datas.confirm_password}
                                            render={({ field }) => (
                                                <FormControl fullWidth variant="outlined">
                                                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                                    <OutlinedInput
                                                        {...field}
                                                        id="outlined-adornment-password"
                                                        type={showPassword ? 'text' : 'password'}
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
                                            defaultValue={datas.confirm_password}
                                            render={({ field }) => (
                                                <FormControl fullWidth variant="outlined">
                                                    <InputLabel htmlFor="outlined-adornment-confirm_password">Confirm Password</InputLabel>
                                                    <OutlinedInput
                                                        {...field}
                                                        id="outlined-adornment-confirm_password"
                                                        type={showConfirmPassword ? 'text' : 'password'}
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
                                                defaultValue={datas.jenis_kelamin}
                                                render={({ field }) => <Select
                                                    fullWidth 
                                                    labelId="jenis-kelamin-label"
                                                    id="jenis-kelamin"
                                                    {...field}
                                                    label="Jenis Kelamin"
                                                    defaultValue='Laki-Laki'
                                                    sx={{ height: '40px'}}
            
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
                                        defaultValue={datas.rt}
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
                                                defaultValue={datas.rw}
                                                render={({ field }) => <Select
                                                    fullWidth 
                                                    labelId="rw-label"
                                                    id="rw"
                                                    {...field}
                                                    label="RW"
                                                    defaultValue={1}
                                                    sx={{ height: '40px'}}
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
                                                defaultValue={datas.role}
                                                render={({ field }) => <Select
                                                    fullWidth 
                                                    labelId="role-label"
                                                    id="role"
                                                    {...field}
                                                    label="Petugas"
                                                    defaultValue={1}
                                                    sx={{ height: '40px'}}
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
                                            defaultValue={datas.telepon}
                                            render={({ field }) => <TextField fullWidth {...field} label="Nomor Telepon" variant="outlined" />}
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
                )}
            </Box>
        </DashboardLayout>
    );
}

export default EditUser;
