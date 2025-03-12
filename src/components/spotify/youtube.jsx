import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import axios from 'axios';
import { Resizable } from 're-resizable';
import "./youtube.css";

const YoutubeSpecificVideo = () => {
  const [video, setVideo] = useState(null);
  const [videoId, setVideoId] = useState('1-MJcO-vCts'); // Video ID por defecto
  const [showVideo, setShowVideo] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`
        );
        if (response.data.items.length > 0) {
          setVideo(response.data.items[0]);
        } else {
          console.error('No video found with the provided ID.');
        }
      } catch (error) {
        console.error('Error fetching video:', error);
      }
    };
    if (showVideo) {
      fetchVideo();
    }
  }, [apiKey, videoId, showVideo]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm) {
      setVideoId(searchTerm);
    }
  };

  const toggleVideo = () => {
    setShowVideo(!showVideo);
  };

  if (!video && showVideo) {
    return <div className="loading-video">Cargando video...</div>;
  }

  return (
    <div>
      <button className="youtube-button" onClick={toggleVideo}>
        <img src="youtube-logo.png" alt="YouTube" />
      </button>
      {showVideo && (
        <div>
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter YouTube Video ID"
              className="search-input"
            />
            <button type="submit" className="search-button">Search</button>
          </form>
          <Draggable>
            <Resizable
              defaultSize={{
                width: 300,
                height: 200,
              }}
              className="draggable-iframe"
            >
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </Resizable>
          </Draggable>
        </div>
      )}
    </div>
  );
};

export default YoutubeSpecificVideo;