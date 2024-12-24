import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import './VideoPlayer.css';

const VideoPlayer = ({ videoUrl, segments }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    // Make sure we have both the video element and segments
    if (!videoRef.current || !segments) return;

    // Wait for next tick to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      // Only initialize player if it hasn't been initialized yet
      if (!playerRef.current) {
        const player = videojs(videoRef.current, {
          controls: true,
          fluid: true,
          html5: {
            nativeTextTracks: false
          }
        });

        // Create VTT content
        const vttContent = `WEBVTT

${segments.map((segment, index) => {
  const start = segment.start.replace(',', '.');
  const end = segment.end.replace(',', '.');
  return `${index + 1}
${start} --> ${end}
${segment.text}
`}).join('\n')}`;

        // Create blob and URL for the VTT file
        const blob = new Blob([vttContent], { type: 'text/vtt' });
        const vttUrl = URL.createObjectURL(blob);

        // Add the track once player is ready
        player.ready(() => {
          player.addRemoteTextTrack({
            kind: 'subtitles',
            src: vttUrl,
            srclang: 'en',
            label: 'English',
            default: true
          }, false);
        });

        playerRef.current = player;
      }
    }, 0);

    // Cleanup
    return () => {
      clearTimeout(timeoutId);
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [videoRef, segments, videoUrl]);

  return (
    <div className="video-container">
      <div data-vjs-player>
        <video
          ref={videoRef}
          className="video-js vjs-big-play-centered"
          preload="auto"
        >
          <source src={videoUrl} type="video/mp4" />
          <p className="vjs-no-js">
            To view this video please enable JavaScript, and consider upgrading to a
            web browser that supports HTML5 video
          </p>
        </video>
      </div>
    </div>
  );
};

export default VideoPlayer;
