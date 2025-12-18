#!/usr/bin/env node

/**
 * Splash Screen Generation Script for Bible Steps
 *
 * Generates splash screens for iOS devices
 * iOS requires specific sizes for different devices
 */

const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const SPLASH_DIR = path.join(process.cwd(), 'public', 'splash');
const ICON_PATH = path.join(process.cwd(), 'public', 'icon.svg');

// Brand colors
const BACKGROUND_COLOR = { r: 253, g: 248, b: 243 }; // Warm cream #fdf8f3
const PRIMARY_COLOR = { r: 217, g: 119, b: 6 };      // Primary amber #d97706

// iOS splash screen sizes (width x height, @3x for retina)
const IOS_SPLASH_SIZES = [
  // iPhone 15 Pro Max, 14 Pro Max, 13 Pro Max, 12 Pro Max
  { width: 1290, height: 2796, name: 'iphone-15-pro-max' },

  // iPhone 15 Pro, 15, 14 Pro, 13 Pro, 12 Pro
  { width: 1179, height: 2556, name: 'iphone-15-pro' },

  // iPhone 15 Plus, 14 Plus, 13, 12
  { width: 1284, height: 2778, name: 'iphone-15-plus' },

  // iPhone 14, 13 mini, 12 mini
  { width: 1125, height: 2436, name: 'iphone-14' },

  // iPhone SE (3rd gen), 8, 7, 6s
  { width: 750, height: 1334, name: 'iphone-se' },

  // iPhone 8 Plus, 7 Plus, 6s Plus
  { width: 1242, height: 2208, name: 'iphone-8-plus' },

  // iPad Pro 12.9" (6th/5th/4th/3rd gen)
  { width: 2048, height: 2732, name: 'ipad-pro-12.9' },

  // iPad Pro 11" (4th/3rd/2nd/1st gen)
  { width: 1668, height: 2388, name: 'ipad-pro-11' },

  // iPad Air (5th/4th gen), iPad Pro 10.5"
  { width: 1668, height: 2224, name: 'ipad-air' },

  // iPad (10th/9th gen), iPad Air (3rd gen)
  { width: 1620, height: 2160, name: 'ipad-10th' },

  // iPad mini (6th gen)
  { width: 1488, height: 2266, name: 'ipad-mini' },
];

/**
 * Ensure splash screens directory exists
 */
async function ensureSplashDirectory() {
  try {
    await fs.access(SPLASH_DIR);
  } catch {
    await fs.mkdir(SPLASH_DIR, { recursive: true });
    console.log('✓ Created splash directory');
  }
}

/**
 * Generate a single splash screen
 */
async function generateSplashScreen(width, height, name) {
  try {
    const outputPath = path.join(SPLASH_DIR, `apple-splash-${name}.png`);

    // Icon size - 30% of the smaller dimension
    const iconSize = Math.floor(Math.min(width, height) * 0.3);

    // Read and resize icon
    const iconBuffer = await sharp(ICON_PATH)
      .resize(iconSize, iconSize, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png()
      .toBuffer();

    // Calculate icon position (centered)
    const iconLeft = Math.floor((width - iconSize) / 2);
    const iconTop = Math.floor((height - iconSize) / 2);

    // Create splash screen with centered icon
    await sharp({
      create: {
        width,
        height,
        channels: 4,
        background: BACKGROUND_COLOR,
      },
    })
      .composite([
        {
          input: iconBuffer,
          top: iconTop,
          left: iconLeft,
        },
      ])
      .png()
      .toFile(outputPath);

    console.log(`✓ Generated ${name} (${width}x${height})`);
  } catch (error) {
    console.error(`✗ Failed to generate ${name}:`, error.message);
    throw error;
  }
}

/**
 * Generate HTML meta tags for iOS splash screens
 */
function generateSplashMetaTags() {
  const tags = IOS_SPLASH_SIZES.map(({ width, height, name }) => {
    return `<link rel="apple-touch-startup-image" href="/splash/apple-splash-${name}.png" media="(device-width: ${width}px) and (device-height: ${height}px) and (-webkit-device-pixel-ratio: 3)" />`;
  });

  const outputPath = path.join(process.cwd(), 'splash-meta-tags.html');
  fs.writeFile(outputPath, tags.join('\n'));

  console.log(`\n✓ Generated meta tags in splash-meta-tags.html`);
  console.log('  Copy these tags to your app/layout.tsx <head> section');
}

/**
 * Main generation function
 */
async function generateAllSplashScreens() {
  console.log('🎨 Bible Steps Splash Screen Generator\n');
  console.log(`Source: ${path.basename(ICON_PATH)}`);
  console.log(`Output: ${SPLASH_DIR}\n`);

  try {
    // Ensure splash directory exists
    await ensureSplashDirectory();

    // Generate all iOS splash screens
    console.log('📱 Generating iOS splash screens...\n');

    for (const size of IOS_SPLASH_SIZES) {
      await generateSplashScreen(size.width, size.height, size.name);
    }

    // Generate meta tags reference
    await generateSplashMetaTags();

    console.log('\n✅ All splash screens generated successfully!');
    console.log(`\nGenerated ${IOS_SPLASH_SIZES.length} splash screens`);

  } catch (error) {
    console.error('\n❌ Splash screen generation failed:', error.message);
    process.exit(1);
  }
}

// Run the generator
if (require.main === module) {
  generateAllSplashScreens();
}

module.exports = { generateAllSplashScreens };
