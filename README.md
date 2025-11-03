# White Coat Capital - Mobile PWA

A Progressive Web App (PWA) for physician financing, built with Next.js and deployable to Vercel.

## Features

- 📱 **Mobile-First PWA**: Installable on iOS and Android devices
- 🚀 **Fast Performance**: Optimized for mobile with service worker caching
- 📲 **Offline Support**: Basic offline functionality with service worker
- 🎨 **Responsive Design**: Works seamlessly on all device sizes
- ⚡ **Vercel Ready**: Configured for easy deployment to Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Installation

```bash
npm install --legacy-peer-deps
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## Deploying to Vercel

1. Push your code to GitHub, GitLab, or Bitbucket
2. Import your repository to [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and deploy
4. Your PWA will be available at your Vercel URL

### Installing on Mobile Devices

#### iOS (Safari)
1. Open your deployed site in Safari
2. Tap the Share button
3. Select "Add to Home Screen"
4. The app will appear on your home screen

#### Android (Chrome)
1. Open your deployed site in Chrome
2. Tap the menu (three dots)
3. Select "Add to Home Screen" or "Install App"
4. The app will appear on your home screen

## PWA Features

- **App Icons**: Custom icons for iOS and Android
- **Standalone Mode**: Opens without browser UI when installed
- **Install Prompt**: Automatic install prompt for supported browsers
- **Service Worker**: Caches resources for offline functionality
- **Manifest**: Full PWA manifest with app metadata

## Project Structure

```
/app               - Next.js app directory
  /auth           - Authentication pages
  /dashboard      - Dashboard pages
  /physician      - Physician-specific pages
  /investor       - Investor-specific pages
  layout.tsx      - Root layout with PWA configuration
/public
  manifest.json   - PWA manifest file
  sw.js          - Service worker
  icon-*.svg     - App icons
/components      - React components
```

## Customization

### Updating App Icons

Replace the icon files in `/public`:
- `icon-192.svg` - 192x192 icon
- `icon-512.svg` - 512x512 icon

For best results, provide PNG versions at these sizes:
- 192x192 pixels
- 512x512 pixels

### Customizing the Manifest

Edit `/public/manifest.json` to update:
- App name and description
- Theme colors
- Display mode
- Shortcuts

## License

Private - White Coat Capital
