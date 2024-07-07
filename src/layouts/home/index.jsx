import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box, Grid, Link } from '@mui/material';
import PageLayout from 'examples/LayoutContainers/PageLayout';
import { styled } from '@mui/material/styles';
import iconPosyandu from 'assets/images/icon_posyandu.png';
import logoPosyandu from 'assets/images/POSYANDU.png';
import './style.css'

const Home = () => {

    return (
        <PageLayout>
            <div className="container">
                <img src={logoPosyandu} alt="Logo Posyandu" />
                <Typography className="title">
                    Selamat Datang di Website Posyandu Kalurahan Dengok
                </Typography>
                <img src={iconPosyandu} alt="Icon Posyandu" />
            </div>
        </PageLayout>
    );
};

export default Home;