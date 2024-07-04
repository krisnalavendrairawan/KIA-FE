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
const EditMedicalModal = ({ open, handleClose, selectedId }) => {
    const [dataAnak, setDataAnak] = useState(null);
    const [nikAnak, setNikAnak] = useState(null);
    const [loading, setLoading] = useState(true);
    const [medicalSelected, setMedicalSelected] = useState(null);
    const [error, setError] = useState(null);
    const { register, control, handleSubmit, reset } = useForm();

    useEffect(() => {
        const fetchData = async () => {
            if(selectedId){
                setLoading(true);
                console.log("Selected ID: ", selectedId);
                try{
                    const response = await axios.get(`http://127.0.0.1:8000/api/getMedicalById/${selectedId}`);
                    const data = response.data.riwayatPenyakit[0];
                    console.log(data);
                    setDataAnak(data);
                    setNikAnak(data.nik_anak);
                    setMedicalSelected(data);
                    // console.log(medicalData)
                    reset({
                        tgl_rujukan: dayjs(data.tgl_rujukan),
                        jenis_penyakit: data.jenis_penyakit,
                        rujukan : data.rujukan,
                        saran: data.saran
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
            setMedicalSelected(null);
            reset();
        }} , [open]);
    
    const onSubmit = async (data) => {
        const id_user = localStorage.getItem('id_user');
        // console.log(id_user);
        // console.log(data);
        try{
            const newData = {
                tgl_rujukan: dayjs(data.tgl_rujukan).format('YYYY-MM-DD'),
                nik_anak: nikAnak,
                jenis_penyakit: data.jenis_penyakit,
                rujukan: data.rujukan,
                saran: data.saran,
                id_kader: id_user
            }
            console.log(newData);

            const result = await axios.put(`http://localhost:8000/api/updateMedical/${selectedId}`, newData);
            alert('Data berhasil di update');
            handleClose(); // Close the modal after successful update
        }catch(error){
            console.log(error);
        }
    }

    return (
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} maxWidth="md" >
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Edit Riwayat Penyakit Anak
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
                                name="tgl_rujukan"
                                control={control}
                                defaultValue={dayjs(dataAnak?.tgl_rujukan)}
                                render={({ field }) => (
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['DatePicker']}>
                                            <DatePicker fullWidth label="Tanggal Rujukan" {...field} />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                )}
                            />

                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    name="jenis_penyakit"
                                    control={control}
                                    defaultValue={dataAnak?.jenis_penyakit}
                                    render={({ field }) => <TextField fullWidth {...field} label="Jenis Penyakit" variant="outlined" />}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    name="rujukan"
                                    control={control}
                                    defaultValue={dataAnak?.rujukan}
                                    render={({ field }) => <TextField fullWidth {...field} label="Tempat Rujukan" variant="outlined" />}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    name="saran"
                                    control={control}
                                    defaultValue={dataAnak?.saran}
                                    render={({ field }) => <TextField fullWidth {...field} label="Saran" variant="outlined" />}
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
}


export default EditMedicalModal;