import React from 'react';
import { Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import VaccinesIcon from '@mui/icons-material/Vaccines';

import { format } from 'date-fns';
import { id } from 'date-fns/locale';
// eslint-disable-next-line react/prop-types
const ChildInfoTable2 = ({ datas, nik }) => {
    console.log(nik);
    if (!datas) {
        return (
            <Typography variant="body1" style={{ marginTop: '10px' }}>
                Loading...
            </Typography>
        );
    }

    return (
        <div>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell><strong>Tanggal Lahir</strong></TableCell>
                        {/* eslint-disable-next-line react/prop-types */}
                        <TableCell>{format(new Date(datas.tanggal_lahir), 'dd MMMM yyyy', { locale: id })}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><strong>Anak Ke-</strong></TableCell>
                        {/* eslint-disable-next-line react/prop-types */}
                        <TableCell>{datas.anak_ke}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><strong>Berat Badan Lahir</strong></TableCell>
                        {/* eslint-disable-next-line react/prop-types */}
                        <TableCell>{datas.bb_lahir} kg</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><strong>Panjang Badan Lahir</strong></TableCell>
                        {/* eslint-disable-next-line react/prop-types */}
                        <TableCell>{datas.pb_lahir} cm</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><strong>Umur</strong></TableCell>
                        {/* eslint-disable-next-line react/prop-types */}
                        <TableCell>{datas.umur} Bulan</TableCell>
                    </TableRow>

                </TableBody>

            </Table>
            {/* buat tombol grafik anak */}
            
        </div>

    );
};

export default ChildInfoTable2;
