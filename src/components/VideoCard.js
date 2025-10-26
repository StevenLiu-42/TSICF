import React, { useState } from 'react';
import { hasLiked, addLike, getTotalLikes } from '../utils/likeManager';
import { submitLike } from '../services/api';

/**
 * VideoCard Component
 * Displays a single video card with thumbnail, like count, and action buttons
 */
const VideoCard = ({ video, config, onLikeUpdate }) => {
  const [likes, setLikes] = useState(video.likes || 0);
  const [isLiked, setIsLiked] = useState(hasLiked(video.youtube_id));
  const [isLoading, setIsLoading] = useState(false);
  const [showMessage, setShowMessage] = useState('');

  // Generate YouTube thumbnail URL
  const thumbnailUrl = `https://img.youtube.com/vi/${video.youtube_id}/maxresdefault.jpg`;

  /**
   * Handle like button click
   */
  const handleLike = async () => {
    // Check if already liked
    if (isLiked) {
      setShowMessage('您已經為此影片點過讚了！');
      setTimeout(() => setShowMessage(''), 3000);
      return;
    }

    // Check like limit if enabled
    if (config.enable_like_limit) {
      const totalLikes = getTotalLikes();
      if (totalLikes >= config.max_likes_per_user) {
        setShowMessage(`您已達到點讚上限（${config.max_likes_per_user}個）`);
        setTimeout(() => setShowMessage(''), 3000);
        return;
      }
    }

    setIsLoading(true);

    try {
      // Submit like to backend
      const result = await submitLike(video.youtube_id);
      
      // Update local state
      setLikes(result.likes);
      setIsLiked(true);
      addLike(video.youtube_id);
      
      setShowMessage('感謝您的點讚！');
      setTimeout(() => setShowMessage(''), 3000);

      // Notify parent component
      if (onLikeUpdate) {
        onLikeUpdate(video.youtube_id, result.likes);
      }
    } catch (error) {
      setShowMessage('點讚失敗，請稍後再試');
      setTimeout(() => setShowMessage(''), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card h-100 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
      {/* Video Thumbnail */}
      <div className="position-relative overflow-hidden" style={{ paddingTop: '56.25%' }}>
        <img
          src={thumbnailUrl}
          className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
          alt={`Video ${video.youtube_id}`}
          onError={(e) => {
            e.target.src = `https://img.youtube.com/vi/${video.youtube_id}/hqdefault.jpg`;
          }}
        />
        {/* Like Badge */}
        <div className="position-absolute top-0 end-0 m-3 bg-dark bg-opacity-75 text-white px-3 py-2 rounded-pill">
          <i className="bi bi-heart-fill text-danger me-2"></i>
          <span className="fw-bold">{likes}</span>
        </div>
      </div>

      {/* Card Body */}
      <div className="card-body d-flex flex-column">
        {/* Message Display */}
        {showMessage && (
          <div className={`alert ${isLiked && showMessage.includes('感謝') ? 'alert-success' : 'alert-warning'} alert-dismissible fade show py-2`} role="alert">
            {showMessage}
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-auto">
          {/* Like Button */}
          <button
            onClick={handleLike}
            disabled={isLoading || isLiked}
            className={`btn w-100 mb-2 ${
              isLiked 
                ? 'btn-secondary' 
                : 'btn-danger hover:bg-red-600'
            } transition-colors duration-200`}
          >
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                處理中...
              </>
            ) : isLiked ? (
              <>
                <i className="bi bi-heart-fill me-2"></i>
                已點讚
              </>
            ) : (
              <>
                <i className="bi bi-heart me-2"></i>
                點讚
              </>
            )}
          </button>

          {/* External Links */}
          <div className="d-flex gap-2">
            {video.youtube_link && (
              <a
                href={video.youtube_link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-danger flex-grow-1"
              >
                <i className="bi bi-youtube me-1"></i>
                YouTube
              </a>
            )}
            {video.facebook_link && (
              <a
                href={video.facebook_link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-primary flex-grow-1"
              >
                <i className="bi bi-facebook me-1"></i>
                Facebook
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
