import React from 'react';

/**
 * LoadingSpinner Component
 * Displays a loading spinner while data is being fetched
 */
const LoadingSpinner = () => {
  return (
    <div className="container py-5">
      <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '400px' }}>
        <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 text-muted fs-5">載入中，請稍候...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
