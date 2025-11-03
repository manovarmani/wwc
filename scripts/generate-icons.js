// Simple script to generate PWA icons
// Run with: node scripts/generate-icons.js

const fs = require('fs');
const path = require('path');

// Create simple SVG icons as placeholders
const createIcon = (size) => {
  return `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" fill="#000000"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="${size * 0.4}" 
        font-weight="bold" fill="#ffffff" text-anchor="middle" dy=".35em">WCC</text>
</svg>`;
};

const publicDir = path.join(__dirname, '..', 'public');

// Create icon-192.png placeholder (using SVG as fallback)
fs.writeFileSync(
  path.join(publicDir, 'icon-192.svg'),
  createIcon(192)
);

// Create icon-512.png placeholder (using SVG as fallback)
fs.writeFileSync(
  path.join(publicDir, 'icon-512.svg'),
  createIcon(512)
);

// Update manifest to use SVG icons temporarily
const manifestPath = path.join(publicDir, 'manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
manifest.icons = [
  {
    src: "/icon-192.svg",
    sizes: "192x192",
    type: "image/svg+xml",
    purpose: "any maskable"
  },
  {
    src: "/icon-512.svg",
    sizes: "512x512",
    type: "image/svg+xml",
    purpose: "any maskable"
  }
];
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

console.log('✓ Generated icon placeholders');
console.log('Note: You can replace these SVG files with proper PNG icons later');

