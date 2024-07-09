import * as React from 'react';
import PropTypes from 'prop-types';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import { Alert } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

import { format } from 'date-fns';
import { id as idLocale } from 'date-fns/locale';

/* eslint-disable react/prop-types */
function Info({ data }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data) {
      setLoading(false);
    }
  }, [data]);

  const listItems = data ? [
    { label: 'NIK', value: data.nik },
    { label: 'Umur', value: `${data.umur} Bulan` },
    { label: 'Tanggal Lahir', value: data.tanggal_lahir ? format(new Date(data.tanggal_lahir), 'dd MMMM yyyy', { locale: idLocale }) : 'N/A' },
    { label: 'Jenis Kelamin', value: data.jenis_kelamin },
    { label: 'Berat Badan Lahir', value: `${data.bb_lahir} Kg` },
    { label: 'Panjang Badan Lahir', value: `${data.pb_lahir} cm` },
    { label: 'Nama Ibu', value: data.nama_ibu },
    { label: 'Nama Ayah', value: data.nama_ayah },
    { label: 'Nomor HP Orang Tua', value: data.no_hp_ortu },
    { label: 'Alamat', value: `${data.alamat} RT ${data.rt} / RW ${data.rw}` }
  ] : [];

  return (
    <React.Fragment>
      <Alert variant="filled" sx={{ marginBottom: '20px' }} icon={<InfoIcon fontSize="inherit" />} severity="info">
        Identitas Anak
      </Alert>
      <Typography variant="h4" gutterBottom>
        {loading ? 'Loading...' : data.nama_anak}
      </Typography>
      <List disablePadding>
        {listItems.map((item, index) => (
          <ListItem key={index} sx={{ py: 0.5, px: 0 }}>
            <ListItemText
              sx={{ mr: 2 }}
              primary={`${item.label}: `}
            />
            <Typography variant="body1" fontWeight="medium">
              {item.value}
            </Typography>
          </ListItem>
        ))}
      </List>
    </React.Fragment>
  );
}

Info.propTypes = {
  data: PropTypes.shape({
    nama_anak: PropTypes.string,
    nik: PropTypes.number,
    umur: PropTypes.number,
    tanggal_lahir: PropTypes.string,
    jenis_kelamin: PropTypes.string,
    bb_lahir: PropTypes.string,
    pb_lahir: PropTypes.number,
    nama_ibu: PropTypes.string,
    nama_ayah: PropTypes.string,
    no_hp_ortu: PropTypes.string,
  }).isRequired,
};

export default Info;
