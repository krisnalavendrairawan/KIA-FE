import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Line, Bar } from "react-chartjs-2";
import { Alert, Grid, Paper, Typography, Divider, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import BarChartIcon from '@mui/icons-material/BarChart';
import LineChartIcon from '@mui/icons-material/ShowChart';
import BackButton from 'components/BackButton';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import SessionExpired from "layouts/authentication/log-out/session";

const URL = 'http://127.0.0.1:8000/api';

const GraphicChild = () => {
    SessionExpired();
    const { nik } = useParams();
    const [weightData, setWeightData] = useState([]);
    const [heightData, setHeightData] = useState([]);
    const [dates, setDates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [weightChartType, setWeightChartType] = useState('line'); // State to track chart type for weight
    const [heightChartType, setHeightChartType] = useState('line'); // State to track chart type for height

    useEffect(() => {
        fetchDataAnak();
    }, [nik]);

    const fetchDataAnak = async () => {
        try {
            const response = await axios.get(`${URL}/getPenimbanganByNik/${nik}`);
            const penimbangan = response.data.penimbangan;

            console.log('Raw penimbangan data:', penimbangan);

            // Ensure each item has valid numbers and dates
            const weights = penimbangan.map((item) => parseFloat(item.berat_badan) || 0);
            const heights = penimbangan.map((item) => parseFloat(item.tinggi_badan) || 0);
            const dates = penimbangan.map((item) =>
                new Date(item.tgl_penimbangan).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                })
            );

            console.log('Processed penimbangan data:', weights, heights, dates);

            setWeightData(weights);
            setHeightData(heights);
            setDates(dates);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    const isDataEmpty = !weightData.length || !heightData.length || !dates.length;

    const weightChartData = {
        labels: dates,
        datasets: [
            {
                label: 'Berat Badan (kg)',
                data: weightData,
                fill: false,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
            },
        ],
    };

    const heightChartData = {
        labels: dates,
        datasets: [
            {
                label: 'Tinggi Badan (cm)',
                data: heightData,
                fill: false,
                backgroundColor: 'rgba(153,102,255,0.4)',
                borderColor: 'rgba(153,102,255,1)',
            },
        ],
    };

    const handleWeightChartTypeChange = (event) => {
        setWeightChartType(event.target.value);
    };

    const handleHeightChartTypeChange = (event) => {
        setHeightChartType(event.target.value);
    };

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <div className="container mx-auto">
                <Alert variant="filled" icon={<BarChartIcon fontSize="inherit" />} severity="info">
                    Halaman Grafik Tumbuh Kembang Anak
                </Alert>

                {loading ? (
                    <div className="text-center text-xl">Loading data...</div>
                ) : isDataEmpty ? (
                    <div className="text-center text-xl">Data tumbuh kembang anak belum ada</div>
                ) : (
                    <Grid container spacing={3} sx={{ marginTop: '1rem' }}>
                        <Grid item xs={12} md={6}>
                            <Paper style={{ padding: '20px' }}>
                                <Typography variant="h6" gutterBottom>
                                    Grafik Berat Badan
                                </Typography>
                                <Divider />
                                <RadioGroup
                                    aria-label="weight-chart-type"
                                    name="weight-chart-type"
                                    value={weightChartType}
                                    onChange={handleWeightChartTypeChange}
                                    style={{ marginBottom: '1rem' }}
                                >
                                    <FormControlLabel
                                        value="line"
                                        control={<Radio />}
                                        label={<><LineChartIcon fontSize="small" /> Line</>}
                                    />
                                    <FormControlLabel
                                        value="bar"
                                        control={<Radio />}
                                        label={<><BarChartIcon fontSize="small" /> Bar</>}
                                    />
                                </RadioGroup>
                                {weightChartType === 'line' ? (
                                    <Line data={weightChartData} />
                                ) : (
                                    <Bar data={weightChartData} />
                                )}
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Paper style={{ padding: '20px' }}>
                                <Typography variant="h6" gutterBottom>
                                    Grafik Tinggi Badan
                                </Typography>
                                <Divider />
                                <RadioGroup
                                    aria-label="height-chart-type"
                                    name="height-chart-type"
                                    value={heightChartType}
                                    onChange={handleHeightChartTypeChange}
                                    style={{ marginBottom: '1rem' }}
                                >
                                    <FormControlLabel
                                        value="line"
                                        control={<Radio />}
                                        label={<><LineChartIcon fontSize="small" /> Line</>}
                                    />
                                    <FormControlLabel
                                        value="bar"
                                        control={<Radio />}
                                        label={<><BarChartIcon fontSize="small" /> Bar</>}
                                    />
                                </RadioGroup>
                                {heightChartType === 'line' ? (
                                    <Line data={heightChartData} />
                                ) : (
                                    <Bar data={heightChartData} />
                                )}
                            </Paper>
                        </Grid>
                        <Grid item>
                            <BackButton href={`/anak/detail/${nik}`} />
                        </Grid>
                    </Grid>
                )}
            </div>
        </DashboardLayout>
    );
};

export default GraphicChild;
