import React from 'react';

/**
 * ErrorMessage Component
 * Displays error messages with retry option
 */
const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="container py-5">
      <div className="alert alert-danger text-center shadow" role="alert">
        <i className="bi bi-exclamation-triangle fs-1 d-block mb-3"></i>
        <h4 className="alert-heading">發生錯誤</h4>
        <p className="mb-3">{message || '無法載入資料，請稍後再試'}</p>
        {onRetry && (
          <button 
            className="btn btn-danger"
            onClick={onRetry}
          >
            <i className="bi bi-arrow-clockwise me-2"></i>
            重新載入
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;
