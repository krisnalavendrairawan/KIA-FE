import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Box } from '@mui/material';

/* eslint-disable react/prop-types */
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChildCountChart = ({ data }) => {
    console.log('data', data);
    let LakiLaki = 0;
    let Perempuan = 0;

    data.forEach(child => {
        if (child.jenis_kelamin === 'Laki-Laki') {
            LakiLaki++;
        } else if (child.jenis_kelamin === 'Perempuan') {
            Perempuan++;
        }
    });

    const chartData = {
        labels: ['Laki-Laki', 'Perempuan'],
        datasets: [
            {
                label: 'Jumlah Anak',
                data: [LakiLaki, Perempuan],
                backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)'],
                borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <Box sx={{ width: '100%', height: 800 }}>
            <Bar data={chartData} options={options} />
        </Box>
    );
};

export default ChildCountChart;
