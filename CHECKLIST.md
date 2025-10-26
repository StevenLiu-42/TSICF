# 🎯 部署檢查清單
# Deployment Checklist

## 📋 前置準備 (Prerequisites)
- [ ] Node.js 已安裝 (執行 `node --version` 確認)
- [ ] npm 已安裝 (執行 `npm --version` 確認)
- [ ] Git 已安裝 (執行 `git --version` 確認)
- [ ] 擁有 Google 帳號
- [ ] 擁有 GitHub 帳號

## 📦 步驟 1: 安裝依賴
- [ ] 開啟命令提示字元 (cmd) 或 PowerShell
- [ ] 執行: `cd d:\research\icf-website`
- [ ] 執行: `npm install`
- [ ] 確認沒有錯誤訊息
- [ ] 檢查 `node_modules` 資料夾已建立

## 🔧 步驟 2: 設置 Google Apps Script
- [ ] 前往 https://sheets.google.com
- [ ] 建立新的 Google Sheet
- [ ] 將 Sheet 命名為 "Video Event Data"
- [ ] 在第一列建立欄位標題:
  - A1: youtube_id
  - B1: likes
  - C1: youtube_link
  - D1: facebook_link
- [ ] 新增至少一筆測試資料:
  - A2: dQw4w9WgXcQ
  - B2: 0
  - C2: https://www.youtube.com/watch?v=dQw4w9WgXcQ
  - D2: https://facebook.com/example
- [ ] 從 URL 複製 Sheet ID (格式: docs.google.com/spreadsheets/d/[SHEET_ID]/edit)
- [ ] 在 Google Sheet 中點擊: 擴充功能 > Apps Script
- [ ] 開啟檔案 `d:\research\icf-website\backend\Code.gs`
- [ ] 複製所有內容
- [ ] 貼到 Apps Script 編輯器（取代現有代碼）
- [ ] 更新第 14 行: `const SHEET_ID = 'YOUR_SHEET_ID'` → 填入您的 Sheet ID
- [ ] 更新第 15 行: `const SHEET_NAME = 'Sheet1'` → 確認工作表名稱
- [ ] 儲存專案 (Ctrl+S)
- [ ] 點擊「部署」> 「新增部署作業」
- [ ] 選擇類型: 網頁應用程式
- [ ] 執行身分: 我
- [ ] 誰可以存取: 所有人
- [ ] 點擊「部署」
- [ ] 授權應用程式（如需要）
- [ ] 複製 Web App URL (格式: https://script.google.com/macros/s/.../exec)
- [ ] 儲存此 URL！您稍後會用到

## 🧪 步驟 3: 測試 API
- [ ] 在瀏覽器開啟: [您的Web App URL]?action=getVideos
- [ ] 確認看到 JSON 格式的回應
- [ ] 回應中應包含: success: true
- [ ] 回應中應包含您的影片資料

## ⚙️ 步驟 4: 配置前端
- [ ] 開啟檔案: `d:\research\icf-website\public\config.json`
- [ ] 找到 "api_base_url" 欄位
- [ ] 將 "https://script.google.com/macros/s/your-script-id/exec" 替換為您的 Web App URL
- [ ] 儲存檔案
- [ ] (選用) 自訂 site_title 和 site_description

## 🖥️ 步驟 5: 本地測試
- [ ] 在命令列執行: `npm start`
- [ ] 等待瀏覽器自動開啟 http://localhost:3000
- [ ] 確認頁面成功載入
- [ ] 確認看到影片卡片
- [ ] 確認影片縮圖正確顯示
- [ ] 確認讚數顯示正確 (應該是 0)
- [ ] 點擊「點讚」按鈕
- [ ] 確認讚數增加到 1
- [ ] 確認按鈕變成「已點讚」狀態
- [ ] 重新整理頁面
- [ ] 確認按鈕仍然顯示「已點讚」
- [ ] 檢查 Google Sheet，確認讚數已更新
- [ ] 點擊 YouTube 連結，確認正確開啟影片
- [ ] 點擊 Facebook 連結（如有）
- [ ] 在手機模擬器中測試響應式設計 (F12 > 切換裝置工具列)
- [ ] 確認沒有控制台錯誤 (F12 > Console)
- [ ] 關閉開發服務器 (Ctrl+C)

## 📝 步驟 6: 準備 Git
- [ ] 開啟檔案: `d:\research\icf-website\package.json`
- [ ] 找到 "homepage" 欄位
- [ ] 確認格式為: "https://[您的GitHub用戶名].github.io/TSICF"
- [ ] 將 [您的GitHub用戶名] 替換為實際用戶名
- [ ] 儲存檔案
- [ ] 在命令列執行: `git init`
- [ ] 執行: `git add .`
- [ ] 執行: `git commit -m "Initial commit: Interactive Video Event Platform"`
- [ ] 確認提交成功

## 🌐 步驟 7: 建立 GitHub 倉庫
- [ ] 前往 https://github.com
- [ ] 登入您的帳號
- [ ] 點擊右上角 "+" > "New repository"
- [ ] Repository name: TSICF
- [ ] 設為 Public
- [ ] 不要勾選 "Initialize this repository with a README"
- [ ] 點擊 "Create repository"
- [ ] 複製倉庫 URL (格式: https://github.com/[用戶名]/TSICF.git)

## 🚀 步驟 8: 推送到 GitHub
- [ ] 在命令列執行: `git remote add origin [您的倉庫URL]`
- [ ] 執行: `git branch -M master`
- [ ] 執行: `git push -u origin master`
- [ ] 輸入 GitHub 認證資訊（如需要）
- [ ] 確認推送成功
- [ ] 重新整理 GitHub 頁面，確認檔案已上傳

## 🎉 步驟 9: 部署到 GitHub Pages
- [ ] 在命令列執行: `npm run build`
- [ ] 確認建立成功（build 資料夾已建立）
- [ ] 執行: `npm run deploy`
- [ ] 等待部署完成（可能需要 1-2 分鐘）
- [ ] 確認看到 "Published" 訊息
- [ ] 前往 GitHub 倉庫頁面
- [ ] 點擊 Settings > Pages
- [ ] 確認 Source 設為 "gh-pages" 分支
- [ ] 複製網站 URL

## ✅ 步驟 10: 驗證部署
- [ ] 等待 5-10 分鐘（GitHub Pages 需要時間發布）
- [ ] 在瀏覽器開啟您的網站 URL
- [ ] 確認頁面成功載入
- [ ] 測試所有功能（如步驟 5）
- [ ] 在不同裝置上測試（手機、平板）
- [ ] 測試不同瀏覽器（Chrome、Firefox、Safari）
- [ ] 清除瀏覽器快取後再次測試

## 📱 步驟 11: 分享和使用
- [ ] 複製您的網站 URL
- [ ] 分享給朋友或團隊
- [ ] 新增更多影片到 Google Sheet
- [ ] 監控使用狀況
- [ ] 收集用戶反饋

## 🔄 未來更新流程
當您需要更新網站時:
- [ ] 修改代碼
- [ ] 本地測試: `npm start`
- [ ] 提交變更: `git add . && git commit -m "Update: 描述"`
- [ ] 推送: `git push origin master`
- [ ] 重新部署: `npm run deploy`

## 🐛 故障排除
如遇到問題，檢查:
- [ ] QUICK_REFERENCE.txt - 快速參考
- [ ] SETUP.md - 設置指南
- [ ] DEPLOYMENT.md - 詳細部署說明
- [ ] 瀏覽器開發者工具 (F12) - Console 標籤
- [ ] Google Apps Script 執行記錄
- [ ] GitHub Actions (如有錯誤)

## 🎊 完成！
- [ ] 網站已上線並正常運作
- [ ] 所有功能都已測試
- [ ] 已分享給目標用戶
- [ ] 已建立備份

═══════════════════════════════════════════════════════════════════
祝賀您完成部署！🎉
網站 URL: https://[您的用戶名].github.io/TSICF
═══════════════════════════════════════════════════════════════════

需要幫助？
• 快速參考: QUICK_REFERENCE.txt
• 詳細指南: SETUP.md
• 完整文檔: DEPLOYMENT.md

記得定期備份您的 Google Sheet！
