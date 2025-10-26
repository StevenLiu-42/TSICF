import React from 'react';
import VideoCard from './VideoCard';

/**
 * VideoGrid Component
 * Displays a responsive grid of video cards
 */
const VideoGrid = ({ videos, config, onLikeUpdate }) => {
  if (!videos || videos.length === 0) {
    return (
      <div className="container py-5">
        <div className="alert alert-info text-center" role="alert">
          <i className="bi bi-info-circle fs-3 d-block mb-3"></i>
          <h4>目前沒有影片</h4>
          <p className="mb-0">請稍後再回來查看</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row g-4">
        {videos.map((video) => (
          <div key={video.youtube_id} className="col-12 col-sm-6 col-lg-4 col-xl-3">
            <VideoCard 
              video={video} 
              config={config}
              onLikeUpdate={onLikeUpdate}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoGrid;
