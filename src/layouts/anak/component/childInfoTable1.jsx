import React from 'react';
import { Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';
/* eslint-disable react/prop-types */
const ChildInfoTable1 = ({ datas }) => {
    if (!datas) {
        return (
            <Typography variant="body1" style={{ marginTop: '10px' }}>
                Loading...
            </Typography>
        );
    }

    return (
        <Table>
            <TableBody>
                <TableRow>
                    <TableCell><strong>Nama</strong></TableCell>
                    <TableCell>{datas.nama_anak}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell><strong>NIK Anak</strong></TableCell>
                    <TableCell>{datas.nik}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell><strong>NO KK</strong></TableCell>
                    <TableCell>{datas.no_kk}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell><strong>Jenis Kelamin</strong></TableCell>
                    <TableCell>{datas.jenis_kelamin}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell><strong>Nama Ibu</strong></TableCell>
                    <TableCell>{datas.nama_ibu}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell><strong>Nama Ayah</strong></TableCell>
                    <TableCell>{datas.nama_ayah}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell><strong>Alamat</strong></TableCell>
                    <TableCell>Dsn {datas.alamat}, RT {datas.rt}/RW {datas.rw}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
};

export default ChildInfoTable1;
