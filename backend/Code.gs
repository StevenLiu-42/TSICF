/**
 * Google Apps Script Web App for Video Likes System
 * 
 * SETUP INSTRUCTIONS:
 * 1. Create a new Google Apps Script project
 * 2. Replace this code in Code.gs
 * 3. Set up your Google Sheet with columns: youtube_id, likes, youtube_link, facebook_link
 * 4. Update SHEET_ID and SHEET_NAME constants below
 * 5. Deploy as Web App:
 *    - Click "Deploy" > "New deployment"
 *    - Select type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 6. Copy the Web App URL and update config.json in your React app
 */

// ==================== CONFIGURATION ====================
const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID_HERE'; // Replace with your Google Sheet ID
const SHEET_NAME = 'Sheet1'; // Replace with your sheet name

// ==================== MAIN HANDLERS ====================

/**
 * Handle GET requests - Fetch all video data
 */
function doGet(e) {
  try {
    const action = e.parameter.action;
    
    if (action === 'getVideos') {
      return getVideos();
    }
    
    return createResponse(false, 'Invalid action');
  } catch (error) {
    return createResponse(false, 'Server error: ' + error.message);
  }
}

/**
 * Handle POST requests - Add likes
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action;
    
    if (action === 'addLike') {
      return addLike(data.youtube_id);
    }
    
    return createResponse(false, 'Invalid action');
  } catch (error) {
    return createResponse(false, 'Server error: ' + error.message);
  }
}

// ==================== VIDEO OPERATIONS ====================

/**
 * Get all videos from Google Sheet
 */
function getVideos() {
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    const data = sheet.getDataRange().getValues();
    
    // Skip header row
    const videos = [];
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      
      // Skip empty rows
      if (!row[0]) continue;
      
      videos.push({
        youtube_id: row[0],
        likes: row[1] || 0,
        youtube_link: row[2] || `https://www.youtube.com/watch?v=${row[0]}`,
        facebook_link: row[3] || ''
      });
    }
    
    return createResponse(true, 'Videos fetched successfully', videos);
  } catch (error) {
    return createResponse(false, 'Failed to fetch videos: ' + error.message);
  }
}

/**
 * Add a like to a specific video
 */
function addLike(youtubeId) {
  try {
    if (!youtubeId) {
      return createResponse(false, 'YouTube ID is required');
    }
    
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    const data = sheet.getDataRange().getValues();
    
    // Find the video row
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === youtubeId) {
        const currentLikes = data[i][1] || 0;
        const newLikes = currentLikes + 1;
        
        // Update the likes count (column B, index 1)
        sheet.getRange(i + 1, 2).setValue(newLikes);
        
        return createResponse(true, 'Like added successfully', {
          youtube_id: youtubeId,
          likes: newLikes
        });
      }
    }
    
    return createResponse(false, 'Video not found');
  } catch (error) {
    return createResponse(false, 'Failed to add like: ' + error.message);
  }
}

// ==================== HELPER FUNCTIONS ====================

/**
 * Create standardized JSON response
 */
function createResponse(success, message, data = null) {
  const response = {
    success: success,
    message: message,
    timestamp: new Date().toISOString()
  };
  
  if (data !== null) {
    response.data = data;
  }
  
  return ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}

// ==================== ADMIN FUNCTIONS ====================

/**
 * Initialize the Google Sheet with sample data (Run this once)
 */
function initializeSheet() {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
  
  // Set headers
  sheet.getRange(1, 1, 1, 4).setValues([
    ['youtube_id', 'likes', 'youtube_link', 'facebook_link']
  ]);
  
  // Format headers
  const headerRange = sheet.getRange(1, 1, 1, 4);
  headerRange.setFontWeight('bold');
  headerRange.setBackground('#4285f4');
  headerRange.setFontColor('#ffffff');
  
  // Add sample data (optional)
  const sampleData = [
    ['dQw4w9WgXcQ', 0, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'https://facebook.com/example1'],
    ['9bZkp7q19f0', 0, 'https://www.youtube.com/watch?v=9bZkp7q19f0', 'https://facebook.com/example2']
  ];
  
  sheet.getRange(2, 1, sampleData.length, 4).setValues(sampleData);
  
  Logger.log('Sheet initialized successfully!');
}

/**
 * Reset all likes to 0 (Admin function)
 */
function resetAllLikes() {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
  const lastRow = sheet.getLastRow();
  
  if (lastRow > 1) {
    // Reset column B (likes) to 0
    const range = sheet.getRange(2, 2, lastRow - 1, 1);
    range.setValue(0);
    Logger.log('All likes reset to 0');
  }
}
