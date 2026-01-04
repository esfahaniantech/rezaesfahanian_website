import sharp from 'sharp';
import { promises as fs } from 'fs';

const SOURCE_IMAGE = './public/images/portrait.jpg';
const OUTPUT_IMAGE = './public/images/author-headshot.jpg';

async function createHeadCrop() {
  console.log('Creating head crop from:', SOURCE_IMAGE);
  
  // Read the source image metadata
  const metadata = await sharp(SOURCE_IMAGE).metadata();
  console.log('Original size:', metadata.width, 'x', metadata.height);
  
  // The portrait is 880x1320 (approximately)
  // We want to crop just the head area - top portion of the image
  // Head is roughly in the top 40% of the image, centered
  
  const width = metadata.width;
  const height = metadata.height;
  
  // Extract head region - approximately top 35% of image, slightly below top
  const cropTop = Math.round(height * 0.02); // Start 2% from top
  const cropHeight = Math.round(height * 0.35); // Take 35% height
  const cropWidth = Math.round(width * 0.7); // Take 70% width for center
  const cropLeft = Math.round((width - cropWidth) / 2); // Center horizontally
  
  await sharp(SOURCE_IMAGE)
    .extract({
      left: cropLeft,
      top: cropTop,
      width: cropWidth,
      height: cropHeight
    })
    .resize(400, 400, {
      fit: 'cover',
      position: 'top'
    })
    .jpeg({ quality: 90 })
    .toFile(OUTPUT_IMAGE);
  
  console.log('✓ Created author-headshot.jpg (400x400 head crop)');
}

createHeadCrop().catch(console.error);

