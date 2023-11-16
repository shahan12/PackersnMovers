import React, { useState } from 'react';
import thumbnail from "../../images/thumb1.png";
import 'font-awesome/css/font-awesome.min.css';

const BlogVideoIndiv = ({ title, video, className, thumb }) => {
  const [showVideo, setShowVideo] = useState(false);

  const handlePlayClick = (e) => {
    e.stopPropagation();
    setShowVideo(true);
  };

  const handleCloseClick = (e) => {
    e.stopPropagation();
    setShowVideo(false);
  };

  return (
    <div className={`blog-video-indiv ${className}`}>
      <div className="thumbnail-container" >
        <img src={thumbnail} alt={title} className="thumbnail" />
        {!showVideo && (
          <div className="play-button" onClick={handlePlayClick}>
            <i className="fa fas fa-play"></i>
          </div>
        )}
      </div>
      {showVideo && (
        <div className="video-modal">
          <div className="close-button" onClick={handleCloseClick}>
            <i className="fa fas fa-times"></i>
          </div>
          <iframe
            title={title}
            width="100%"
            height="100%"
            src={video}
            frameborder="0"
            allowfullscreen
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default BlogVideoIndiv;


