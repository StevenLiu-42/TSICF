# Quick Setup Guide

Follow these steps to get your Interactive Video Event Platform up and running.

## 📝 Prerequisites Checklist

- [ ] Node.js installed (v14+)
- [ ] npm installed
- [ ] Git installed
- [ ] Google Account
- [ ] GitHub Account

## ⚡ Quick Setup (5 minutes)

### Step 1: Install Dependencies

```bash
npm install
```

This will install:
- axios (API requests)
- bootstrap (UI framework)
- tailwindcss (styling)
- gh-pages (deployment)
- react and react-dom (already installed)

### Step 2: Setup Google Backend

#### 2.1 Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create new spreadsheet named "Video Event Data"
3. Add these columns in row 1:

```
youtube_id | likes | youtube_link | facebook_link
```

4. Add sample data:

```
dQw4w9WgXcQ | 0 | https://www.youtube.com/watch?v=dQw4w9WgXcQ | https://facebook.com/post1
```

5. Copy the Sheet ID from URL:
   - URL: `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`

#### 2.2 Setup Google Apps Script

1. In your Google Sheet: **Extensions** > **Apps Script**
2. Copy content from `backend/Code.gs`
3. Update these lines:
   ```javascript
   const SHEET_ID = 'YOUR_SHEET_ID_HERE';
   const SHEET_NAME = 'Sheet1';
   ```
4. Save project (Ctrl+S)

#### 2.3 Deploy Web App

1. Click **Deploy** > **New deployment**
2. Select type: **Web app**
3. Settings:
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Click **Deploy**
5. **COPY THE WEB APP URL** (you'll need this!)
6. Authorize the app when prompted

#### 2.4 Test Your API

Open this URL in browser (replace with your URL):
```
https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec?action=getVideos
```

You should see JSON response with your video data.

### Step 3: Configure Frontend

Edit `public/config.json`:

```json
{
  "api_base_url": "PASTE_YOUR_WEB_APP_URL_HERE",
  "site_title": "互動式影片活動",
  "site_description": "觀看影片並為您最喜愛的影片點讚",
  "max_likes_per_user": 10,
  "enable_like_limit": true
}
```

### Step 4: Test Locally

```bash
npm start
```

Browser will open at `http://localhost:3000`

✅ You should see:
- Video cards with thumbnails
- Like counts
- Working like buttons
- Links to YouTube/Facebook

### Step 5: Deploy to GitHub Pages

#### 5.1 Update package.json

Replace in `package.json`:
```json
"homepage": "https://YOUR_GITHUB_USERNAME.github.io/TSICF"
```

#### 5.2 Initialize Git (if not already done)

```bash
git init
git add .
git commit -m "Initial commit: Interactive Video Event Platform"
```

#### 5.3 Connect to GitHub

1. Create new repository on GitHub named "TSICF"
2. Run these commands:

```bash
git remote add origin https://github.com/YOUR_USERNAME/TSICF.git
git branch -M master
git push -u origin master
```

#### 5.4 Deploy

```bash
npm run deploy
```

Wait 2-3 minutes, then visit:
```
https://YOUR_USERNAME.github.io/TSICF
```

## 🎉 Done!

Your site is now live and ready to use!

## 🔧 Troubleshooting

### Issue: "Failed to load config.json"

**Solution**: Make sure `public/config.json` exists and has valid JSON

### Issue: "API request failed"

**Solutions**:
1. Check your Web App URL in config.json
2. Make sure Web App is deployed as "Anyone can access"
3. Test the API URL directly in browser

### Issue: "Likes not updating"

**Solutions**:
1. Check browser console (F12) for errors
2. Verify Google Sheet permissions
3. Make sure Sheet ID in Code.gs is correct

### Issue: "GitHub Pages shows 404"

**Solutions**:
1. Wait 5-10 minutes after deploying
2. Check GitHub repo settings > Pages
3. Verify `homepage` in package.json is correct
4. Make sure you ran `npm run deploy`

## 📚 Next Steps

- Customize colors in `tailwind.config.js`
- Add more videos to your Google Sheet
- Customize site title in `config.json`
- Share your site URL!

## 🆘 Need Help?

- Check [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions
- Review [README.md](./README.md) for full documentation
- Open an issue on GitHub

---

**Happy Deploying! 🚀**
