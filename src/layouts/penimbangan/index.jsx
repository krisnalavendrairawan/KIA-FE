import DashboardLayout from "examples/LayoutContainers/DashboardLayout"
import DashboardNavbar from "examples/Navbars/DashboardNavbar"
import axios from "axios"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Stack } from '@mui/material';
import "react-datepicker/dist/react-datepicker.css";
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Button from '@mui/material/Button';
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import dayjs from 'dayjs';

import './style.css';
import dataAnak from "./data/data";
import bayiImage from "assets/images/penimbangan/bayi.png";


import React, { useEffect, useState } from 'react'


const Penimbangan = () => {
    const [data, setData] = useState([])
    const {control, handleSubmit, setValue, watch} = useForm();
    const today = dayjs();
    const [selectedAnak, setSelectedAnak] = useState(null);
    const [isUsiaEnabled, setIsUsiaEnabled] = useState(false);


    const onSubmit = (data) => {}

    useEffect(() => {
        if (selectedAnak) {
            const defaultAge = selectedAnak.umur + 1; // Menetapkan defaultValue usia menjadi umur + 1
            setValue("usia", defaultAge); // Menggunakan setValue untuk menetapkan defaultValue
        }
    }, [selectedAnak, setValue]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/getAnak')
    .then(res => {
        if (Array.isArray(res.data.anak)) {
            const transformedData = dataAnak(res.data.anak); 
            setData(transformedData);
            console.log(transformedData);
        } else {
            console.error('Data anak yang diterima tidak berupa array:', res.data.anak);
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
    }, [])

    const handleEnableUsiaField = () => {
        setIsUsiaEnabled(true);
    }

    const handleDisableUsiaField = () => {
        setIsUsiaEnabled(false);
    }
    
    return (
        <DashboardLayout>
            <DashboardNavbar />
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
                name="nama_anak"
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
        {selectedAnak && (
            <Box>
                <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
  <CardMedia
    component="img"
    height="140"
    image={bayiImage}
    width={100}
  />
  <CardContent>
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography gutterBottom variant="h6" component="div">
          NIK Anak
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {selectedAnak.nik}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          No KK
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {selectedAnak.no_kk}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          Nama Anak
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {selectedAnak.nama_anak}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          Jenis Kelamin
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {selectedAnak.jenis_kelamin}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          Umur
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {selectedAnak.umur}-bulan
        </Typography>
      </Grid>
      <Grid item xs={6}>

        <Typography gutterBottom variant="h6" component="div">
          Nama Ibu
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {selectedAnak.nama_ibu}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          Nama Ayah
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {selectedAnak.nama_ayah}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          Alamat
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {selectedAnak.alamat}
        </Typography>
      </Grid>
    </Grid>
  </CardContent>
</CardActionArea>


    </Card>
            </Box>
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
                name="tanggal_lahir"
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
            
            render={({ field }) => <TextField fullWidth {...field} label="Usia" variant="outlined" disabled={!isUsiaEnabled}  type='number' InputProps={{
                startAdornment: <InputAdornment position="start">bulan</InputAdornment>,
            }} />}
            />
            <Button 
                size="small"
                variant="contained" 
                color="success" 
                id="btn-hitung-usia" 
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
            render={({ field }) => <TextField fullWidth {...field} label="Berat Badan" variant="outlined" type='number' InputProps={{
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
            render={({ field }) => <TextField fullWidth {...field} label="Tinggi Badan" variant="outlined" type='number' InputProps={{
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
                render={({ field }) => <TextField fullWidth {...field} label="Keterangan" variant="outlined" />}
            />
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
                render={({ field }) => <TextField fullWidth {...field} label="Status Gizi" variant="outlined" />}
            />
            <Button variant="contained" color="success" id="btn-hitung-gizi">
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
            render={({ field }) =>
            <TextField
                fullWidth 
                id="outlined-multiline-static"
                label="saran"
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

export default Penimbangan