#!/usr/bin/env node

/**
 * Generate blog post cover image using Kie.ai Nano Banana 2 (Google Gemini 3.1 Flash Image)
 *
 * Benefits over DALL-E:
 * - Accurate text rendering (no garbled text)
 * - Strong character consistency
 * - 4K output support
 * - Better prompt understanding
 *
 * Usage: node utils/generate-blog-image.js "topic description" "slug-name"
 *
 * Requirements:
 * - Add KIE_API_KEY to .env file (get it at https://kie.ai/dashboard)
 * - npm install dotenv
 */

// Load environment variables from .env
require('dotenv').config();

const https = require('https');
const fs = require('fs');
const path = require('path');

// Check for API key
if (!process.env.KIE_API_KEY) {
  console.error('Error: KIE_API_KEY not found');
  console.error('Add it to your .env file:');
  console.error('  KIE_API_KEY=your-key-here');
  console.error('\nGet your API key at: https://kie.ai/dashboard');
  process.exit(1);
}

// Get arguments
const topic = process.argv[2];
const slug = process.argv[3];

if (!topic || !slug) {
  console.error('Usage: node generate-blog-image.js "topic description" "slug-name"');
  process.exit(1);
}

const API_KEY = process.env.KIE_API_KEY;

// One Click Coaching brand colors
const BRAND_COLORS = {
  bone: '#F4EFE8',
  terracotta: '#B5583E',
  espresso: '#2A221C',
  clay: '#C9A687'
};

/**
 * Make HTTPS request (promisified)
 */
function makeRequest(options, postData = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            resolve(data);
          }
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', reject);

    if (postData) {
      req.write(JSON.stringify(postData));
    }

    req.end();
  });
}

/**
 * Create image generation task
 */
async function createTask(prompt) {
  console.log('\nCreating image generation task...');

  const options = {
    hostname: 'api.kie.ai',
    port: 443,
    path: '/api/v1/jobs/createTask',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json'
    }
  };

  const payload = {
    model: 'nano-banana-2',
    input: {
      prompt: prompt,
      aspect_ratio: '1:1',
      resolution: '1K',
      output_format: 'png'
    }
  };

  const response = await makeRequest(options, payload);

  if (response.code !== 200) {
    throw new Error(`Failed to create task: ${response.msg}`);
  }

  return response.data.taskId;
}

/**
 * Check task status and get result
 */
async function getTaskStatus(taskId) {
  const options = {
    hostname: 'api.kie.ai',
    port: 443,
    path: `/api/v1/jobs/recordInfo?taskId=${taskId}`,
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${API_KEY}`
    }
  };

  const response = await makeRequest(options);

  if (response.code !== 200) {
    throw new Error(`Failed to get task status: ${response.msg}`);
  }

  return response.data;
}

/**
 * Poll task until completion
 */
async function waitForCompletion(taskId) {
  const maxAttempts = 60; // 60 attempts * 2 seconds = 2 minutes max
  let attempts = 0;

  while (attempts < maxAttempts) {
    const task = await getTaskStatus(taskId);

    console.log(`Status: ${task.state} (attempt ${attempts + 1}/${maxAttempts})`);

    if (task.state === 'success') {
      // Parse resultJson to get image URL
      const result = JSON.parse(task.resultJson);

      if (!result.resultUrls || result.resultUrls.length === 0) {
        throw new Error('No image URL in result');
      }

      return result.resultUrls[0];
    }

    if (task.state === 'fail') {
      throw new Error(`Task failed: ${task.failMsg || 'Unknown error'}`);
    }

    // Wait 2 seconds before next poll
    await new Promise(resolve => setTimeout(resolve, 2000));
    attempts++;
  }

  throw new Error('Task timeout - took longer than 2 minutes');
}

/**
 * Download image from URL
 */
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

/**
 * Main function
 */
async function generateImage() {
  console.log(`Generating image for: ${topic}`);
  console.log(`Slug: ${slug}`);

  const prompt = `Minimalist abstract geometric composition representing ${topic} in sales coaching and methodology.
Color palette: warm beige (${BRAND_COLORS.bone}), terracotta red (${BRAND_COLORS.terracotta}), dark espresso brown (${BRAND_COLORS.espresso}).
Professional, modern, clean aesthetic.
NO TEXT. NO PEOPLE. NO CHARTS.
Style: flat design, simple geometric shapes, subtle gradients, negative space.
Composition: balanced, sophisticated, calming.`;

  console.log('\nNano Banana 2 prompt:');
  console.log(prompt);

  try {
    // Create task
    const taskId = await createTask(prompt);
    console.log(`\nTask created: ${taskId}`);
    console.log('Waiting for completion...\n');

    // Wait for completion and get image URL
    const imageUrl = await waitForCompletion(taskId);
    console.log(`\nImage generated: ${imageUrl}`);
    console.log('⚠️  Note: Image URL expires in 24 hours - downloading now...');

    // Download and save
    const imagesDir = path.join(__dirname, '..', 'blog', 'images');
    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir, { recursive: true });
    }

    const imagePath = path.join(imagesDir, `${slug}.png`);
    await downloadImage(imageUrl, imagePath);

    console.log(`\n✓ Saved to: ${imagePath}`);
    console.log(`✓ Web path: /blog/images/${slug}.png`);

    return `/blog/images/${slug}.png`;
  } catch (error) {
    console.error('\n✗ Error generating image:', error.message);
    process.exit(1);
  }
}

// Run
generateImage();
