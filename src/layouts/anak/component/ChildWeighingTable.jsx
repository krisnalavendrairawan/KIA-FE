import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
/* eslint-disable react/prop-types */
const ChildWeighingTable = ({ dataPenimbangan }) => {
    return (
        <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
                <TableBody sx={{ width: '100%' }}>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', padding: '8px' }}>No</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', padding: '8px' }}>Tanggal Penimbangan</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', padding: '8px' }}>Berat Badan</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', padding: '8px' }}>Tinggi Badan</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', padding: '8px' }}>Status Gizi</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', padding: '8px' }}>Keterangan</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', padding: '8px' }}>Saran</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', padding: '8px' }}>Usia</TableCell>
                    </TableRow>
                    {dataPenimbangan ? (
                        dataPenimbangan.map((data, index) => (
                            <TableRow key={index}>
                                <TableCell sx={{ textAlign: 'center', padding: '8px' }}>{index + 1}</TableCell>
                                <TableCell sx={{ textAlign: 'center', padding: '8px' }}>{format(new Date(data.tgl_penimbangan), 'dd MMMM yyyy', { locale: id })}</TableCell>
                                <TableCell sx={{ textAlign: 'center', padding: '8px' }}>{data.berat_badan} kg</TableCell>
                                <TableCell sx={{ textAlign: 'center', padding: '8px' }}>{data.tinggi_badan} cm</TableCell>
                                <TableCell sx={{ textAlign: 'center', padding: '8px' }}>{data.status_gizi}</TableCell>
                                <TableCell sx={{ textAlign: 'center', padding: '8px' }}>{data.keterangan}</TableCell>
                                <TableCell sx={{ textAlign: 'center', padding: '8px' }}>{data.saran}</TableCell>
                                <TableCell sx={{ textAlign: 'center', padding: '8px' }}>{data.usia} Bulan</TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={3} sx={{ textAlign: 'center', padding: '8px' }}>
                                Loading...
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default ChildWeighingTable;
