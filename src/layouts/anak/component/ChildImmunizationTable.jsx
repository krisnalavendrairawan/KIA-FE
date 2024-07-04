import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
/* eslint-disable react/prop-types */
const ChildImmunizationTable = ({ dataImunisasi }) => {
    return (
        <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
                <TableBody sx={{ width: '100%' }}>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', padding: '8px' }}>No</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', padding: '8px' }}>Tanggal Imunisasi</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', padding: '8px' }}>Jenis Imunisasi</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', padding: '8px' }}>Usia</TableCell>
                    </TableRow>
                    {dataImunisasi ? (
                        dataImunisasi.map((data, index) => (
                            <TableRow key={index}>
                                <TableCell sx={{ textAlign: 'center', padding: '8px' }}>{index + 1}</TableCell>
                                <TableCell sx={{ textAlign: 'center', padding: '8px' }}>{format(new Date(data.tgl_imunisasi), 'dd MMMM yyyy', { locale: id })}</TableCell>
                                <TableCell sx={{ textAlign: 'center', padding: '8px' }}>{data.jenis_imunisasi}</TableCell>
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

export default ChildImmunizationTable;
