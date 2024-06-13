import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import axios from 'axios';
import { useForm, Controller } from "react-hook-form";
import InputAdornment from '@mui/material/InputAdornment';

// eslint-disable-next-line react/prop-types
const EditImunisasiModal = ({ open, handleClose, selectedId }) => {
    const [dataAnak, setDataAnak] = useState(null);
    const [nikAnak, setNikAnak] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [jenisImunisasi, setJenisImunisasi] = useState('');
    const [selectedImunisasi, setSelectedImunisasi] = useState(null);
    const { register, control, handleSubmit, reset } = useForm();

    useEffect(() => {
        const fetchData = async () => {
            if(selectedId){
                setLoading(true);
                console.log("Selected ID: ", selectedId);
                try{
                    const response = await axios.get(`http://127.0.0.1:8000/api/getImunisasiById/${selectedId}`);
                    const data = response.data.imunisasi;
                    console.log(data);
                    setDataAnak(data);
                    setJenisImunisasi(data.jenis_imunisasi);
                    setNikAnak(data.nik_anak);
                    setSelectedImunisasi(data);
                    reset({
                        tgl_imunisasi: dayjs(data.tgl_imunisasi),
                        jenis_imunisasi: data.jenis_imunisasi,
                        usia: data.usia
                    });
                }
                catch(error){
                    console.log(error);
                    setError("Gagal mengambil data");
                }
                finally{
                    setLoading(false);
                }
            }
        }
        fetchData();
    }, [selectedId, open]);

    useEffect(() => {
        if(!open){
            setNikAnak(null);
            setSelectedImunisasi(null);
            reset();
        }} , [open]);
    
    const onSubmit = async (data) => {
        const id_user = localStorage.getItem('id_user');
        console.log(id_user);
        // console.log(data);
        try{
            const newData = {
                tgl_imunisasi: dayjs(data.tgl_imunisasi).format('YYYY-MM-DD'),
                nik_anak: nikAnak,
                jenis_imunisasi: data.jenis_imunisasi,
                usia: data.usia,
                id_kader: id_user
            }
            console.log(newData);

            const result = await axios.put(`http://localhost:8000/api/updateImunisasi/${selectedId}`, newData);
            alert('Data berhasil di update');
            handleClose(); // Close the modal after successful update
        }catch(error){
            console.log(error);
        }
    }

    const handleChange = (event) => {
        setJenisImunisasi(event.target.value);
    }
    return (
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} maxWidth="md" >
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Edit Imunisasi
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
                    ) : error ? (
                        <Typography>{error}</Typography>
                    ) : (
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="NIK Anak"
                                    value={nikAnak}
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={12}>
                            <Controller
                                name="tgl_imunisasi"
                                control={control}
                                defaultValue={dayjs(dataAnak?.tgl_imunisasi)}
                                render={({ field }) => (
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['DatePicker']}>
                                            <DatePicker fullWidth label="Tanggal Imunisasi" {...field} />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                )}
                            />

                            </Grid>
                            <Grid item xs={12}>
                                <FormControl variant="outlined" fullWidth>
                                    <InputLabel id="jenis_imunisasi">Jenis Imunisasi</InputLabel>
                                    <Controller
                                        name="jenis_imunisasi"
                                        control={control}
                                        defaultValue={dataAnak?.jenis_imunisasi} // Ganti dengan defaultValue
                                        render={({ field }) => <Select
                                            labelId="jenis_imunisasi"
                                            id="jenis_imunisasi"
                                            label="Jenis Imunisasi"
                                            sx={{ height: '40px'}}
                                            onChange={handleChange}
                                            {...field}
                                        >
                                            {/* Add immunization types according to regulations */}
                                            <MenuItem value={'BCG'}>BCG</MenuItem>
                                            <MenuItem value={'Polio 1'}>Polio 1</MenuItem>
                                            <MenuItem value={'Polio 2'}>Polio 2</MenuItem>
                                            <MenuItem value={'Polio 3'}>Polio 3</MenuItem>
                                            <MenuItem value={'Polio 4'}>Polio 4</MenuItem>
                                            <MenuItem value={'DPT-HB-Hib 1'}>DPT-HB-Hib 1</MenuItem>
                                            <MenuItem value={'DPT-HB-Hib 2'}>DPT-HB-Hib 2</MenuItem>
                                            <MenuItem value={'DPT-HB-Hib 3'}>DPT-HB-Hib 3</MenuItem>
                                            <MenuItem value={'Campak'}>Campak</MenuItem>
                                            <MenuItem value={'MR'}>MR</MenuItem>
                                            <MenuItem value={'JE'}>JE</MenuItem>
                                            <MenuItem value={'DPT'}>DPT</MenuItem>
                                            <MenuItem value={'Hepatitis B'}>Hepatitis B</MenuItem>
                                        </Select>}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    name="usia"
                                    control={control}
                                    defaultValue={dataAnak?.usia}
                                    render={({ field }) => <TextField fullWidth {...field} label="Usia" variant="outlined" type='number' InputProps={{
                                        startAdornment: <InputAdornment position="start">bulan</InputAdornment>,
                                    }} />}
                                />
                            </Grid>
                        </Grid>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button autoFocus color="secondary" onClick={handleClose}>
                        Batal
                    </Button>
                    <Button type="submit" color="primary">
                        Simpan
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
};

export default EditImunisasiModal;
