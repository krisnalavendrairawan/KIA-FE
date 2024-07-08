import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/system';
import PageLayout from 'examples/LayoutContainers/PageLayout';
import Button from '@mui/material/Button';
import { Visibility } from '@mui/icons-material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import porsiMakanIbu from 'assets/images/porsiMakanIbu.png';
import cuciTangan from 'assets/images/cuciTangan.png';
import mpasi from 'assets/images/mpasi.png';
import perawatanAnakSakit from 'assets/images/perawatanAnakSakit.png';
import ibuNifas from 'assets/images/ibuNifas.png';
import keselamatanLingkungan from 'assets/images/keselamatanLingkungan.png';
import kesehatanLingkungan from 'assets/images/kesehatanLingkungan.png';
import perlindunganAnak from 'assets/images/perlindunganAnak.png';
import anakDenganDisabilitas from 'assets/images/anakDenganDisabilitas.png';

const Info = [
    {
        avatar: <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />,
        name: 'Porsi Makan Ibu Menyusui',
        button: 'Lihat',
        occupation: 'Informasi Gizi',
        penjelasan:
            "Porsi makan ibu menyusui sangat penting untuk memastikan kebutuhan gizi ibu dan bayi terpenuhi. Konsumsi makanan yang seimbang dan bergizi membantu meningkatkan kualitas ASI.",
        image: porsiMakanIbu,
    },
    {
        avatar: <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />,
        name: 'Cuci Tangan',
        occupation: 'Kebersihan Diri',
        penjelasan:
            "Cuci tangan yang benar sangat penting untuk mencegah penyebaran penyakit. Pastikan untuk mencuci tangan dengan sabun dan air mengalir setidaknya selama 20 detik, terutama sebelum makan dan setelah dari toilet.",
        image: cuciTangan,
    },
    {
        avatar: <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />,
        name: 'MPASI',
        occupation: 'Nutrisi Anak',
        penjelasan:
            'MPASI (Makanan Pendamping ASI) sangat penting dalam tahap tumbuh kembang anak. Pastikan MPASI yang diberikan kaya akan nutrisi, sesuai dengan umur dan kebutuhan anak, serta disajikan dalam bentuk yang mudah dicerna.',
        image: mpasi,
    },
    {
        avatar: <Avatar alt="Remy Sharp" src="/static/images/avatar/4.jpg" />,
        name: 'Perawatan Anak Sakit',
        occupation: 'Kesehatan Anak',
        penjelasan:
            'Perawatan anak yang sedang sakit memerlukan perhatian khusus, termasuk pemantauan gejala, pemberian obat yang tepat, dan menjaga nutrisi serta hidrasi. Konsultasikan dengan tenaga medis jika diperlukan.',
        image: perawatanAnakSakit,
    },

    {
        avatar: <Avatar alt="Travis Howard" src="/static/images/avatar/5.jpg" />,
        name: 'Ibu Nifas',
        occupation: 'Kesehatan Ibu',
        penjelasan:
            'Ibu nifas adalah periode setelah melahirkan di mana tubuh ibu mengalami pemulihan. Penting untuk menjaga kebersihan, memantau tanda-tanda infeksi, dan mendapatkan dukungan emosional serta fisik selama periode ini.',
        image: ibuNifas,
    },

    {
        avatar: <Avatar alt="Cindy Baker" src="/static/images/avatar/6.jpg" />,
        name: 'Keselamatan Lingkungan',
        occupation: 'Keselamatan dan Kesehatan',
        penjelasan:
            'Keselamatan lingkungan sangat penting untuk mencegah kecelakaan dan cedera. Pastikan untuk selalu menjaga kebersihan, mengelola limbah dengan benar, dan menciptakan lingkungan yang aman dan sehat bagi anak-anak.',
        image: keselamatanLingkungan,
    },

    {
        avatar: <Avatar alt="Cindy Baker" src="/static/images/avatar/6.jpg" />,
        name: 'Kesehatan Lingkungan',
        occupation: 'Ahli Kesehatan Lingkungan',
        penjelasan:
            'Menjaga kesehatan lingkungan adalah kunci untuk mencegah penyakit dan menciptakan lingkungan yang sehat bagi semua orang. Pastikan untuk selalu menjaga kebersihan dan mendukung inisiatif ramah lingkungan.',
        image: kesehatanLingkungan,
    },

    {
        avatar: <Avatar alt="Cindy Baker" src="/static/images/avatar/6.jpg" />,
        name: 'Perlindungan Anak',
        occupation: 'Pakar Perlindungan Anak',
        penjelasan:
            'Perlindungan anak sangat penting untuk memastikan keselamatan dan kesejahteraan mereka. Pastikan untuk memberikan lingkungan yang aman dan mendukung perkembangan mereka dengan baik.',
        image: perlindunganAnak,
    },

    {
        avatar: <Avatar alt="Cindy Baker" src="/static/images/avatar/6.jpg" />,
        name: 'Anak dengan Disabilitas',
        occupation: 'Pakar Kesehatan Anak',
        penjelasan:
            'Anak dengan disabilitas memerlukan perhatian khusus dan dukungan yang tepat untuk memastikan mereka dapat tumbuh dan berkembang dengan baik. Pahami kebutuhan mereka dan berikan lingkungan yang inklusif.',
        image: anakDenganDisabilitas,
    },

];

const whiteLogos = [
    'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560628e8573c43893fe0ace_Sydney-white.svg',
    'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f4d520d0517ae8e8ddf13_Bern-white.svg',
    'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f46794c159024c1af6d44_Montreal-white.svg',
    'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e891fa22f89efd7477a_TerraLight.svg',
    'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560a09d1f6337b1dfed14ab_colorado-white.svg',
    'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f5caa77bf7d69fb78792e_Ankara-white.svg',
];

const darkLogos = [
    'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560628889c3bdf1129952dc_Sydney-black.svg',
    'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f4d4d8b829a89976a419c_Bern-black.svg',
    'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f467502f091ccb929529d_Montreal-black.svg',
    'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e911fa22f2203d7514c_TerraDark.svg',
    'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560a0990f3717787fd49245_colorado-black.svg',
    'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f5ca4e548b0deb1041c33_Ankara-black.svg',
];

const logoStyle = {
    width: '64px',
    opacity: 0.3,
};

export default function Testimonials() {
    const theme = useTheme();
    const logos = theme.palette.mode === 'light' ? darkLogos : whiteLogos;

    const [open, setOpen] = React.useState(false);
    const [selectedImage, setSelectedImage] = React.useState(null);

    const handleClickOpen = (image) => {
        setSelectedImage(image);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <PageLayout>
            <Container
                id="testimonials"
                sx={{
                    pt: { xs: 4, sm: 12 },
                    pb: { xs: 8, sm: 16 },
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: { xs: 3, sm: 6 },
                }}
            >
                <Box
                    sx={{
                        width: { sm: '100%', md: '60%' },
                        textAlign: { sm: 'left', md: 'center' },
                    }}
                >
                    <Typography component="h2" variant="h4" color="text.primary">
                        Informasi Seputar Kesehatan
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Berikut adalah beberapa informasi seputar kesehatan ibu dan anak yang dapat membantu Anda memahami pentingnya menjaga kesehatan selama masa kehamilan dan pertumbuhan anak. Informasi ini mencakup berbagai aspek seperti nutrisi, aktivitas fisik, kesehatan mental, dan tips sehari-hari untuk memastikan kesehatan optimal bagi ibu dan anak.
                    </Typography>
                </Box>
                <Grid container spacing={2}>
                    {Info.map((item, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: 'flex' }}>
                            <Card
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    flexGrow: 1,
                                    p: 1,
                                }}
                            >
                                <CardContent>
                                    <Typography variant="body2" color="text.secondary">
                                        {item.penjelasan}
                                    </Typography>
                                </CardContent>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        pr: 2,
                                    }}
                                >
                                    <CardHeader
                                        title={item.name}
                                        subheader={item.occupation}
                                    />
                                    <CardContent sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <Button startIcon={<Visibility />} color="primary" onClick={() => handleClickOpen(item.image)}>
                                            Lihat
                                        </Button>
                                    </CardContent>
                                </Box>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {/* Dialog for showing the image */}
                <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                    <DialogTitle>
                        Informasi Seputar Kesehatan
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
                        <Box
                            component="img"
                            src={selectedImage}
                            alt="Gambar"
                            sx={{ width: '100%', height: 'auto' }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Tutup
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </PageLayout>
    );
}
