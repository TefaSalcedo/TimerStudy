import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faYoutube } from '@fortawesome/free-brands-svg-icons'; // Importar el ícono de YouTub
import { EyeClosed, Eye } from 'lucide-react'; // Importar íconos de Lucide
import "./youtube.css";

const YoutubeSpecificVideo = () => {
  const [video, setVideo] = useState(null);
  const [videoId, setVideoId] = useState('y29kmnhjtc8'); // Video ID por defecto
  const [showVideo, setShowVideo] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(true); // Estado para mostrar/ocultar el formulario
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

  const toggleForm = () => {
    setShowForm(!showForm); // Alternar la visibilidad del formulario
  };

  if (!video && showVideo) {
    return <div className="loading-video">Cargando video...</div>;
  }

  return (
    <div>
      <button className="youtube-button" onClick={toggleVideo}>
      <FontAwesomeIcon icon={faYoutube}  size="3x" style={{color:"#c4302b"}} />
      </button>
      {showVideo && (
        <div className="youtube-container">
          <div className="form-toggle-buttons">
          {!showForm ? (
              <button className="toggle-button" onClick={toggleForm}>
                <Eye color="#808080" />
              </button>
            ) : (
              <button className="toggle-button" onClick={toggleForm}>
                <EyeClosed color="#808080" />
              </button>
            )}
          </div>
          {showForm && (
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
          )}
          <div className="iframe-container">
            <iframe
              width="400"
              height="250"
              src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default YoutubeSpecificVideo;