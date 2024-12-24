import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VideoPlayer from '../components/VideoPlayer/VideoPlayer';
import './Home.css';

function Home() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/transcriptions');
      setVideos(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching videos:', error);
      setLoading(false);
    }
  };

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
  };

  return (
    <div className="home">
      {selectedVideo && (
        <div className="video-player-section">
          <VideoPlayer 
            videoUrl={`http://localhost:5000/api/transcriptions/${selectedVideo._id}/video`}
            segments={selectedVideo.segments}
          />
        </div>
      )}

      <div className="video-list">
        <h2>Available Videos</h2>
        {loading ? (
          <p>Loading videos...</p>
        ) : (
          <div className="video-grid">
            {videos.map((video) => (
              <div 
                key={video._id}
                className={`video-item ${selectedVideo?._id === video._id ? 'active' : ''}`}
                onClick={() => handleVideoSelect(video)}
              >
                <div className="video-name">{video.fileName}</div>
                <div className="video-status">Status: {video.status}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
