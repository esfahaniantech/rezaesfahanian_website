import sharp from 'sharp';
import pngToIco from 'png-to-ico';
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
  
  // Generate proper ICO file with multiple sizes
  const icoPath = path.join(OUTPUT_DIR, 'favicon.ico');
  
  // Create temporary PNGs for ICO (16, 32, 48)
  const icoSizes = [16, 32, 48];
  const tempFiles = [];
  
  for (const size of icoSizes) {
    const tempPath = path.join(OUTPUT_DIR, `temp-ico-${size}.png`);
    await sharp(sourceBuffer)
      .resize(size, size, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png()
      .toFile(tempPath);
    tempFiles.push(tempPath);
  }
  
  // Convert to proper ICO format
  const icoBuffer = await pngToIco(tempFiles);
  await fs.writeFile(icoPath, icoBuffer);
  
  // Clean up temp files
  for (const tempFile of tempFiles) {
    await fs.unlink(tempFile);
  }
  
  console.log('✓ Generated favicon.ico (16x16, 32x32, 48x48 multi-size ICO)');
  
  console.log('\nAll favicons generated successfully!');
}

generateFavicons().catch(console.error);
