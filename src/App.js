import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import VideoGrid from './components/VideoGrid';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { initializeConfig, fetchVideos } from './services/api';

/**
 * Main App Component
 * Manages application state and coordinates data flow
 */
function App() {
  const [config, setConfig] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Initialize app: Load config and fetch videos
   */
  const initializeApp = async () => {
    setLoading(true);
    setError(null);

    try {
      // Step 1: Load configuration from JSON
      const appConfig = await initializeConfig();
      setConfig(appConfig);

      // Step 2: Fetch videos from Google Apps Script
      const videoData = await fetchVideos();
      setVideos(videoData);
    } catch (err) {
      console.error('Initialization error:', err);
      setError(err.message || '初始化失敗');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle like updates from VideoCard components
   */
  const handleLikeUpdate = (youtubeId, newWebLikes, newTotalLikes) => {
    setVideos(prevVideos =>
      prevVideos.map(video =>
        video.youtube_id === youtubeId
          ? { ...video, web_likes: newWebLikes, total_likes: newTotalLikes }
          : video
      )
    );
  };

  // Initialize on component mount
  useEffect(() => {
    initializeApp();
  }, []);

  return (
    <div className="App min-vh-100 bg-light">
      {/* Header Section */}
      {config && <Header config={config} />}

      {/* Main Content */}
      <main>
        {loading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} onRetry={initializeApp} />}
        {!loading && !error && (
          <VideoGrid 
            videos={videos} 
            config={config}
            onLikeUpdate={handleLikeUpdate}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-4 mt-5">
        <div className="container">
          <p className="mb-0">© 2025 互動式影片活動平台</p>
          <p className="small text-muted mb-0">Powered by React.js & Google Apps Script</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
