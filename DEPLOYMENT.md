# Deployment Guide - White Coat Capital PWA

## Deploying to Vercel

### Step 1: Prepare Your Repository

1. Make sure all changes are committed:
   ```bash
   git add .
   git commit -m "Convert to PWA mobile app"
   ```

2. Push to GitHub/GitLab/Bitbucket:
   ```bash
   git push origin main
   ```

### Step 2: Deploy to Vercel

#### Option A: Via Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New..." → "Project"
3. Import your repository
4. Vercel will auto-detect Next.js settings
5. Click "Deploy"
6. Wait for deployment to complete (~2-3 minutes)

#### Option B: Via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Follow the prompts to link your project

### Step 3: Configure Vercel Settings

The project includes `vercel.json` which automatically configures:
- Service worker headers
- Manifest.json headers
- PWA support

No additional configuration needed!

### Step 4: Test Your PWA

Once deployed:

1. Visit your Vercel URL on a mobile device
2. Test the install prompt (should appear automatically on Android/Chrome)
3. On iOS, use Safari's "Add to Home Screen" option

## Mobile Installation Instructions

### For Android Users (Chrome)

1. Open your Vercel URL in Chrome browser
2. Wait for the install prompt to appear, or:
   - Tap the menu (⋮) in the top right
   - Select "Install app" or "Add to Home Screen"
3. Confirm installation
4. The app will appear on your home screen

### For iOS Users (Safari)

1. Open your Vercel URL in Safari (not Chrome)
2. Tap the Share button (square with arrow)
3. Scroll down and tap "Add to Home Screen"
4. Customize the name if desired
5. Tap "Add"
6. The app will appear on your home screen

## Verifying PWA Installation

### Check if Service Worker is Active

1. Open Chrome DevTools (F12)
2. Go to "Application" tab
3. Check "Service Workers" - should show "activated and running"
4. Check "Manifest" - should show your app details

### Test Offline Mode

1. In Chrome DevTools, go to "Network" tab
2. Enable "Offline" mode
3. Refresh the page
4. The app should still work (basic pages cached)

## Troubleshooting

### Service Worker Not Registering

- Ensure you're using HTTPS (Vercel provides this automatically)
- Check browser console for errors
- Verify `/sw.js` is accessible at `your-domain.com/sw.js`

### Install Prompt Not Showing

- Make sure you're on a supported browser (Chrome/Edge for Android)
- Clear browser cache and try again
- Check that manifest.json is valid (use a manifest validator)

### Icons Not Showing

- Verify icon files exist in `/public` folder
- Check that manifest.json references correct icon paths
- Clear browser cache

## Production Checklist

- [ ] App icons created and in `/public` folder
- [ ] Manifest.json is valid (test with [Web Manifest Validator](https://manifest-validator.appspot.com/))
- [ ] Service worker is working (check DevTools)
- [ ] App installs correctly on Android and iOS
- [ ] Offline mode works (basic functionality)
- [ ] Vercel deployment successful
- [ ] HTTPS is enabled (automatic on Vercel)

## Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions
5. Your PWA will work on your custom domain

## Next Steps

- Replace placeholder icons with professional app icons
- Enhance offline functionality in service worker
- Add push notifications (optional)
- Configure app store listings if publishing

