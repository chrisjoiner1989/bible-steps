#!/usr/bin/env node

/**
 * Icon Generation Script for Bible Steps
 *
 * Generates all required icon sizes from the source SVG icon for:
 * - Web app (favicon sizes)
 * - Android (PWA icons, Play Store)
 * - iOS (Apple Touch icons, App Store)
 *
 * Usage: node scripts/generate-icons.js
 */

const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const ICONS_DIR = path.join(process.cwd(), 'public', 'icons');
const SOURCE_SVG = path.join(process.cwd(), 'public', 'icon.svg');

// Icon sizes needed for different platforms
const ICON_SIZES = {
  // Favicon sizes
  favicon: [16, 32, 64],

  // Android/PWA sizes
  android: [
    { size: 192, suffix: '', maskable: false },
    { size: 192, suffix: '-maskable', maskable: true },
    { size: 512, suffix: '', maskable: false },
    { size: 512, suffix: '-maskable', maskable: true },
  ],

  // iOS/Apple Touch Icon sizes
  ios: [120, 152, 167, 180],

  // App Store submission
  store: [1024],
};

/**
 * Ensure icons directory exists
 */
async function ensureIconsDirectory() {
  try {
    await fs.access(ICONS_DIR);
  } catch {
    await fs.mkdir(ICONS_DIR, { recursive: true });
    console.log('✓ Created icons directory');
  }
}

/**
 * Generate a single icon size
 */
async function generateIcon(size, outputPath, maskable = false) {
  try {
    let svgBuffer = await fs.readFile(SOURCE_SVG);

    // For maskable icons, we need to ensure the icon fits within the safe zone
    // Maskable icons require 40% padding (80% safe zone)
    if (maskable) {
      // Read SVG and add padding
      const iconSize = Math.round(size * 0.8); // 80% of target size for safe zone
      const padding = Math.round((size - iconSize) / 2);

      await sharp(svgBuffer)
        .resize(iconSize, iconSize, {
          fit: 'contain',
          background: { r: 253, g: 248, b: 243, alpha: 1 }, // Warm cream background
        })
        .extend({
          top: padding,
          bottom: padding,
          left: padding,
          right: padding,
          background: { r: 253, g: 248, b: 243, alpha: 1 },
        })
        .png()
        .toFile(outputPath);
    } else {
      await sharp(svgBuffer)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 253, g: 248, b: 243, alpha: 1 },
        })
        .png()
        .toFile(outputPath);
    }

    console.log(`✓ Generated ${path.basename(outputPath)} (${size}x${size}${maskable ? ' maskable' : ''})`);
  } catch (error) {
    console.error(`✗ Failed to generate ${path.basename(outputPath)}:`, error.message);
    throw error;
  }
}

/**
 * Generate favicon.ico with multiple sizes
 */
async function generateFavicon() {
  const faviconPath = path.join(process.cwd(), 'public', 'favicon.ico');

  try {
    let svgBuffer = await fs.readFile(SOURCE_SVG);

    // Generate 32x32 PNG for favicon (ICO format is complex, using PNG as fallback)
    await sharp(svgBuffer)
      .resize(32, 32, {
        fit: 'contain',
        background: { r: 253, g: 248, b: 243, alpha: 1 },
      })
      .png()
      .toFile(faviconPath);

    console.log('✓ Generated favicon.ico');
  } catch (error) {
    console.error('✗ Failed to generate favicon.ico:', error.message);
  }
}

/**
 * Main generation function
 */
async function generateAllIcons() {
  console.log('🎨 Bible Steps Icon Generator\n');
  console.log(`Source: ${path.basename(SOURCE_SVG)}`);
  console.log(`Output: ${ICONS_DIR}\n`);

  try {
    // Ensure icons directory exists
    await ensureIconsDirectory();

    // Generate favicon sizes
    console.log('📱 Generating favicon sizes...');
    for (const size of ICON_SIZES.favicon) {
      const outputPath = path.join(ICONS_DIR, `icon-${size}.png`);
      await generateIcon(size, outputPath);
    }

    // Generate Android/PWA sizes
    console.log('\n🤖 Generating Android/PWA sizes...');
    for (const { size, suffix, maskable } of ICON_SIZES.android) {
      const outputPath = path.join(ICONS_DIR, `icon-${size}${suffix}.png`);
      await generateIcon(size, outputPath, maskable);
    }

    // Generate iOS sizes
    console.log('\n🍎 Generating iOS/Apple Touch Icon sizes...');
    for (const size of ICON_SIZES.ios) {
      const outputPath = path.join(ICONS_DIR, `apple-touch-icon-${size}.png`);
      await generateIcon(size, outputPath);
    }

    // Generate main Apple Touch Icon (180x180)
    const mainAppleTouchIcon = path.join(process.cwd(), 'public', 'apple-touch-icon.png');
    await sharp(await fs.readFile(SOURCE_SVG))
      .resize(180, 180, {
        fit: 'contain',
        background: { r: 253, g: 248, b: 243, alpha: 1 },
      })
      .png()
      .toFile(mainAppleTouchIcon);
    console.log('✓ Generated apple-touch-icon.png (180x180)');

    // Generate App Store size
    console.log('\n🏪 Generating App Store submission size...');
    for (const size of ICON_SIZES.store) {
      const outputPath = path.join(ICONS_DIR, `icon-${size}.png`);
      await generateIcon(size, outputPath);
    }

    // Generate favicon.ico
    console.log('\n🌐 Generating favicon.ico...');
    await generateFavicon();

    console.log('\n✅ All icons generated successfully!');
    console.log(`\nGenerated ${ICON_SIZES.favicon.length + ICON_SIZES.android.length + ICON_SIZES.ios.length + ICON_SIZES.store.length + 2} icons`);

  } catch (error) {
    console.error('\n❌ Icon generation failed:', error.message);
    process.exit(1);
  }
}

// Run the generator
if (require.main === module) {
  generateAllIcons();
}

module.exports = { generateAllIcons };
