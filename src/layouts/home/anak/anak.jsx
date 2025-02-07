import * as React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';

import ReplyAllIcon from '@mui/icons-material/ReplyAll';

import PageLayout from 'examples/LayoutContainers/PageLayout';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import AddressForm from './component/AddressForm';
import getCheckoutTheme from './component/getCheckoutTheme';
import Info from './component/Info';
import InfoMobile from './component/InfoMobile';
import PaymentForm from './component/PaymentForm';
import Review from './component/Review';
import ToggleColorMode from './component/ToggleColorMode';

function ToggleCustomTheme({ showCustomTheme, toggleCustomTheme }) {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100dvw',
                position: 'fixed',
                bottom: 24,
            }}
        >
            <ToggleButtonGroup
                color="primary"
                exclusive
                value={showCustomTheme}
                onChange={toggleCustomTheme}
                aria-label="Platform"
                sx={{
                    backgroundColor: 'background.default',
                    '& .Mui-selected': {
                        pointerEvents: 'none',
                    },
                }}
            >
                {/* <ToggleButton value>
                    <AutoAwesomeRoundedIcon sx={{ fontSize: '20px', mr: 1 }} />
                    Custom theme
                </ToggleButton>
                <ToggleButton value={false}>Material Design 2</ToggleButton> */}
            </ToggleButtonGroup>
        </Box>
    );
}

ToggleCustomTheme.propTypes = {
    showCustomTheme: PropTypes.shape({
        valueOf: PropTypes.func.isRequired,
    }).isRequired,
    toggleCustomTheme: PropTypes.func.isRequired,
};

const steps = ['Shipping address', 'Payment details', 'Review your order'];

const logoStyle = {
    width: '140px',
    height: '56px',
    marginLeft: '-4px',
    marginRight: '-8px',
};

function getStepContent(step) {
    switch (step) {
        case 0:
            return <AddressForm />;
        case 1:
            return <PaymentForm />;
        case 2:
            return <Review />;
        default:
            throw new Error('Unknown step');
    }
}

const url = 'http://127.0.0.1:8000/api';
export default function Checkout() {
    const { nik } = useParams();
    const [data, setData] = useState([]);
    const [mode, setMode] = useState('light');
    const [showCustomTheme, setShowCustomTheme] = useState(false); // Set default to false
    const checkoutTheme = createTheme(getCheckoutTheme(mode));
    const defaultTheme = createTheme({ palette: { mode } });
    const [activeStep, setActiveStep] = useState(0);

    const fetchData = async () => {
        const response = await axios.get(`${url}/getAnak/${nik}`);
        setData(response.data.anak);
        // console.log(response.data.anak)
    };

    useEffect(() => {
        fetchData();
    }, [nik]);

    const toggleColorMode = () => {
        setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    const toggleCustomTheme = () => {
        setShowCustomTheme((prev) => !prev);
    };

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    return (
        <PageLayout>
            <ThemeProvider theme={showCustomTheme ? checkoutTheme : defaultTheme}>
                <CssBaseline />
                <Grid container sx={{ height: { xs: '100%', sm: '100dvh' } }}>
                    <Grid
                        item
                        xs={12}
                        sm={5}
                        lg={4}
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            flexDirection: 'column',
                            backgroundColor: 'background.paper',
                            borderRight: { sm: 'none', md: '1px solid' },
                            borderColor: { sm: 'none', md: 'divider' },
                            alignItems: 'start',
                            pt: 4,
                            px: 10,
                            gap: 4,
                        }}
                    >

                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                flexGrow: 1,
                                width: '100%',
                                maxWidth: 500,
                            }}
                        >
                            <Info data={data} />
                            <Button sx={{ marginTop: '30px' }} variant="contained" id='back-button' href="/home">
                                <ReplyAllIcon sx={{ marginRight: 1 }} />
                                Kembali
                            </Button>
                        </Box>
                    </Grid>
                    <Grid
                        item
                        sm={12}
                        md={7}
                        lg={8}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            maxWidth: '100%',
                            width: '100%',
                            backgroundColor: { xs: 'transparent', sm: 'background.default' },
                            alignItems: 'start',
                            pt: { xs: 2, sm: 4 },
                            px: { xs: 2, sm: 10 },
                            gap: { xs: 4, md: 8 },
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: { sm: 'space-between', md: 'flex-end' },
                                alignItems: 'center',
                                width: '100%',
                                maxWidth: { sm: '100%', md: 600 },
                            }}
                        >
                            <Box
                                sx={{
                                    display: { xs: 'flex', md: 'none' },
                                    flexDirection: 'row',
                                    width: '100%',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Button
                                    startIcon={<ArrowBackRoundedIcon />}
                                    component="a"
                                    href="/material-ui/getting-started/templates/landing-page/"
                                    sx={{ alignSelf: 'start' }}
                                >
                                    Back to
                                    <img
                                        src={
                                            'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e6faf73568658154dae_SitemarkDefault.svg'
                                        }
                                        style={logoStyle}
                                        alt="Sitemark's logo"
                                    />
                                </Button>
                                <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
                            </Box>
                            <Box
                                sx={{
                                    display: { xs: 'none', md: 'flex' },
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-end',
                                    flexGrow: 1,
                                    height: 150,
                                }}
                            >
                                <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
                                Jadwal Kegiatan Posyandu Selanjutnya
                            </Box>
                        </Box>
                        <Card
                            sx={{
                                display: { xs: 'flex', md: 'none' },
                                width: '100%',
                            }}
                        >
                            <CardContent
                                sx={{
                                    display: 'flex',
                                    width: '100%',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    ':last-child': { pb: 2 },
                                }}
                            >
                                <div>
                                    <Typography variant="subtitle2" gutterBottom>
                                        Nama Anak
                                    </Typography>
                                    <Typography variant="body1">
                                        {data.nama_anak || 'Loading...'}
                                    </Typography>
                                </div>
                                <InfoMobile data={data} />
                            </CardContent>
                        </Card>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                flexGrow: 1,
                                width: '100%',
                                maxWidth: { sm: '100%', md: 600 },
                                maxHeight: '720px',
                                gap: { xs: 5, md: 'none' },
                            }}
                        >
                            <Stepper
                                id="mobile-stepper"
                                activeStep={activeStep}
                                alternativeLabel
                                sx={{ display: { sm: 'flex', md: 'none' } }}
                            >
                                {steps.map((label) => (
                                    <Step
                                        sx={{
                                            ':first-child': { pl: 0 },
                                            ':last-child': { pr: 0 },
                                            '& .MuiStepConnector-root': { top: { xs: 6, sm: 12 } },
                                        }}
                                        key={label}
                                    >
                                        <StepLabel
                                            sx={{ '.MuiStepLabel-labelContainer': { maxWidth: '70px' } }}
                                        >
                                            {label}
                                        </StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                            {activeStep === steps.length ? (
                                <Stack spacing={2} useFlexGap>
                                    <Typography variant="h1">📦</Typography>
                                    <Typography variant="h5">Thank you for your order!</Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        Your order number is
                                        <strong>&nbsp;#140396</strong>. We have emailed your order
                                        confirmation and will update you once its shipped.
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            alignSelf: 'start',
                                            width: { xs: '100%', sm: 'auto' },
                                        }}
                                    >
                                        Go to my orders
                                    </Button>
                                </Stack>
                            ) : (
                                <React.Fragment>
                                    {getStepContent(activeStep)}
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: { xs: 'column-reverse', sm: 'row' },
                                            justifyContent: activeStep !== 0 ? 'space-between' : 'flex-end',
                                            alignItems: 'end',
                                            flexGrow: 1,
                                            gap: 1,
                                            pb: { xs: 12, sm: 0 },
                                            mt: { xs: 2, sm: 0 },
                                            mb: '60px',
                                        }}
                                    >
                                        {activeStep !== 0 && (
                                            <Button
                                                startIcon={<ChevronLeftRoundedIcon />}
                                                onClick={handleBack}
                                                variant="text"
                                                sx={{
                                                    display: { xs: 'none', sm: 'flex' },
                                                }}
                                            >
                                                Previous
                                            </Button>
                                        )}

                                        {activeStep !== 0 && (
                                            <Button
                                                startIcon={<ChevronLeftRoundedIcon />}
                                                onClick={handleBack}
                                                variant="outlined"
                                                fullWidth
                                                sx={{
                                                    display: { xs: 'flex', sm: 'none' },
                                                }}
                                            >
                                                Previous
                                            </Button>
                                        )}
                                    </Box>
                                </React.Fragment>
                            )}
                        </Box>
                    </Grid>
                </Grid>
                <ToggleCustomTheme
                    toggleCustomTheme={toggleCustomTheme}
                    showCustomTheme={showCustomTheme}
                />
            </ThemeProvider>
        </PageLayout>
    );
}
