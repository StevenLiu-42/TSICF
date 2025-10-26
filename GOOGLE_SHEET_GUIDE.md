# Google Sheet 結構說明

## 📊 欄位定義

您的 Google Sheet 應該包含以下 7 個欄位：

| 欄位編號 | 欄位名稱 | 說明 | 範例 |
|---------|---------|------|------|
| A | 名稱 | 影片或參賽者名稱 | 範例影片1 |
| B | Youtube ID | YouTube 影片 ID | dQw4w9WgXcQ |
| C | Facebook ID | Facebook 貼文 ID 或頁面名稱 | examplepage |
| D | 網頁讚數 | 從網頁來的讚數（自動更新） | 0 |
| E | Youtube讚數 | YouTube 的讚數（手動填入） | 0 |
| F | Facebook讚數 | Facebook 的讚數（手動填入） | 0 |
| G | 總讚數 | 所有讚數的總和（自動計算） | 0 |

## 📝 範例資料

```
名稱          | Youtube ID    | Facebook ID  | 網頁讚數 | Youtube讚數 | Facebook讚數 | 總讚數
-------------|---------------|--------------|----------|-------------|-------------|--------
範例影片1     | dQw4w9WgXcQ   | examplepage1 | 0        | 0           | 0           | 0
範例影片2     | 9bZkp7q19f0   | examplepage2 | 0        | 0           | 0           | 0
我的參賽作品  | jNQXAC9IVRw   | mypage       | 0        | 0           | 0           | 0
```

## 🔧 如何設置

### 方法 1: 手動建立

1. 在第一列（標題列）輸入欄位名稱：
   - A1: `名稱`
   - B1: `Youtube ID`
   - C1: `Facebook ID`
   - D1: `網頁讚數`
   - E1: `Youtube讚數`
   - F1: `Facebook讚數`
   - G1: `總讚數`

2. 從第二列開始輸入資料

### 方法 2: 使用 Apps Script 初始化

1. 在 Google Sheet 中：擴充功能 > Apps Script
2. 找到 `initializeSheet()` 函數
3. 點擊「執行」
4. 授權應用程式
5. Sheet 將自動建立標題和範例資料

## 📌 重要說明

### 自動更新的欄位

- **網頁讚數（D欄）**：當用戶在網頁上點讚時自動增加
- **總讚數（G欄）**：自動計算 = 網頁讚數 + Youtube讚數 + Facebook讚數

### 手動更新的欄位

- **Youtube讚數（E欄）**：需要手動從 YouTube 獲取並填入
- **Facebook讚數（F欄）**：需要手動從 Facebook 獲取並填入

## 🎯 YouTube ID 如何取得

從 YouTube 影片網址中取得 ID：

**範例網址：**
```
https://www.youtube.com/watch?v=dQw4w9WgXcQ
                                 ^^^^^^^^^^^
                                 這是 YouTube ID
```

**短網址格式：**
```
https://youtu.be/dQw4w9WgXcQ
                 ^^^^^^^^^^^
                 這是 YouTube ID
```

## 🔗 Facebook ID 說明

Facebook ID 可以是：
1. **貼文 ID**：例如 `123456789012345`
2. **頁面名稱**：例如 `YourPageName`
3. **自訂網址**：例如 `custom.page.url`

系統會自動生成 Facebook 連結：`https://www.facebook.com/{Facebook ID}`

## 🔄 資料更新流程

### 當用戶在網頁點讚：

1. 前端發送請求到 Google Apps Script
2. Apps Script 找到對應的影片列
3. **網頁讚數** +1
4. 重新計算 **總讚數** = 網頁讚數 + Youtube讚數 + Facebook讚數
5. 更新 Sheet 中的資料
6. 回傳新的讚數給前端

### 手動更新 YouTube/Facebook 讚數：

1. 從 YouTube/Facebook 查看實際讚數
2. 在 Sheet 中手動更新對應欄位
3. 執行 `recalculateTotalLikes()` 函數（或等待下次網頁讚數更新時自動重算）

## 🛠️ 管理函數

### 初始化 Sheet
```javascript
initializeSheet()
```
功能：建立標題和範例資料

### 重置網頁讚數
```javascript
resetWebLikes()
```
功能：
- 將所有網頁讚數重設為 0
- 重新計算總讚數（只包含 YouTube + Facebook）

### 重新計算總讚數
```javascript
recalculateTotalLikes()
```
功能：根據三個讚數欄位重新計算所有列的總讚數

## 📊 在網頁上的顯示

### 影片卡片會顯示：

1. **右上角徽章**：總讚數（所有來源）
2. **統計列**：
   - 網頁讚數（藍色）
   - YouTube 讚數（紅色，如果 > 0）
   - Facebook 讚數（藍色，如果 > 0）
3. **進度條**：網頁讚數在總讚數中的比例

### 範例顯示：

```
┌─────────────────────────┐
│   [影片縮圖]      ❤️ 150│ ← 總讚數
│                         │
│   範例影片1              │
├─────────────────────────┤
│ 👍 網頁: 50              │
│ 🎥 YouTube: 80           │
│ 📱 Facebook: 20          │
│ ▓▓▓▓▓░░░░░ 33%         │ ← 網頁讚數比例
│                         │
│ [點讚] [YouTube] [FB]   │
└─────────────────────────┘
```

## ⚠️ 注意事項

1. **不要刪除標題列**：第一列必須保留
2. **保持欄位順序**：欄位順序不能改變
3. **YouTube ID 必填**：每一列都必須有 YouTube ID
4. **數字格式**：讚數欄位應該是數字，不要加文字
5. **Facebook ID 選填**：如果沒有 Facebook 連結可以留空
6. **自動計算**：總讚數會自動計算，不需手動填入

## 🔍 檢查清單

設置完成後，請檢查：

- [ ] 第一列有正確的欄位標題（中文）
- [ ] 至少有一列測試資料
- [ ] YouTube ID 格式正確（11 個字元）
- [ ] 所有讚數欄位都是數字 0
- [ ] 總讚數 = 網頁讚數 + Youtube讚數 + Facebook讚數
- [ ] Apps Script 的 SHEET_ID 已更新
- [ ] Apps Script 的 SHEET_NAME 正確

## 🆘 常見問題

**Q: 總讚數沒有自動更新？**  
A: 執行 Apps Script 中的 `recalculateTotalLikes()` 函數

**Q: 網頁讚數沒有增加？**  
A: 檢查 Apps Script 權限和部署設定

**Q: Facebook 連結無法開啟？**  
A: 確認 Facebook ID 格式正確

**Q: 影片縮圖顯示錯誤？**  
A: 確認 YouTube ID 正確，某些影片可能限制嵌入

---

## 📞 需要幫助？

參考完整部署指南：`DEPLOYMENT.md`
