import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/system';
import Alert from '@mui/material/Alert';
import InfoIcon from '@mui/icons-material/Info';
import axios from 'axios';
import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { Visibility } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { format } from 'date-fns';
import { id as idLocale } from 'date-fns/locale';
import { PDFViewer } from '@react-pdf/renderer';
import Modal from '@mui/material/Modal';
import PDFAllData from '../document/pdfAllData';
import './style.css';


const url = 'http://127.0.0.1:8000/api';

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

const VISIBLE_FIELDS_PENIMBANGAN = [
  'tgl_penimbangan',
  // 'nama_anak',
  'berat_badan',
  'tinggi_badan',
  'usia',
  'status_gizi',
  'keterangan',
];

const VISIBLE_FIELDS_IMUNISASI = [
  'tgl_imunisasi',
  'jenis_imunisasi',
  'usia',
];

export default function AddressForm() {
  const navigate = useNavigate();
  const { nik } = useParams();
  const [data, setData] = useState(null);
  const [dataPenimbangan, setDataPenimbangan] = useState([]);
  const [dataImunisasi, setDataImunisasi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPdfViewer, setShowPdfViewer] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}/getAnak/${nik}`);
        setData(response.data.anak);
        //jika status gizi dalam data penimbangan bernilai '-' maka jangan ditampilkan
        const dataPenimbanganWithIds = response.data.anak.penimbangan.map((row, index) => ({
          ...row,
          id: row.id_penimbangan,
          nama_anak: row.anak ? row.anak.nama_anak : '',
          berat_badan: row.berat_badan ? row.berat_badan + " kg" : '',
          tinggi_badan: row.tinggi_badan ? row.tinggi_badan + " cm" : '',
          tgl_penimbangan: row.tgl_penimbangan ? format(new Date(row.tgl_penimbangan), 'dd MMMM yyyy', { locale: idLocale }) : '',
          usia: row.usia ? row.usia + ' bulan' : '',
        }))
        const filteredData = dataPenimbanganWithIds.filter(data => data.status_gizi !== '-');
        setDataPenimbangan(filteredData);

        const dataImunisasiWithIds = response.data.anak.imunisasi.map((row, index) => ({
          ...row,
          id: row.id_imunisasi,
          nama_anak: row.anak ? row.anak.nama_anak : '',
          nama_imunisasi: row.imunisasi ? row.imunisasi.nama_imunisasi : '',
          tgl_imunisasi: row.tgl_imunisasi ? format(new Date(row.tgl_imunisasi), 'dd MMMM yyyy', { locale: idLocale }) : '',
          usia: row.usia ? row.usia + ' bulan' : '',
        }))
        setDataImunisasi(dataImunisasiWithIds);


        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [nik]);

  const handleViewPenimbangan = (id) => {
    console.log("View action for row id:", id);
    navigate(`/penimbangan/${id}`);
  };
  const handleViewImunisasi = (id) => {
    console.log("View action for row id:", id);
    navigate(`/imunisasi/${id}`);
  };
  const handleOpenPdfViewer = () => {
    setShowPdfViewer(true);
  };

  const handleClosePdfViewer = () => {
    setShowPdfViewer(false);
  };

  const columnPenimbangan = useMemo(
    () => [
      ...VISIBLE_FIELDS_PENIMBANGAN.map((field) => ({
        field,
        headerName: field.replace('_', ' ').toUpperCase(),
        flex: 1,
        minWidth: 150
      })),
      {
        field: 'actions',
        headerName: '',
        flex: 0.5,
        minWidth: 150,
        renderCell: (params) => (
          <Button onClick={() => handleViewPenimbangan(params.row.id_penimbangan)} startIcon={<Visibility />} color="primary">
            Lihat
          </Button>
        )
      }
    ], []
  );
  const columnImunisasi = useMemo(
    () => [
      ...VISIBLE_FIELDS_IMUNISASI.map((field) => ({
        field,
        headerName: field.replace('_', ' ').toUpperCase(),
        flex: 1,
        minWidth: 150
      })),
      {
        field: 'actions',
        headerName: '',
        flex: 0.5,
        minWidth: 150,
        renderCell: (params) => (
          <Button onClick={() => handleViewImunisasi(params.row.id_imunisasi)} startIcon={<Visibility />} color="primary">
            Lihat
          </Button>
        )
      }
    ], []
  );

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Button variant="contained" href={`/anak/grafik/${nik}`} id="grafik-button" sx={{ marginTop: '1rem', marginRight: '1rem' }}><BarChartIcon sx={{ marginRight: 1 }} /> Lihat Grafik Anak</Button>
        <Button variant="contained" onClick={handleOpenPdfViewer} id="download-button" sx={{ marginTop: '1rem', marginRight: '1rem' }}><FileDownloadIcon sx={{ marginRight: 1 }} /> Download PDF</Button>
      </Grid>
      <Grid item xs={12}>
        <Alert sx={{ height: 'auto', width: '150%' }} variant="filled" icon={<InfoIcon fontSize="inherit" />} severity="info">
          Detail Penimbangan Anak
        </Alert>
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ height: 'auto', width: '150%' }}>
          <DataGrid
            rows={dataPenimbangan}
            columns={columnPenimbangan}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            components={{
              Toolbar: GridToolbar,
            }}
            loading={loading}
            getRowId={(row) => row.id_penimbangan} // Use id_penimbangan as the unique identifier
          />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Alert sx={{ height: 'auto', width: '150%' }} variant="filled" icon={<InfoIcon fontSize="inherit" />} severity="info">
          Detail Imunisasi Anak
        </Alert>
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ height: 'auto', width: '150%' }}>
          <DataGrid
            rows={dataImunisasi}
            columns={columnImunisasi}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            components={{
              Toolbar: GridToolbar,
            }}
            loading={loading}
            getRowId={(row) => row.id_imunisasi} // Use id_penimbangan as the unique identifier
          />
        </Box>
      </Grid>
      <Modal
        open={showPdfViewer}
        onClose={handleClosePdfViewer}
        aria-labelledby="pdf-viewer-modal"
        aria-describedby="pdf-viewer-description"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box sx={{ width: '80%', height: '90%' }}>
          <PDFViewer style={{ width: '100%', height: '100%' }}>
            <PDFAllData datas={data} dataPenimbangan={dataPenimbangan} dataImunisasi={dataImunisasi} />
          </PDFViewer>
        </Box>
      </Modal>
    </Grid>
  );
}
