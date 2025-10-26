# 📊 Google Sheet 結構更新摘要

## ✅ 已更新的內容

### 1. 後端代碼 (backend/Code.gs)

**新增的欄位常數：**
```javascript
const COL_NAME = 0;           // 名稱
const COL_YOUTUBE_ID = 1;     // Youtube ID
const COL_FACEBOOK_ID = 2;    // Facebook ID
const COL_WEB_LIKES = 3;      // 網頁讚數
const COL_YOUTUBE_LIKES = 4;  // Youtube讚數
const COL_FACEBOOK_LIKES = 5; // Facebook讚數
const COL_TOTAL_LIKES = 6;    // 總讚數
```

**更新的功能：**
- ✅ `getVideos()` - 現在回傳完整的影片資訊，包含所有讚數
- ✅ `addLike()` - 增加網頁讚數並自動重新計算總讚數
- ✅ `initializeSheet()` - 建立新的 7 欄位結構
- ✅ `resetWebLikes()` - 重置網頁讚數
- ✅ `recalculateTotalLikes()` - 重新計算所有總讚數

### 2. 前端組件 (src/components/VideoCard.js)

**新增的顯示功能：**
- ✅ 顯示影片名稱（在縮圖底部）
- ✅ 顯示總讚數（右上角徽章）
- ✅ 顯示詳細讚數統計（網頁、YouTube、Facebook）
- ✅ 進度條顯示網頁讚數比例
- ✅ 條件顯示 YouTube 和 Facebook 讚數（只在 > 0 時）

**狀態管理更新：**
```javascript
const [webLikes, setWebLikes] = useState(video.web_likes || 0);
const [totalLikes, setTotalLikes] = useState(video.total_likes || 0);
```

### 3. API 回應格式

**新的回應結構：**
```json
{
  "success": true,
  "message": "Videos fetched successfully",
  "data": [
    {
      "name": "範例影片1",
      "youtube_id": "dQw4w9WgXcQ",
      "facebook_id": "examplepage1",
      "web_likes": 0,
      "youtube_likes": 0,
      "facebook_likes": 0,
      "total_likes": 0,
      "youtube_link": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      "facebook_link": "https://www.facebook.com/examplepage1"
    }
  ]
}
```

**點讚回應：**
```json
{
  "success": true,
  "message": "Like added successfully",
  "data": {
    "youtube_id": "dQw4w9WgXcQ",
    "name": "範例影片1",
    "web_likes": 1,
    "youtube_likes": 0,
    "facebook_likes": 0,
    "total_likes": 1
  }
}
```

## 🎨 UI 改進

### 影片卡片新功能

1. **影片名稱顯示**
   - 在縮圖底部顯示半透明黑色背景
   - 白色文字，易於閱讀

2. **詳細讚數統計**
   ```
   👍 網頁: 50    🎥 YouTube: 80    📱 Facebook: 20
   ▓▓▓▓▓░░░░░░░░░ (進度條顯示網頁讚數比例)
   ```

3. **智能顯示**
   - YouTube 讚數為 0 時不顯示
   - Facebook 讚數為 0 時不顯示
   - 只顯示有意義的數據

4. **視覺改進**
   - 使用 Bootstrap Icons
   - 彩色圖標（YouTube 紅色、Facebook 藍色）
   - 進度條視覺化比例

## 📋 Google Sheet 設置步驟

### 快速設置（推薦）

1. 開啟 Google Apps Script 編輯器
2. 貼上更新後的 `backend/Code.gs` 代碼
3. 更新 `SHEET_ID` 和 `SHEET_NAME`
4. 執行 `initializeSheet()` 函數
5. Sheet 自動建立完整結構

### 手動設置

在第一列輸入以下標題：
```
A1: 名稱
B1: Youtube ID
C1: Facebook ID
D1: 網頁讚數
E1: Youtube讚數
F1: Facebook讚數
G1: 總讚數
```

然後從第二列開始輸入資料。

## 🔄 資料流程

### 用戶點讚流程

```
1. 用戶點擊「點讚」按鈕
   ↓
2. 前端發送 POST 請求到 Apps Script
   ↓
3. Apps Script 執行：
   - 找到對應影片（by Youtube ID）
   - 網頁讚數 +1
   - 重新計算：總讚數 = 網頁讚數 + Youtube讚數 + Facebook讚數
   - 更新 Sheet 的 D 欄和 G 欄
   ↓
4. 回傳更新後的所有讚數
   ↓
5. 前端更新顯示：
   - 更新網頁讚數
   - 更新總讚數
   - 更新進度條
   - 儲存到 localStorage
```

### 手動更新 YouTube/Facebook 讚數

```
1. 管理員手動更新 Sheet 的 E 欄或 F 欄
   ↓
2. 選項 A：等待下次用戶點讚時自動重算總讚數
   或
   選項 B：執行 recalculateTotalLikes() 函數立即重算
```

## 🎯 關鍵特性

### 1. 自動計算總讚數
- 每次網頁點讚都會重新計算
- 確保總數始終正確
- 公式：`總讚數 = 網頁讚數 + Youtube讚數 + Facebook讚數`

### 2. 靈活的社交媒體讚數
- YouTube 和 Facebook 讚數可以手動更新
- 反映真實的社交媒體互動
- 提供完整的讚數統計

### 3. 清晰的資料分類
- 區分不同來源的讚數
- 用戶可以看到每個平台的貢獻
- 進度條顯示網頁讚數的比重

## 📦 檔案更新清單

✅ `backend/Code.gs` - 完全重寫以支援新結構
✅ `src/components/VideoCard.js` - 新增讚數統計顯示
✅ `src/App.js` - 更新讚數更新處理
✅ `GOOGLE_SHEET_GUIDE.md` - 新增完整的 Sheet 設置指南
✅ `SHEET_STRUCTURE_UPDATE.md` - 本文件（更新摘要）

## 🚀 部署步驟

### 如果這是新專案：
按照原有的 `SETUP.md` 步驟，但使用新的 Sheet 結構。

### 如果要更新現有專案：

1. **備份現有 Google Sheet**
   ```
   檔案 > 建立副本
   ```

2. **更新 Apps Script**
   - 複製新的 `backend/Code.gs`
   - 貼到 Apps Script 編輯器
   - 儲存

3. **選擇更新方式：**

   **方式 A：建立新 Sheet（推薦）**
   ```
   1. 建立新的工作表
   2. 執行 initializeSheet()
   3. 手動複製舊資料到新結構
   4. 更新 SHEET_NAME 常數
   ```

   **方式 B：修改現有 Sheet**
   ```
   1. 在 Sheet 中插入新欄位
   2. 重新命名欄位標題
   3. 填入初始值 0
   4. 執行 recalculateTotalLikes()
   ```

4. **測試**
   ```
   1. 測試 API：訪問 Web App URL + ?action=getVideos
   2. 確認回傳新的資料結構
   3. 在前端測試點讚功能
   ```

5. **部署前端**
   ```
   npm start        # 本地測試
   npm run deploy   # 部署到 GitHub Pages
   ```

## ⚠️ 重要提醒

1. **保持欄位順序**
   - 欄位順序必須與 Code.gs 中的常數對應
   - 不要隨意調整欄位位置

2. **數據類型**
   - 所有讚數欄位必須是數字
   - Youtube ID 必須是文字

3. **自動計算**
   - 總讚數會自動計算，不要手動編輯
   - 網頁讚數只能通過 API 更新

4. **向後兼容**
   - 新結構不相容舊的 API
   - 需要同時更新前端和後端

## 🆘 疑難排解

**Q: 舊的 Sheet 結構還能用嗎？**  
A: 不能，必須更新到新結構才能正常運作。

**Q: 如何遷移舊資料？**  
A: 
1. 執行 `initializeSheet()` 建立新結構
2. 手動複製 Youtube ID 到新的 B 欄
3. 舊的讚數可以填入 D 欄（網頁讚數）
4. 執行 `recalculateTotalLikes()`

**Q: 總讚數不正確？**  
A: 執行 `recalculateTotalLikes()` 重新計算。

**Q: 前端顯示錯誤？**  
A: 確認 API 回傳的資料包含所有必要欄位。

## 📚 相關文檔

- `GOOGLE_SHEET_GUIDE.md` - 詳細的 Sheet 設置指南
- `SETUP.md` - 快速設置指南
- `DEPLOYMENT.md` - 完整部署文檔
- `backend/Code.gs` - 後端代碼（包含註解）

---

**更新完成！現在您的平台支援更豐富的讚數統計功能。** 🎉
