# 互動式影片活動平台 - 部署指南

本文檔提供完整的部署步驟，包括 Google Apps Script 後端設置和 GitHub Pages 前端部署。

---

## 📋 目錄

1. [Google Apps Script 後端設置](#google-apps-script-後端設置)
2. [前端配置](#前端配置)
3. [GitHub Pages 部署](#github-pages-部署)
4. [測試與驗證](#測試與驗證)
5. [常見問題](#常見問題)

---

## 🔧 Google Apps Script 後端設置

### 步驟 1: 建立 Google Sheet

1. 前往 [Google Sheets](https://sheets.google.com)
2. 建立新的試算表
3. 設置以下欄位結構：

| youtube_id | likes | youtube_link | facebook_link |
|------------|-------|--------------|---------------|
| dQw4w9WgXcQ | 0 | https://www.youtube.com/watch?v=dQw4w9WgXcQ | https://facebook.com/post1 |

4. 記下 Google Sheet 的 ID（URL 中的長字串）
   - 例如：`https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit`

### 步驟 2: 建立 Google Apps Script

1. 在 Google Sheet 中，點擊 **擴充功能** > **Apps Script**
2. 刪除預設代碼，貼上 `backend/Code.gs` 的內容
3. 更新配置常數：
   ```javascript
   const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID_HERE';  // 替換為您的 Sheet ID
   const SHEET_NAME = 'Sheet1';  // 替換為您的工作表名稱
   ```

### 步驟 3: 初始化 Sheet（可選）

1. 在 Apps Script 編輯器中，選擇函數 `initializeSheet`
2. 點擊 **執行**
3. 授權應用程式存取您的 Google Sheet
4. 確認 Sheet 已正確設置標題和格式

### 步驟 4: 部署 Web App

1. 點擊 **部署** > **新增部署作業**
2. 選擇類型：**網頁應用程式**
3. 設定：
   - **執行身分**：我
   - **誰可以存取**：所有人
4. 點擊 **部署**
5. **重要**：複製 Web App URL
   - 格式：`https://script.google.com/macros/s/[SCRIPT_ID]/exec`

### 步驟 5: 測試 API

使用以下方法測試您的 API：

#### 測試 GET 請求（獲取影片）
```bash
# 在瀏覽器中訪問
https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec?action=getVideos
```

預期回應：
```json
{
  "success": true,
  "message": "Videos fetched successfully",
  "data": [
    {
      "youtube_id": "dQw4w9WgXcQ",
      "likes": 0,
      "youtube_link": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      "facebook_link": "https://facebook.com/post1"
    }
  ],
  "timestamp": "2025-10-26T12:00:00.000Z"
}
```

#### 測試 POST 請求（增加讚數）
使用 Postman 或 curl：
```bash
curl -X POST https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec \
  -H "Content-Type: application/json" \
  -d '{"action":"addLike","youtube_id":"dQw4w9WgXcQ"}'
```

---

## ⚙️ 前端配置

### 步驟 1: 更新配置文件

編輯 `public/config.json`：

```json
{
  "api_base_url": "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec",
  "site_title": "互動式影片活動",
  "site_description": "觀看影片並為您最喜愛的影片點讚",
  "max_likes_per_user": 10,
  "enable_like_limit": true
}
```

**重要**：將 `YOUR_SCRIPT_ID` 替換為您的實際 Script ID

### 步驟 2: 安裝依賴

```bash
cd d:\research\icf-website
npm install
```

安裝的套件包括：
- `axios` - HTTP 請求
- `bootstrap` - UI 框架
- `tailwindcss` - 樣式工具
- `gh-pages` - GitHub Pages 部署

### 步驟 3: 本地測試

```bash
npm start
```

瀏覽器會自動開啟 `http://localhost:3000`

---

## 🚀 GitHub Pages 部署

### 步驟 1: 更新 package.json

確認 `package.json` 中的 `homepage` 欄位正確：

```json
{
  "homepage": "https://StevenLiu-42.github.io/TSICF"
}
```

格式：`https://[GitHub用戶名].github.io/[倉庫名稱]`

### 步驟 2: 建立 Git 倉庫（如果尚未建立）

```bash
cd d:\research\icf-website
git init
git add .
git commit -m "Initial commit: Interactive video event platform"
```

### 步驟 3: 連接 GitHub 遠端倉庫

```bash
git remote add origin https://github.com/StevenLiu-42/TSICF.git
git branch -M master
git push -u origin master
```

### 步驟 4: 部署到 GitHub Pages

```bash
npm run deploy
```

此命令會：
1. 執行 `npm run build` 建立生產版本
2. 將 `build` 資料夾內容推送到 `gh-pages` 分支
3. GitHub 會自動從該分支發布網站

### 步驟 5: 啟用 GitHub Pages

1. 前往 GitHub 倉庫設定
2. 點擊 **Settings** > **Pages**
3. 確認 **Source** 設為 `gh-pages` 分支
4. 網站將在幾分鐘內發布

### 步驟 6: 訪問您的網站

```
https://StevenLiu-42.github.io/TSICF
```

---

## ✅ 測試與驗證

### 功能測試清單

- [ ] 網站成功載入，顯示影片卡片
- [ ] 影片縮圖正確顯示
- [ ] 讚數正確顯示
- [ ] 點擊「點讚」按鈕後讚數增加
- [ ] 已點讚的影片顯示「已點讚」狀態
- [ ] 重新載入頁面後，已點讚狀態保持
- [ ] YouTube 和 Facebook 連結可正常開啟
- [ ] 達到點讚上限時顯示警告訊息
- [ ] 響應式設計在手機和桌面正常運作

### 除錯技巧

#### 前端除錯
1. 開啟瀏覽器開發者工具（F12）
2. 查看 Console 標籤中的錯誤訊息
3. 查看 Network 標籤確認 API 請求

#### 後端除錯
1. 在 Apps Script 編輯器中查看 **執行記錄**
2. 檢查 Google Sheet 權限設定
3. 確認 Web App 部署為「所有人可存取」

---

## 🐛 常見問題

### Q1: API 請求失敗，顯示 CORS 錯誤

**解決方案**：
- Google Apps Script Web App 應該已經處理 CORS
- 確認 Web App 設定為「所有人可存取」
- 重新部署 Web App 並使用新的 URL

### Q2: 影片縮圖無法顯示

**解決方案**：
- 確認 YouTube ID 正確
- 某些影片可能禁用縮圖嵌入
- 程式碼已包含降級處理（從 maxresdefault 降級到 hqdefault）

### Q3: 讚數更新後沒有立即反映在畫面上

**解決方案**：
- 檢查 `onLikeUpdate` 回調是否正確執行
- 確認 React state 正確更新
- 清除 localStorage 並重試

### Q4: GitHub Pages 顯示 404 錯誤

**解決方案**：
- 確認 `package.json` 中的 `homepage` 正確
- 確認已執行 `npm run deploy`
- 等待 5-10 分鐘讓 GitHub Pages 生效
- 檢查倉庫設定中的 GitHub Pages 配置

### Q5: 本地運行正常，但部署後無法載入 config.json

**解決方案**：
- 確認 `public/config.json` 已包含在版本控制中
- 檢查 `process.env.PUBLIC_URL` 路徑
- 使用相對路徑：`/config.json` 或 `./config.json`

### Q6: localStorage 在某些瀏覽器中無法使用

**解決方案**：
- 檢查瀏覽器是否啟用 Cookie 和本地儲存
- 使用無痕/隱私模式可能會限制 localStorage
- 程式碼已包含 try-catch 錯誤處理

---

## 🔄 更新和維護

### 更新前端代碼

```bash
# 修改代碼後
git add .
git commit -m "Update: description of changes"
git push origin master

# 重新部署到 GitHub Pages
npm run deploy
```

### 更新後端代碼

1. 修改 Apps Script 代碼
2. 儲存變更
3. 點擊 **部署** > **管理部署作業**
4. 點擊編輯圖示（鉛筆）
5. 選擇 **新版本**
6. 點擊 **部署**

### 更新配置

只需修改 `public/config.json`，無需重新部署 Apps Script

---

## 📞 技術支援

如遇到問題，請檢查：

1. **瀏覽器控制台**：查看 JavaScript 錯誤
2. **Network 標籤**：檢查 API 請求和回應
3. **Apps Script 執行記錄**：查看後端錯誤
4. **GitHub Actions**：檢查部署狀態

---

## 🎉 部署完成！

您的互動式影片活動平台現已成功部署並可以使用。享受您的專案！

如需進一步客製化或功能擴展，請參考：
- [React 官方文檔](https://react.dev/)
- [Google Apps Script 文檔](https://developers.google.com/apps-script)
- [GitHub Pages 文檔](https://docs.github.com/pages)
