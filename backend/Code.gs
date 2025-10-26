/**
 * Google Apps Script Web App for Video Likes System
 * 
 * SETUP INSTRUCTIONS:
 * 1. Create a new Google Apps Script project
 * 2. Replace this code in Code.gs
 * 3. Set up your Google Sheet with columns: 
 *    名稱 | Youtube ID | Facebook ID | 網頁讚數 | Youtube讚數 | Facebook讚數 | 總讚數
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

// Column indexes (0-based)
const COL_NAME = 0;           // 名稱
const COL_YOUTUBE_ID = 1;     // Youtube ID
const COL_FACEBOOK_ID = 2;    // Facebook ID
const COL_WEB_LIKES = 3;      // 網頁讚數
const COL_YOUTUBE_LIKES = 4;  // Youtube讚數
const COL_FACEBOOK_LIKES = 5; // Facebook讚數
const COL_TOTAL_LIKES = 6;    // 總讚數

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
      
      // Skip empty rows (check Youtube ID)
      if (!row[COL_YOUTUBE_ID]) continue;
      
      const youtubeId = row[COL_YOUTUBE_ID];
      const facebookId = row[COL_FACEBOOK_ID] || '';
      
      videos.push({
        name: row[COL_NAME] || '',
        youtube_id: youtubeId,
        facebook_id: facebookId,
        web_likes: row[COL_WEB_LIKES] || 0,
        youtube_likes: row[COL_YOUTUBE_LIKES] || 0,
        facebook_likes: row[COL_FACEBOOK_LIKES] || 0,
        total_likes: row[COL_TOTAL_LIKES] || 0,
        youtube_link: `https://www.youtube.com/watch?v=${youtubeId}`,
        facebook_link: facebookId ? `https://www.facebook.com/${facebookId}` : ''
      });
    }
    
    return createResponse(true, 'Videos fetched successfully', videos);
  } catch (error) {
    return createResponse(false, 'Failed to fetch videos: ' + error.message);
  }
}

/**
 * Add a like to a specific video (updates web likes and total likes)
 */
function addLike(youtubeId) {
  try {
    if (!youtubeId) {
      return createResponse(false, 'YouTube ID is required');
    }
    
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    const data = sheet.getDataRange().getValues();
    
    // Find the video row by Youtube ID
    for (let i = 1; i < data.length; i++) {
      if (data[i][COL_YOUTUBE_ID] === youtubeId) {
        // Get current likes
        const currentWebLikes = data[i][COL_WEB_LIKES] || 0;
        const youtubeLikes = data[i][COL_YOUTUBE_LIKES] || 0;
        const facebookLikes = data[i][COL_FACEBOOK_LIKES] || 0;
        
        // Increment web likes
        const newWebLikes = currentWebLikes + 1;
        
        // Calculate new total likes
        const newTotalLikes = newWebLikes + youtubeLikes + facebookLikes;
        
        // Update the sheet (row number is i+1 because sheet is 1-indexed)
        sheet.getRange(i + 1, COL_WEB_LIKES + 1).setValue(newWebLikes);      // 網頁讚數
        sheet.getRange(i + 1, COL_TOTAL_LIKES + 1).setValue(newTotalLikes);  // 總讚數
        
        return createResponse(true, 'Like added successfully', {
          youtube_id: youtubeId,
          name: data[i][COL_NAME],
          web_likes: newWebLikes,
          youtube_likes: youtubeLikes,
          facebook_likes: facebookLikes,
          total_likes: newTotalLikes
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
  sheet.getRange(1, 1, 1, 7).setValues([
    ['名稱', 'Youtube ID', 'Facebook ID', '網頁讚數', 'Youtube讚數', 'Facebook讚數', '總讚數']
  ]);
  
  // Format headers
  const headerRange = sheet.getRange(1, 1, 1, 7);
  headerRange.setFontWeight('bold');
  headerRange.setBackground('#4285f4');
  headerRange.setFontColor('#ffffff');
  headerRange.setHorizontalAlignment('center');
  
  // Add sample data (optional)
  const sampleData = [
    ['範例影片1', 'dQw4w9WgXcQ', 'examplepage1', 0, 0, 0, 0],
    ['範例影片2', '9bZkp7q19f0', 'examplepage2', 0, 0, 0, 0]
  ];
  
  sheet.getRange(2, 1, sampleData.length, 7).setValues(sampleData);
  
  // Set column widths
  sheet.setColumnWidth(1, 150);  // 名稱
  sheet.setColumnWidth(2, 120);  // Youtube ID
  sheet.setColumnWidth(3, 120);  // Facebook ID
  sheet.setColumnWidth(4, 80);   // 網頁讚數
  sheet.setColumnWidth(5, 80);   // Youtube讚數
  sheet.setColumnWidth(6, 80);   // Facebook讚數
  sheet.setColumnWidth(7, 80);   // 總讚數
  
  // Center align like count columns
  sheet.getRange(2, 4, sheet.getLastRow() - 1, 4).setHorizontalAlignment('center');
  
  Logger.log('Sheet initialized successfully!');
}

/**
 * Reset all web likes to 0 and recalculate totals (Admin function)
 */
function resetWebLikes() {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
  const lastRow = sheet.getLastRow();
  
  if (lastRow > 1) {
    for (let i = 2; i <= lastRow; i++) {
      // Reset web likes to 0
      sheet.getRange(i, COL_WEB_LIKES + 1).setValue(0);
      
      // Recalculate total likes (Youtube + Facebook only)
      const youtubeLikes = sheet.getRange(i, COL_YOUTUBE_LIKES + 1).getValue() || 0;
      const facebookLikes = sheet.getRange(i, COL_FACEBOOK_LIKES + 1).getValue() || 0;
      const newTotal = youtubeLikes + facebookLikes;
      
      sheet.getRange(i, COL_TOTAL_LIKES + 1).setValue(newTotal);
    }
    Logger.log('All web likes reset to 0 and totals recalculated');
  }
}

/**
 * Recalculate all total likes based on individual like counts (Admin function)
 */
function recalculateTotalLikes() {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
  const lastRow = sheet.getLastRow();
  
  if (lastRow > 1) {
    for (let i = 2; i <= lastRow; i++) {
      const webLikes = sheet.getRange(i, COL_WEB_LIKES + 1).getValue() || 0;
      const youtubeLikes = sheet.getRange(i, COL_YOUTUBE_LIKES + 1).getValue() || 0;
      const facebookLikes = sheet.getRange(i, COL_FACEBOOK_LIKES + 1).getValue() || 0;
      
      const total = webLikes + youtubeLikes + facebookLikes;
      sheet.getRange(i, COL_TOTAL_LIKES + 1).setValue(total);
    }
    Logger.log('All total likes recalculated');
  }
}
