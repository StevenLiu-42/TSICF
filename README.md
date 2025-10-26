# 互動式影片活動平台

一個基於 React.js 和 Google Apps Script 的互動式影片展示平台，支援影片卡片展示、點讚功能和社交媒體連結。

## ✨ 功能特色

- 📹 **YouTube 影片展示**：以卡片形式展示影片縮圖
- 👍 **即時點讚系統**：使用者可為喜愛的影片點讚
- 🔒 **防重複點讚**：使用 localStorage 追蹤點讚狀態
- 🎨 **響應式設計**：支援桌面和移動設備
- 🔗 **社交媒體連結**：整合 YouTube 和 Facebook 連結
- ⚡ **快速載入**：使用 Google Apps Script 作為輕量級後端
- 🛡️ **安全性**：前端不暴露任何敏感資訊

## 🏗️ 技術架構

### 前端
- **React.js 19.2.0** - UI 框架
- **Bootstrap 5.3** - UI 組件庫
- **Tailwind CSS 3.3** - 實用優先的 CSS 框架
- **Axios** - HTTP 請求處理
- **localStorage** - 客戶端狀態管理

### 後端
- **Google Apps Script** - 無伺服器後端
- **Google Sheets** - 資料儲存

### 部署
- **GitHub Pages** - 靜態網站託管
- **gh-pages** - 自動化部署工具

## 📁 專案結構

```
icf-website/
├── public/
│   ├── config.json          # 應用程式配置檔案
│   ├── index.html           # HTML 模板
│   ├── manifest.json        # PWA 配置
│   └── robots.txt          # SEO 設定
├── src/
│   ├── components/
│   │   ├── Header.js        # 頁面標頭組件
│   │   ├── VideoCard.js     # 影片卡片組件
│   │   ├── VideoGrid.js     # 影片網格布局
│   │   ├── LoadingSpinner.js # 載入動畫
│   │   └── ErrorMessage.js  # 錯誤提示
│   ├── services/
│   │   └── api.js          # API 服務層
│   ├── utils/
│   │   └── likeManager.js  # 點讚狀態管理
│   ├── App.js              # 主應用組件
│   ├── App.css             # 全域樣式
│   ├── index.js            # 應用入口
│   └── index.css           # Tailwind 導入
├── backend/
│   └── Code.gs             # Google Apps Script 後端代碼
├── package.json            # 專案依賴
├── tailwind.config.js      # Tailwind 配置
├── DEPLOYMENT.md           # 部署指南
└── README.md              # 專案說明
```

## 🚀 快速開始

### 前置需求

- Node.js (v14 或更高版本)
- npm 或 yarn
- Git
- Google 帳號（用於 Apps Script 和 Sheets）
- GitHub 帳號（用於部署）

### 安裝步驟

1. **複製專案**
   ```bash
   git clone https://github.com/StevenLiu-42/TSICF.git
   cd TSICF
   ```

2. **安裝依賴**
   ```bash
   npm install
   ```

3. **設定後端（詳見 DEPLOYMENT.md）**
   - 建立 Google Sheet
   - 部署 Google Apps Script
   - 取得 Web App URL

4. **更新配置**
   
   編輯 `public/config.json`：
   ```json
   {
     "api_base_url": "YOUR_GOOGLE_APPS_SCRIPT_URL",
     "site_title": "互動式影片活動",
     "site_description": "觀看影片並為您最喜愛的影片點讚",
     "max_likes_per_user": 10,
     "enable_like_limit": true
   }
   ```

5. **本地運行**
   ```bash
   npm start
   ```
   
   開啟瀏覽器訪問 `http://localhost:3000`

## 📦 部署到 GitHub Pages

1. **更新 package.json**
   ```json
   {
     "homepage": "https://YOUR_USERNAME.github.io/YOUR_REPO_NAME"
   }
   ```

2. **執行部署**
   ```bash
   npm run deploy
   ```

3. **訪問網站**
   ```
   https://YOUR_USERNAME.github.io/YOUR_REPO_NAME
   ```

詳細部署步驟請參考 [DEPLOYMENT.md](./DEPLOYMENT.md)

## 🔧 配置選項

### config.json 參數說明

| 參數 | 類型 | 說明 | 預設值 |
|------|------|------|--------|
| `api_base_url` | string | Google Apps Script Web App URL | 必填 |
| `site_title` | string | 網站標題 | "互動式影片活動" |
| `site_description` | string | 網站描述 | - |
| `max_likes_per_user` | number | 每位使用者最多點讚數 | 10 |
| `enable_like_limit` | boolean | 是否啟用點讚上限 | true |

## 📊 Google Sheet 結構

| 欄位 | 說明 | 範例 |
|------|------|------|
| youtube_id | YouTube 影片 ID | dQw4w9WgXcQ |
| likes | 讚數 | 0 |
| youtube_link | YouTube 連結 | https://www.youtube.com/watch?v=... |
| facebook_link | Facebook 貼文連結 | https://facebook.com/... |

## 🔌 API 端點

### GET - 獲取影片列表
```
GET {api_base_url}?action=getVideos
```

**回應範例：**
```json
{
  "success": true,
  "message": "Videos fetched successfully",
  "data": [
    {
      "youtube_id": "dQw4w9WgXcQ",
      "likes": 5,
      "youtube_link": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      "facebook_link": "https://facebook.com/post1"
    }
  ],
  "timestamp": "2025-10-26T12:00:00.000Z"
}
```

### POST - 增加讚數
```
POST {api_base_url}
Content-Type: application/json

{
  "action": "addLike",
  "youtube_id": "dQw4w9WgXcQ"
}
```

## 📝 可用指令

### `npm start`

在開發模式下運行應用程式。
開啟 [http://localhost:3000](http://localhost:3000) 在瀏覽器中查看。

### `npm test`

啟動測試執行器。

### `npm run build`

建立生產環境的應用程式到 `build` 資料夾。

### `npm run deploy`

部署應用程式到 GitHub Pages。

## 🤝 貢獻指南

歡迎提交 Pull Request 或建立 Issue！

1. Fork 專案
2. 建立功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交變更 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 開啟 Pull Request

## 📝 授權

本專案採用 MIT 授權

## 📧 聯絡方式

如有問題或建議，請透過 GitHub Issues 聯絡。

---

**⭐ 如果這個專案對您有幫助，請給個星星！**

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
