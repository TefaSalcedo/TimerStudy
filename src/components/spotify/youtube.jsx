import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./youtube"


const YoutubeSpecificVideo = ({ videoId }) => {
  const [video, setVideo] = useState(null);
  const apiKey =  import.meta.env.VITE_API_KEY;
  // const channelId = 'UC0GWnYg7_i0o9wsR0y7U0Tg'; // Reemplaza con el ID del canal

  useEffect(() => {
    const fetchVideo = async () => {
        try {
            const response = await axios.get(
                `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`
            );
            if (response.data.items.length > 0) {
                setVideo(response.data.items[0]);
            }
        } catch (error) {
            console.error('Error fetching video:', error);
        }
    };
    fetchVideo();
}, [apiKey, videoId]);

if (!video) {
    return <div>Cargando video...</div>;
}

return (
    <div>
        <h2>{video.snippet.title}</h2>
        <img
            src={video.snippet.thumbnails.medium.url}
            alt={video.snippet.title}
        />
        <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        ></iframe>
    </div>
);
};

export default YoutubeSpecificVideo;