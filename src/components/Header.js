import React from 'react';
import { getTotalLikes } from '../utils/likeManager';

/**
 * Header Component
 * Displays site title and user statistics
 */
const Header = ({ config }) => {
  const totalLikes = getTotalLikes();

  return (
    <header className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg">
      <div className="container py-4">
        <div className="row align-items-center">
          <div className="col-md-8">
            <h1 className="display-5 fw-bold mb-2">
              {config?.site_title || '互動式影片活動'}
            </h1>
            <p className="lead mb-0">
              {config?.site_description || '觀看影片並為您最喜愛的影片點讚'}
            </p>
          </div>
          <div className="col-md-4 text-md-end mt-3 mt-md-0">
            <div className="bg-white bg-opacity-20 rounded-3 p-3 d-inline-block">
              <div className="d-flex align-items-center gap-3">
                <div>
                  <i className="bi bi-heart-fill text-danger fs-1"></i>
                </div>
                <div className="text-start">
                  <div className="small opacity-75">您的點讚數</div>
                  <div className="fs-3 fw-bold">{totalLikes}</div>
                  {config?.enable_like_limit && (
                    <div className="small opacity-75">
                      上限: {config.max_likes_per_user}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
