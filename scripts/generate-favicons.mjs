import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';

const SOURCE_IMAGE = './Images/Logo/RE-logo (1).png';
const OUTPUT_DIR = './public';

const sizes = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'android-chrome-192x192.png', size: 192 },
  { name: 'android-chrome-512x512.png', size: 512 },
  { name: 'logo.png', size: 256 },
];

async function generateFavicons() {
  console.log('Generating favicons from:', SOURCE_IMAGE);
  
  // Read the source image
  const sourceBuffer = await fs.readFile(SOURCE_IMAGE);
  
  for (const { name, size } of sizes) {
    const outputPath = path.join(OUTPUT_DIR, name);
    
    await sharp(sourceBuffer)
      .resize(size, size, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png()
      .toFile(outputPath);
    
    console.log(`✓ Generated ${name} (${size}x${size})`);
  }
  
  // Generate ICO file (multi-size)
  // For ICO, we'll create a 32x32 PNG and rename it
  // Most modern browsers accept PNG as favicon
  const icoPath = path.join(OUTPUT_DIR, 'favicon.ico');
  await sharp(sourceBuffer)
    .resize(32, 32, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .png()
    .toFile(icoPath.replace('.ico', '-temp.png'));
  
  // Copy as .ico (browsers accept PNG with .ico extension)
  await fs.copyFile(icoPath.replace('.ico', '-temp.png'), icoPath);
  await fs.unlink(icoPath.replace('.ico', '-temp.png'));
  console.log('✓ Generated favicon.ico (32x32)');
  
  console.log('\nAll favicons generated successfully!');
}

generateFavicons().catch(console.error);
