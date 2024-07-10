import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import DevicesRoundedIcon from '@mui/icons-material/DevicesRounded';
import EdgesensorHighRoundedIcon from '@mui/icons-material/EdgesensorHighRounded';
import ViewQuiltRoundedIcon from '@mui/icons-material/ViewQuiltRounded';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ChildCountChart from './features/ChildCountChart';

const url = "http://127.0.0.1:8000/api";

export default function Features() {
    const [selectedItemIndex, setSelectedItemIndex] = useState(0);
    const [data, setData] = useState([]);
    const [jadwal, setJadwal] = useState([]);
    const [page, setPage] = useState(1);
    const itemsPerPage = 3;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${url}/getAnak`);
                const responseJadwal = await axios.get(`${url}/getJadwal`);
                setData(response.data.anak);
                setJadwal(responseJadwal.data.jadwal);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const items = [
        {
            icon: <ViewQuiltRoundedIcon />,
            title: 'Jadwal Kegiatan Posyandu',
            description: 'Jadwal Kegiatan Posyandu di Posyandu Cibeusi.',
            imageLight: ``,
            imageDark: ``,
            schedule: jadwal,
            location: "Desa Cibeusi, Kecamatan Jatinangor, Kabupaten Sumedang"
        },
        {
            icon: <EdgesensorHighRoundedIcon />,
            title: 'Lokasi Posyandu',
            description: 'This item could provide information about the mobile app version of the product.',
            imageLight: ``,
            imageDark: ``,
        },
        {
            icon: <DevicesRoundedIcon />,
            title: 'Jumlah Anak yang Terdaftar',
            description: 'This item could let users know the product is available on all platforms, such as web, mobile, and desktop.',
            imageLight: '',
            imageDark: '',
        },
    ];

    const handleItemClick = (index) => {
        setSelectedItemIndex(index);
    };

    const handleDelete = () => {
        console.log("Deleted");
    };

    const handleChangePage = (event, value) => {
        setPage(value);
    };

    const selectedFeature = items[selectedItemIndex];
    const paginatedSchedule = selectedFeature.schedule ? selectedFeature.schedule.slice((page - 1) * itemsPerPage, page * itemsPerPage) : [];
    const totalPages = selectedFeature.schedule ? Math.ceil(selectedFeature.schedule.length / itemsPerPage) : 1;

    return (
        <Container id="features" sx={{ py: { xs: 8, sm: 16 } }}>
            <Grid container spacing={6}>
                <Grid item xs={12} md={6}>
                    <div>
                        <Typography component="h2" variant="h4" color="text.primary">
                            Informasi Seputar Posyandu
                        </Typography>
                        <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{ mb: { xs: 2, sm: 4 } }}
                        >
                            Posyandu Cibeusi merupakan posyandu yang berada di Desa Cibeusi, Kecamatan Jatinangor, Kabupaten Sumedang. Posyandu Cibeusi memiliki jadwal kegiatan yang rutin dilakukan setiap bulannya. Berikut adalah informasi seputar Posyandu Cibeusi.
                        </Typography>
                    </div>

                    <Box
                        component={Card}
                        variant="outlined"
                        sx={{
                            display: { xs: 'auto', sm: 'none' },
                            mt: 4,
                        }}
                    >
                        <Box sx={{ px: 2, pb: 2 }}>
                            <Typography color="text.primary" variant="body2" fontWeight="bold">
                                {selectedFeature.title}
                            </Typography>
                            <Typography color="text.secondary" variant="body2" sx={{ my: 0.5 }}>
                                {selectedFeature.description}
                            </Typography>
                            <Link
                                color="primary"
                                variant="body2"
                                fontWeight="bold"
                                sx={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    '& > svg': { transition: '0.2s' },
                                    '&:hover > svg': { transform: 'translateX(2px)' },
                                }}
                            >
                                <span>Learn more</span>
                                <ChevronRightRoundedIcon
                                    fontSize="small"
                                    sx={{ mt: '1px', ml: '2px' }}
                                />
                            </Link>
                        </Box>
                    </Box>
                    <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="flex-start"
                        spacing={2}
                        useFlexGap
                        sx={{ width: '100%', display: { xs: 'none', sm: 'flex' } }}
                    >
                        {items.map(({ icon, title, description }, index) => (
                            <Card
                                key={index}
                                variant="outlined"
                                component={Button}
                                onClick={() => handleItemClick(index)}
                                sx={{
                                    p: 3,
                                    height: 'fit-content',
                                    width: '100%',
                                    background: 'none',
                                    backgroundColor:
                                        selectedItemIndex === index ? 'action.selected' : undefined,
                                    borderColor: (theme) => {
                                        if (theme.palette.mode === 'light') {
                                            return selectedItemIndex === index
                                                ? 'primary.light'
                                                : 'grey.200';
                                        }
                                        return selectedItemIndex === index ? 'primary.dark' : 'grey.800';
                                    },
                                }}
                            >
                                <Box
                                    sx={{
                                        width: '100%',
                                        display: 'flex',
                                        textAlign: 'left',
                                        flexDirection: { xs: 'column', md: 'row' },
                                        alignItems: { md: 'center' },
                                        gap: 2.5,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            color: (theme) => {
                                                if (theme.palette.mode === 'light') {
                                                    return selectedItemIndex === index
                                                        ? 'primary.main'
                                                        : 'grey.300';
                                                }
                                                return selectedItemIndex === index
                                                    ? 'primary.main'
                                                    : 'grey.700';
                                            },
                                        }}
                                    >
                                        {icon}
                                    </Box>
                                    <Box sx={{ textTransform: 'none' }}>
                                        <Typography
                                            color="text.primary"
                                            variant="body2"
                                            fontWeight="bold"
                                        >
                                            {title}
                                        </Typography>
                                        <Typography
                                            color="text.secondary"
                                            variant="body2"
                                            sx={{ my: 0.5 }}
                                        >
                                            {description}
                                        </Typography>
                                        <Link
                                            color="primary"
                                            variant="body2"
                                            fontWeight="bold"
                                            sx={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                '& > svg': { transition: '0.2s' },
                                                '&:hover > svg': { transform: 'translateX(2px)' },
                                            }}
                                            onClick={(event) => {
                                                event.stopPropagation();
                                            }}
                                        >
                                            <span>Learn more</span>
                                            <ChevronRightRoundedIcon
                                                fontSize="small"
                                                sx={{ mt: '1px', ml: '2px' }}
                                            />
                                        </Link>
                                    </Box>
                                </Box>
                            </Card>
                        ))}
                    </Stack>
                </Grid>

                <Grid item xs={12} md={6}>
                    {selectedFeature.title === 'Jadwal Kegiatan Posyandu' ? (
                        <Box sx={{ px: 2, pb: 2 }}>
                            <Typography color="text.primary" variant="h5" fontWeight="bold">
                                {selectedFeature.title}
                            </Typography>
                            {paginatedSchedule.map((item, index) => (
                                <Box key={index} sx={{ my: 1 }}>
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
                                                {item.keterangan}
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
                                                title={"RW " + item.rw}
                                                subheader={"Tempat: " + item.tempat}
                                            />
                                        </Box>
                                    </Card>
                                </Box>
                            ))}
                            <Pagination
                                count={totalPages}
                                page={page}
                                onChange={handleChangePage}
                                sx={{ mt: 2 }}
                            />
                            <strong>jika jadwal posyandu di RW anda tidak ada, mungkin petugas posyandu belum mengatur jadwal kegiatan posyandu di RW anda. Silahkan hubungi petugas posyandu untuk informasi lebih lanjut.</strong>
                        </Box>
                    ) : selectedFeature.title === 'Lokasi Posyandu' ? (
                        <Box
                            sx={{
                                borderRadius: 2,
                                overflow: 'hidden',
                                width: '100%',
                                height: 700,
                            }}
                        >
                            <Typography mb={5} variant="h5" fontWeight="bold">
                                <Stack direction="column" spacing={1}>
                                    <Chip
                                        label="Desa Cibeusi, Kecamatan Jatinangor, Kabupaten Sumedang"
                                        onDelete={handleDelete}
                                        deleteIcon={<LocationOnIcon />}
                                        variant="outlined"
                                    />
                                    <Chip
                                        label="Telp : 088809580511"
                                        deleteIcon={<CallIcon />}
                                        onDelete={handleDelete}
                                        variant="outlined"
                                    />
                                    <Chip
                                        label="Email : pemerintah.desa.cibeusi@gmail.com"
                                        deleteIcon={<EmailIcon />}
                                        onDelete={handleDelete}
                                        variant="outlined"
                                    />
                                </Stack>
                            </Typography>
                            <iframe
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                style={{ border: 0 }}
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.6408368228367!2d107.75807437475706!3d-6.933459893066438!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68c372c05ea651%3A0xb41d565df7587769!2skost%20kuning%20cibeusi!5e0!3m2!1sid!2sid!4v1720448855877!5m2!1sid!2sid"
                                allowFullScreen
                                loading="lazy"

                            />
                        </Box>
                    ) : selectedFeature.title === 'Jumlah Anak yang Terdaftar' ? (
                        <Box sx={{ p: 3, width: '100%', height: 800, overflow: 'hidden' }}>
                            <Typography color="text.primary" variant="h5" fontWeight="bold">
                                {selectedFeature.title}
                            </Typography>
                            <ChildCountChart data={data} />
                        </Box>
                    ) : (
                        <Box
                            sx={{
                                borderRadius: 2,
                                backgroundImage: (theme) =>
                                    theme.palette.mode === 'light'
                                        ? selectedFeature.imageLight
                                        : selectedFeature.imageDark,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                minHeight: 800,
                            }}
                        />
                    )}
                </Grid>
            </Grid>
        </Container>
    );
}
