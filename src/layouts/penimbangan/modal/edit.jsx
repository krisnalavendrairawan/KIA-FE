import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

import axios from 'axios';
import { useForm, Controller } from "react-hook-form"
import InputAdornment from '@mui/material/InputAdornment';

import calculateWeightGain from '../data/calculateWeightGain';
import giziCalculation from '../data/giziCalculation';

// eslint-disable-next-line react/prop-types
const EditPenimbangan = ({ open, handleClose, selectedId }) => {
    const [dataAnak, setDataAnak] = useState(null);
    const [loading, setLoading] = useState(true);
    const [nikAnak, setNikAnak] = useState(null);
    const [isUsiaEnabled, setIsUsiaEnabled] = useState(false);
    const [previousWeight, setPreviousWeight] = useState(null);
    const [previousMonth, setPreviousMonth] = useState(null);
    const [jenisKelamin, setJenisKelamin] = useState(null);

    const { control, handleSubmit, reset, watch, setValue } = useForm();

    useEffect(() => {
        const fetchData = async () => {
            if (selectedId) {
                setLoading(true);
                try {
                    const response = await axios.get(`http://127.0.0.1:8000/api/getPenimbanganById/${selectedId}`);
                    setDataAnak(response.data.penimbangan);
                    setNikAnak(response.data.penimbangan.nik_anak);
                    setPreviousMonth(response.data.penimbangan.usia);
                    axios.get(`http://127.0.0.1:8000/api/getPenimbanganByNik/${response.data.penimbangan.nik_anak}`)
                        .then((response) => {
                            const data = response.data.penimbangan;
                            data.sort((a, b) => new Date(b.tgl_penimbangan) - new Date(a.tgl_penimbangan));
                            const currentIndex = data.findIndex(item => item.id_penimbangan === selectedId);
                            const previousWeightIndex = currentIndex + 1;
                            if (data[previousWeightIndex]) {
                                const previousWeight = data[previousWeightIndex].berat_badan;
                                setPreviousWeight(previousWeight);
                            } else {
                                console.log('Data for the previous month is not available.');
                                setPreviousWeight(0);
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                } catch (error) {
                    console.error(error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchData();
    }, [selectedId, open]);

    useEffect(() => {
        if (!open) {
            setDataAnak(null);
        }
    }, [open]);

    useEffect(() => {
        if (dataAnak) {
            setJenisKelamin(dataAnak.anak.jenis_kelamin);
            reset({
                tgl_penimbangan: dayjs(dataAnak.tgl_penimbangan),
                berat_badan: dataAnak.berat_badan,
                tinggi_badan: dataAnak.tinggi_badan,
                keterangan: dataAnak.keterangan,
                usia: dataAnak.usia,
                jenis_kelamin: dataAnak.anak.jenis_kelamin,
            });
        }
    }, [dataAnak, reset]);

    const onSubmit = async (data) => {
        const id_kader = localStorage.getItem('id_user');
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/getPenimbanganByNik/${nikAnak}`);
            const bulan_ke = response.data.penimbangan.bulan_ke;          
            const formData = {
                nik_anak: nikAnak,
                id_kader: id_kader,
                tgl_penimbangan: dayjs(data.tgl_penimbangan).format('YYYY-MM-DD'),
                bulan_ke: dataAnak.bulan_ke, // Set the bulan_ke from the length of penimbangan data
                usia: data.usia,
                berat_badan: data.berat_badan,
                tinggi_badan: data.tinggi_badan,
                keterangan: data.keterangan,
                status_gizi: data.status_gizi,
                saran: data.saran
            };
            
            const result = await axios.put(`http://localhost:8000/api/updatePenimbangan/${selectedId}`, formData);
            
            alert('Data berhasil di update');
            handleClose(); // Close the modal after successful update
        } catch (error) {
            console.error('Error fetching or adding data:', error);
        }
    };

    const handleCalculateWeightGain = () => {
        const currentWeight = watch('berat_badan');
        const result = calculateWeightGain(previousWeight, previousMonth, currentWeight);
        setValue("keterangan", result);
    };

    const handleCalculateGizi = () => {
        const currentWeight = watch('berat_badan');
        let usia = watch('usia');
        usia = parseInt(usia);
        const result = giziCalculation(usia, currentWeight, jenisKelamin);
        setValue("status_gizi", result);
    };

    return (
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} maxWidth="md" >
            <form onSubmit={handleSubmit(onSubmit)}>
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                Edit Penimbangan
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                {loading ? (
                    <Typography>Loading...</Typography>
                ) : (
                    
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2, // Menambahkan jarak vertikal antara field
                            }}
                        >
                            <Controller
                                name="tgl_penimbangan"
                                control={control}
                                defaultValue={dayjs(dataAnak.tgl_penimbangan)}
                                render={({ field }) => (
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['DatePicker']}>
                                            <DatePicker fullWidth label="Tanggal Penimbangan" {...field} />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                )}
                            />

                                <Controller
                                    name="usia"
                                    control={control}
                                    defaultValue={dataAnak.usia}
                                    render={({ field }) => <TextField fullWidth {...field} label="Usia" variant="outlined" type='number' InputProps={{
                                        startAdornment: <InputAdornment position="start">bulan</InputAdornment>,
                                    }} />}
                                />

                            
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Controller
                                name="berat_badan"
                                control={control}
                                defaultValue={dataAnak.berat_badan}
                                render={({ field }) => (
                                    <TextField
                                        fullWidth
                                        {...field}
                                        label="Berat Badan"
                                        variant="outlined"
                                        type="number"
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">kg</InputAdornment>,
                                        }}
                                    />
                                )}
                            />
                            </Box>

                            <Controller
                                name="tinggi_badan"
                                control={control}
                                defaultValue={dataAnak.tinggi_badan}
                                render={({ field }) => (
                                    <TextField
                                        fullWidth
                                        {...field}
                                        label="Tinggi Badan"
                                        variant="outlined"
                                        type="number"
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">cm</InputAdornment>,
                                        }}
                                    />
                                )}
                            />

                            <Grid
                            container
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="center"
                            gap={2}
                            >                           
                            <Grid item xs={8} md={6}>
                            <Controller
                                name="keterangan"
                                control={control}
                                defaultValue={dataAnak.keterangan}
                                render={({ field }) => <TextField fullWidth {...field} label="Keterangan" variant="outlined" disabled />}
                            />
                            </Grid>
                            <Grid item xs={8} md={4}>
                            <Button variant="contained" color="success" id="btn-hitung-gizi"  onClick={handleCalculateWeightGain}>
                                Hitung Kenaikan
                            </Button>
                            </Grid>
                            </Grid>
                            
                           
                            <Grid
                            container
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="center"
                            gap={2}
                            >
                             <Grid item xs={8} md={6}>
                            
                            <Controller
                                name="status_gizi"
                                control={control}
                                defaultValue={dataAnak.status_gizi}
                                render={({ field }) => <TextField fullWidth disabled {...field} label="Status Gizi" variant="outlined" />}
                                
                            />
                            </Grid>  
                            <Grid item xs={8} md={4}>
                               
                                <Button variant="contained" color="success" id="btn-hitung-gizi" onClick={handleCalculateGizi}>
                                    Hitung Status Gizi
                                </Button>
                            </Grid> 
                            </Grid>
                            <Controller
                                name="saran"
                                control={control}
                                defaultValue={dataAnak.saran}
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
                    
                )}
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleClose} type="submit">
                    Simpan
                </Button>
            </DialogActions>
            </form>
        </Dialog>
    );
};

export default EditPenimbangan;
