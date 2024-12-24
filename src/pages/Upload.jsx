import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { 
  Button, 
  Box, 
  Typography, 
  LinearProgress, 
  Alert, 
  Paper 
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import './Upload.css';

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith('video/')) {
        setSelectedFile(file);
        setError('');
        setUploadStatus('');
        setUploadProgress(0);
      } else {
        setError('Please select a valid video file');
        setSelectedFile(null);
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select a file first');
      return;
    }

    const formData = new FormData();
    formData.append('video', selectedFile);
    setIsUploading(true);
    setError('');

    try {
      const response = await axios.post(
        'http://localhost:5000/api/transcriptions/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          },
        }
      );

      if (response.data) {
        setUploadStatus('Upload successful!');
        setTimeout(() => {
          navigate('/'); // Redirect to home page after successful upload
        }, 1500);
      }
    } catch (error) {
      console.error('Upload error:', error);
      setError(
        error.response?.data?.message || 
        'Error uploading file. Please try again.'
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          borderRadius: 2,
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)'
        }}
      >
        <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
          Upload Video
        </Typography>

        <Box 
          className="upload-area"
          sx={{
            border: '2px dashed #1a73e8',
            borderRadius: 2,
            p: 4,
            textAlign: 'center',
            mb: 3,
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: 'rgba(26, 115, 232, 0.04)'
            }
          }}
        >
          <input
            type="file"
            onChange={handleFileSelect}
            accept="video/*"
            id="file-input"
            style={{ display: 'none' }}
          />
          <label htmlFor="file-input" style={{ cursor: 'pointer' }}>
            <CloudUploadIcon sx={{ fontSize: 48, color: '#1a73e8', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              {selectedFile ? selectedFile.name : 'Choose a video file'}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              or drag and drop here
            </Typography>
          </label>
        </Box>

        {selectedFile && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="body1" gutterBottom>
              File: {selectedFile.name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Size: {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
            </Typography>
          </Box>
        )}

        {isUploading && (
          <Box sx={{ mb: 3 }}>
            <LinearProgress 
              variant="determinate" 
              value={uploadProgress} 
              sx={{ height: 8, borderRadius: 4 }}
            />
            <Typography 
              variant="body2" 
              color="textSecondary" 
              align="center" 
              sx={{ mt: 1 }}
            >
              {uploadProgress}% Uploaded
            </Typography>
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {uploadStatus && (
          <Alert severity="success" sx={{ mb: 3 }}>
            {uploadStatus}
          </Alert>
        )}

        <Button
          variant="contained"
          fullWidth
          size="large"
          onClick={handleUpload}
          disabled={!selectedFile || isUploading}
          startIcon={<CloudUploadIcon />}
          sx={{
            height: 48,
            background: 'linear-gradient(90deg, #1a73e8, #34a853)',
            '&:hover': {
              background: 'linear-gradient(90deg, #1557b0, #2d7a48)'
            }
          }}
        >
          {isUploading ? 'Uploading...' : 'Upload Video'}
        </Button>
      </Paper>
    </Box>
  );
};

export default Upload; 