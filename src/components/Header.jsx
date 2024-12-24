import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';

const Header = () => {
  const location = useLocation();

  return (
    <AppBar 
      position="static" 
      sx={{
        background: 'linear-gradient(90deg, #1a73e8, #34a853)',
        boxShadow: '0 2px 12px rgba(0,0,0,0.1)'
      }}
    >
      <Toolbar>
        <Typography 
          variant="h5" 
          component={RouterLink} 
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'white',
            fontWeight: 700,
            letterSpacing: '0.5px',
            '&:hover': {
              opacity: 0.9
            }
          }}
        >
          Video Caption App
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/upload"
            startIcon={<CloudUploadIcon />}
            sx={{
              borderRadius: '8px',
              padding: '8px 16px',
              backgroundColor: location.pathname === '/upload' ? 'rgba(255,255,255,0.1)' : 'transparent',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.2)'
              }
            }}
          >
            Upload Video
          </Button>
          
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/"
            startIcon={<VideoLibraryIcon />}
            sx={{
              borderRadius: '8px',
              padding: '8px 16px',
              backgroundColor: location.pathname === '/' ? 'rgba(255,255,255,0.1)' : 'transparent',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.2)'
              }
            }}
          >
            My Videos
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
