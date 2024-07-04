import React from 'react';
import Button from '@mui/material/Button';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
'./style.css';
/* eslint-disable react/prop-types */
const BackButton = ({ href }) => (
    <Button variant="contained" id='btn-back' href={href}>
        <ReplyAllIcon sx={{ marginRight: 1 }} />
        Kembali
    </Button>
    );

export default BackButton;