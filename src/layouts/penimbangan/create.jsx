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
import { useForm, Controller, SubmitHandler, set } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

import './style.css';
import dataAnak from "./data/data";
import calculateWeightGain from "./data/calculateWeightGain";
import giziCalculation from "./data/giziCalculation";
import bayiImage from "assets/images/penimbangan/bayi.png";



import React, { useEffect, useState } from 'react'
import { Create } from "@mui/icons-material";


const CreatePenimbangan = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([])
    const {control, handleSubmit, setValue, watch} = useForm();
    const today = dayjs();
    const [selectedAnak, setSelectedAnak] = useState(null);
    const [isUsiaEnabled, setIsUsiaEnabled] = useState(false);
    const [previousWeight, setPreviousWeight] = useState(null);
    const [previousMonth, setPreviousMonth] = useState(null);


    const onSubmit = async (data) => {
        const id_kader = localStorage.getItem('id_user');
        
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/getPenimbanganByNik/${data.nik_anak}`);
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
            
            const result = await axios.post('http://localhost:8000/api/createPenimbangan', formData);
            
            console.log(result.data);
            alert('Data berhasil ditambahkan');
            navigate('/penimbangan')
        } catch (error) {
            console.error('Error fetching or adding data:', error);
        }
    };
    

    useEffect(() => {
        if (selectedAnak) {
            console.log(selectedAnak)
            const berat_badan = data.find(child => child.nik === selectedAnak?.nik)?.berat_badan;
            const umur = data.find(child => child.nik === selectedAnak?.nik)?.usia;
            const nik = data.find(child => child.nik === selectedAnak?.nik)?.nik;
            if (berat_badan) {
                setValue("berat_badan", berat_badan);
                setValue("nik_anak", nik);
                setPreviousWeight(berat_badan);
                setPreviousMonth(umur);
            }
            setValue("usia", previousMonth + 1);

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
    return (
        <DashboardLayout>
            <DashboardNavbar />
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
                          Berat Badan
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                        {/* {data.find(child => child.nik === selectedAnak?.nik)?.berat_badan ?? 'Data not found'} kg */}
                        {previousWeight} kg

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
                          {previousMonth} bulan
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
                                render={({ field }) => <TextField fullWidth {...field} label="Keterangan" variant="outlined" disabled/>}
                            />
                            <Button variant="contained" color="success" id="btn-hitung-gizi" onClick={handleCalculateWeightGain}>
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
                                render={({ field }) => <TextField fullWidth {...field} label="Status Gizi" variant="outlined" />}
                            />
                            <Button variant="contained" color="success" id="btn-hitung-gizi" onClick={handleCalculateGizi}>
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
            )}

        </DashboardLayout>
    )
}

export default CreatePenimbangan