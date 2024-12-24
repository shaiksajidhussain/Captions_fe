import React from 'react';
import { Box, List, ListItem, ListItemText, IconButton, Typography } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DownloadIcon from '@mui/icons-material/Download';
import VideoPlayer from '../VideoPlayer/VideoPlayer';

const TranscriptionList = ({ transcriptions, onPlayVideo, onDownloadSRT }) => {
  const [selectedVideo, setSelectedVideo] = React.useState(null);

  const handlePlay = (transcription) => {
    setSelectedVideo(transcription);
    if (onPlayVideo) {
      onPlayVideo(transcription);
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 800, mx: 'auto', mt: 3 }}>
      {selectedVideo && (
        <Box sx={{ mb: 4 }}>
          <VideoPlayer 
            videoUrl={`http://localhost:5000/api/transcriptions/${selectedVideo._id}/video`}
            segments={selectedVideo.segments}
          />
        </Box>
      )}

      <Typography variant="h6" gutterBottom>
        Recent Transcriptions
      </Typography>
      
      <List>
        {transcriptions.map((transcription) => (
          <ListItem
            key={transcription._id}
            sx={{
              border: '1px solid #eee',
              borderRadius: '4px',
              mb: 1,
              backgroundColor: selectedVideo?._id === transcription._id ? '#f5f5f5' : 'white'
            }}
          >
            <ListItemText 
              primary={transcription.fileName}
              secondary={`Status: ${transcription.status}`}
            />
            <Box>
              <IconButton 
                onClick={() => handlePlay(transcription)}
                color={selectedVideo?._id === transcription._id ? "primary" : "default"}
              >
                <PlayArrowIcon />
              </IconButton>
              <IconButton 
                onClick={() => onDownloadSRT(transcription)}
              >
                <DownloadIcon />
              </IconButton>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default TranscriptionList;
