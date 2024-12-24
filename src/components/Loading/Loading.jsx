import React from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';
import './Loading.css';

const Loading = ({ message = 'Loading...' }) => {
  return (
    <Box className="loading-container">
      <CircularProgress />
      <Typography variant="body1" className="loading-text">
        {message}
      </Typography>
    </Box>
  );
};

export default Loading;