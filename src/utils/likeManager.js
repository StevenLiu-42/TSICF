/**
 * Manages like state using localStorage to prevent duplicate likes
 */

const STORAGE_KEY = 'video_likes';

/**
 * Get all liked video IDs from localStorage
 * @returns {Array<string>} Array of liked video IDs
 */
export const getLikedVideos = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading liked videos:', error);
    return [];
  }
};

/**
 * Check if a video has been liked
 * @param {string} youtubeId - The YouTube video ID
 * @returns {boolean} True if video has been liked
 */
export const hasLiked = (youtubeId) => {
  const likedVideos = getLikedVideos();
  return likedVideos.includes(youtubeId);
};

/**
 * Add a video to liked list
 * @param {string} youtubeId - The YouTube video ID
 * @returns {boolean} True if successfully added
 */
export const addLike = (youtubeId) => {
  try {
    const likedVideos = getLikedVideos();
    if (!likedVideos.includes(youtubeId)) {
      likedVideos.push(youtubeId);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(likedVideos));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error adding like:', error);
    return false;
  }
};

/**
 * Get total number of likes given by user
 * @returns {number} Total like count
 */
export const getTotalLikes = () => {
  return getLikedVideos().length;
};

/**
 * Clear all likes (for testing or reset)
 */
export const clearAllLikes = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing likes:', error);
    return false;
  }
};
