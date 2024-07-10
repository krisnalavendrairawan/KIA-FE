import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { FormControl, InputLabel, MenuItem, Select, Button, Grid, TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import axios from 'axios';
import { useForm, Controller } from "react-hook-form";
import Swal from 'sweetalert2';

const url = "http://127.0.0.1:8000/api";

/* eslint-disable react/prop-types */
const CreateJadwalModal = ({ open, handleClose, onSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [availableRWs, setAvailableRWs] = useState([]);
    const [error, setError] = useState(null);
    const { register, control, handleSubmit, reset } = useForm();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${url}/getJadwal`);
                const existingRWs = response.data.jadwal.map(data => String(data.rw).padStart(2, '0'));
                const allRWs = [...Array(12)].map((_, index) => String(index + 1).padStart(2, '0'));
                const availableRWs = allRWs.filter(rw => !existingRWs.includes(rw));
                setAvailableRWs(availableRWs);
            } catch (error) {
                console.log(error);
            }
        };
        if (open) {
            fetchData();
        }
    }, [open]);

    const onSubmit = async (data) => {
        const payload = {
            tgl_kegiatan: dayjs(data.tgl_kegiatan).format('YYYY-MM-DD'),
            rw: data.rw,
            tempat: data.tempat,
            keterangan: data.keterangan
        };
        setLoading(true);
        try {
            const response = await axios.post(`${url}/createJadwal`, payload);
            Swal.fire({
                icon: 'success',
                title: 'Berhasil',
                text: 'Data berhasil disimpan',
            });
            handleClose();
            reset();
            setError(null);
            if (onSuccess) {
                onSuccess({
                    id: response.data.id_jadwal, // Assuming the response includes the new schedule's ID
                    tgl_kegiatan: dayjs(data.tgl_kegiatan).format('DD MMMM YYYY'),
                    rw: data.rw,
                    tempat: data.tempat,
                    keterangan: data.keterangan
                });
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Gagal',
                text: 'Gagal menyimpan data',
            });
            setError("Gagal menyimpan data");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} maxWidth="md">
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                Tambah Jadwal Kegiatan
            </DialogTitle>
            <DialogContent dividers>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <Controller
                                    name="tgl_kegiatan"
                                    control={control}
                                    defaultValue={dayjs()}
                                    render={({ field }) => (
                                        <DatePicker
                                            label="Tanggal Kegiatan"
                                            value={field.value}
                                            onChange={(newValue) => {
                                                field.onChange(newValue);
                                            }}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    )}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="rw-label">RW</InputLabel>
                                <Controller
                                    name="rw"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <Select
                                            labelId="rw-label"
                                            label="RW"
                                            sx={{ height: '40px' }}
                                            {...field}
                                        >
                                            {availableRWs.map(rw => (
                                                <MenuItem key={rw} value={rw}>
                                                    RW {rw}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    )}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Tempat"
                                multiline
                                rows={4}
                                {...register("tempat")}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Keterangan"
                                multiline
                                rows={4}
                                {...register("keterangan")}
                            />
                        </Grid>
                    </Grid>
                </form>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleClose}>
                    Batal
                </Button>
                <Button autoFocus onClick={handleSubmit(onSubmit)} disabled={loading}>
                    Simpan
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default CreateJadwalModal;

