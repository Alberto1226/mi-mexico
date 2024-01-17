import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { API_HOST2 } from '../../utils/constants';

const VideoUploader = ({ setVideoPathCallback, contentType  }) => {
  const [videoPath, setVideoPath] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const videoRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      uploadVideo(file);
    }
  };

  const uploadVideo = (file) => {
    const formData = new FormData();
    formData.append('video', file);

    axios.post(`${API_HOST2}/upload/${contentType}`, formData, {
      onUploadProgress: (progressEvent) => {
        const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
        setUploadProgress(progress);
      }
    })
      .then((response) => {
        setVideoPath(response.data.videoPath);
        console.log(response);
        setUploadProgress(0);
        // Llama a la función de retorno de la URL del video
        setVideoPathCallback(response.data.videoPath);
      })
      .catch((error) => {
        console.error('Error uploading video:', error);
      });
  };

 

  return (
    <div>
        <h6>Sube tu Video ({contentType})</h6>
      <input type="file" name="video" accept=".mp4" onChange={handleFileChange} />
      {uploadProgress > 0 && <progress value={uploadProgress} max="100" />}
      
    </div>
  );
};

export default VideoUploader;
