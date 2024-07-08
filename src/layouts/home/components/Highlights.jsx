import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import SickIcon from '@mui/icons-material/Sick';

const items = [
    {
        icon: <VaccinesIcon />,
        title: 'BCG (Bacillus Calmette-Guérin)',
        description:
            'Mencegah tuberkulosis (TB).',
    },
    {
        icon: <LocalHospitalIcon />,
        title: 'Hepatitis B',
        description:
            'Mencegah infeksi virus hepatitis B yang bisa menyebabkan kerusakan hati.',
    },
    {
        icon: <MedicalServicesIcon />,
        title: 'DPT (Difteri, Pertusis, Tetanus)',
        description:
            'Mencegah difteri, pertusis (batuk rejan), dan tetanus.',
    },
    {
        icon: <HealthAndSafetyIcon />,
        title: 'Polio',
        description:
            'Mencegah penyakit polio yang dapat menyebabkan kelumpuhan.',
    },
    {
        icon: <LocalPharmacyIcon />,
        title: 'Hib (Haemophilus influenzae tipe b)',
        description:
            'Mencegah infeksi bakteri Haemophilus influenzae tipe b yang dapat menyebabkan meningitis, pneumonia, dan infeksi lainnya.',
    },
    {
        icon: <SickIcon />,
        title: 'Campak',
        description:
            'Mencegah penyakit campak yang dapat menyebabkan komplikasi serius.',
    },
];

export default function Highlights() {
    return (
        <Box
            id="highlights"
            sx={{
                pt: { xs: 4, sm: 12 },
                pb: { xs: 8, sm: 16 },
                color: 'white',
                bgcolor: '#06090a',
            }}
        >
            <Container
                sx={{
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
                    <Typography component="h2" variant="h4">
                        Imunisasi
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'grey.400' }}>
                        Imunisasi adalah tindakan untuk memberikan kekebalan terhadap suatu penyakit melalui pemberian vaksin. Vaksin mengandung antigen yang dapat merangsang sistem kekebalan tubuh untuk membentuk antibodi.
                    </Typography>
                </Box>
                <Grid container spacing={2.5}>
                    {items.map((item, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Stack
                                direction="column"
                                color="inherit"
                                component={Card}
                                spacing={1}
                                useFlexGap
                                sx={{
                                    p: 3,
                                    height: '100%',
                                    border: '1px solid',
                                    borderColor: 'grey.800',
                                    background: 'transparent',
                                    backgroundColor: 'grey.900',
                                }}
                            >
                                <Box sx={{ opacity: '50%' }}>{item.icon}</Box>
                                <div>
                                    <Typography fontWeight="medium" gutterBottom>
                                        {item.title}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'grey.400' }}>
                                        {item.description}
                                    </Typography>
                                </div>
                            </Stack>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}
