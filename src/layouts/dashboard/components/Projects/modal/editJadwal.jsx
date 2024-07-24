import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Grid, TextField, Button, CircularProgress } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import axios from 'axios';
import { useForm, Controller } from "react-hook-form";
import Swal from 'sweetalert2';

const url = "http://127.0.0.1:8000/api";

/* eslint-disable react/prop-types */
const EditJadwal = ({ open, handleClose, onSuccess, selectedId }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { register, control, handleSubmit, reset } = useForm();
    const [rw, setRW] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (selectedId) {
                try {
                    const response = await axios.get(`${url}/getJadwalById/${selectedId}`);
                    const data = response.data.jadwal;
                    setRW(data.rw);
                    reset({
                        tgl_kegiatan: dayjs(data.tgl_kegiatan),
                        tempat: data.tempat,
                        keterangan: data.keterangan
                    });
                } catch (error) {
                    console.error(error);
                    setError("Failed to fetch data");
                }
            }
        };
        if (open) {
            fetchData();
        }
    }, [open, selectedId, reset]);

    const onSubmit = async (data) => {
        const payload = {
            tgl_kegiatan: dayjs(data.tgl_kegiatan).format('YYYY-MM-DD'),
            rw: rw,
            tempat: data.tempat,
            keterangan: data.keterangan
        };
        setLoading(true);
        try {
            const response = await axios.put(`${url}/updateJadwal/${selectedId}`, payload);
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Data successfully saved',
            });
            handleClose();
            reset();
            setError(null);
            if (onSuccess) {
                onSuccess({
                    id: selectedId,
                    ...payload
                });
            }
        } catch (error) {
            console.error(error);
            setError("Failed to save data");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit Schedule RW {rw}</DialogTitle>
            <DialogContent>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Controller
                                    name="tgl_kegiatan"

                                    control={control}
                                    defaultValue={dayjs()}
                                    render={({ field }) => (
                                        <DatePicker
                                            sx={{ marginTop: 2 }}
                                            {...field}
                                            label="Tanggal Kegiatan Posyandu"
                                            renderInput={(params) => <TextField {...params} fullWidth />}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Tempat"
                                    {...register("tempat")}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Keterangan Tambahan"
                                    {...register("keterangan")}
                                />
                            </Grid>
                        </Grid>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                    </form>
                </LocalizationProvider>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} disabled={loading}>Cancel</Button>
                <Button onClick={handleSubmit(onSubmit)} disabled={loading}>
                    {loading ? <CircularProgress size={24} /> : "Save"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditJadwal;
