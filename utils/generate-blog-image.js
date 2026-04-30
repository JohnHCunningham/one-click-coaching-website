#!/usr/bin/env node

/**
 * Generate blog post cover image using OpenAI DALL-E
 *
 * Usage: node utils/generate-blog-image.js "topic description" "slug-name"
 *
 * Requirements:
 * - Add OPENAI_API_KEY to .env file
 * - npm install openai dotenv
 */

// Load environment variables from .env
require('dotenv').config();

const OpenAI = require('openai');
const https = require('https');
const fs = require('fs');
const path = require('path');

// Check for API key
if (!process.env.OPENAI_API_KEY) {
  console.error('Error: OPENAI_API_KEY not found');
  console.error('Add it to your .env file:');
  console.error('  OPENAI_API_KEY=sk-your-key-here');
  process.exit(1);
}

// Get arguments
const topic = process.argv[2];
const slug = process.argv[3];

if (!topic || !slug) {
  console.error('Usage: node generate-blog-image.js "topic description" "slug-name"');
  process.exit(1);
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// One Click Coaching brand colors
const BRAND_COLORS = {
  bone: '#F4EFE8',
  terracotta: '#B5583E',
  espresso: '#2A221C',
  clay: '#C9A687'
};

async function generateImage() {
  console.log(`Generating image for: ${topic}`);
  console.log(`Slug: ${slug}`);

  const prompt = `Minimalist abstract geometric composition representing ${topic} in sales coaching and methodology.
Color palette: warm beige (${BRAND_COLORS.bone}), terracotta red (${BRAND_COLORS.terracotta}), dark espresso brown (${BRAND_COLORS.espresso}).
Professional, modern, clean aesthetic.
NO TEXT. NO PEOPLE. NO CHARTS.
Style: flat design, simple geometric shapes, subtle gradients, negative space.
Composition: balanced, sophisticated, calming.`;

  console.log('\nDall-E prompt:');
  console.log(prompt);
  console.log('\nGenerating...');

  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      size: "1792x1024", // Good for social sharing
      quality: "standard",
      n: 1,
    });

    const imageUrl = response.data[0].url;
    console.log(`\nImage generated: ${imageUrl}`);

    // Download and save
    const imagesDir = path.join(__dirname, '..', 'blog', 'images');
    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir, { recursive: true });
    }

    const imagePath = path.join(imagesDir, `${slug}.png`);

    await downloadImage(imageUrl, imagePath);

    console.log(`\nSaved to: ${imagePath}`);
    console.log(`Web path: /blog/images/${slug}.png`);

    return `/blog/images/${slug}.png`;
  } catch (error) {
    console.error('Error generating image:', error.message);
    if (error.response) {
      console.error('API response:', error.response.data);
    }
    process.exit(1);
  }
}

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }

      const fileStream = fs.createWriteStream(filepath);
      response.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });

      fileStream.on('error', (err) => {
        fs.unlink(filepath, () => reject(err));
      });
    }).on('error', reject);
  });
}

// Run
generateImage();
