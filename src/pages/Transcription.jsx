import React, { useState, useEffect } from 'react';
import { Container, Box } from '@mui/material';
import axios from 'axios';
import TranscriptionList from '../components/TranscriptionList/TranscriptionList';
import VideoPlayer from '../components/VideoPlayer/VideoPlayer';

function Transcription() {
  const [transcriptions, setTranscriptions] = useState([]);
  const [selectedTranscription, setSelectedTranscription] = useState(null);

  useEffect(() => {
    fetchTranscriptions();
  }, []);

  const fetchTranscriptions = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/transcriptions');
      setTranscriptions(response.data);
    } catch (error) {
      console.error('Error fetching transcriptions:', error);
    }
  };

  const handlePlayVideo = (transcription) => {
    setSelectedTranscription(transcription);
  };

  const handleDownloadSRT = async (transcription) => {
    try {
      // First get the transcription details to get the correct srtPath
      const transcriptionResponse = await axios.get(
        `http://localhost:5000/api/transcriptions/${transcription._id}`
      );
      
      const { srtPath } = transcriptionResponse.data;
      
      // Get the SRT file using the full path
      const response = await axios.get(
        `http://localhost:5000/api/transcriptions/${transcription._id}/srt`,
        { responseType: 'blob' }
      );
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${transcription.fileName}.srt`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading SRT:', error);
    }
  };

  return (
    <Container>
      {selectedTranscription && (
        <Box sx={{ mb: 4 }}>
          <VideoPlayer 
            videoUrl={`http://localhost:5000/api/transcriptions/${selectedTranscription._id}/video`}
            segments={selectedTranscription.segments}
          />
        </Box>
      )}

      <TranscriptionList 
        transcriptions={transcriptions}
        onPlayVideo={handlePlayVideo}
        onDownloadSRT={handleDownloadSRT}
      />
    </Container>
  );
}

export default Transcription;
