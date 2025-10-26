import axios from 'axios';

let API_BASE_URL = '';

/**
 * Initialize API configuration from config.json
 */
export const initializeConfig = async () => {
  try {
    const response = await fetch(`${process.env.PUBLIC_URL}/config.json`);
    const config = await response.json();
    API_BASE_URL = config.api_base_url;
    return config;
  } catch (error) {
    console.error('Failed to load configuration:', error);
    throw new Error('無法載入配置檔案');
  }
};

/**
 * Fetch all video data from Google Apps Script Web App
 * @returns {Promise<Array>} Array of video objects
 */
export const fetchVideos = async () => {
  try {
    const response = await axios.get(API_BASE_URL, {
      params: {
        action: 'getVideos'
      }
    });
    
    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || '獲取影片資料失敗');
    }
  } catch (error) {
    console.error('Error fetching videos:', error);
    throw error;
  }
};

/**
 * Submit a like for a specific video
 * @param {string} youtubeId - The YouTube video ID
 * @returns {Promise<Object>} Updated like count
 */
export const submitLike = async (youtubeId) => {
  try {
    const response = await axios.post(API_BASE_URL, {
      action: 'addLike',
      youtube_id: youtubeId
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || '點讚失敗');
    }
  } catch (error) {
    console.error('Error submitting like:', error);
    throw error;
  }
};
