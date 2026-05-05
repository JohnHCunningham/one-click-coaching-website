#!/usr/bin/env node

/**
 * Automated Blog Post Generator
 *
 * Runs on schedule (Tuesdays/Thursdays) to automatically create blog post drafts.
 *
 * Workflow:
 * 1. Research trending topics using web search
 * 2. Select best topic from keyword research
 * 3. Generate blog post following CLAUDE.md framework
 * 4. Create cover image using Nano Banana 2
 * 5. Generate HTML file and update blog listing
 * 6. Output files for PR creation
 *
 * Requirements:
 * - ANTHROPIC_API_KEY in environment
 * - KIE_API_KEY in environment
 * - npm install @anthropic-ai/sdk dotenv
 */

require('dotenv').config();
const Anthropic = require('@anthropic-ai/sdk');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Validate environment
if (!process.env.ANTHROPIC_API_KEY) {
  console.error('Error: ANTHROPIC_API_KEY not found in environment');
  console.error('Set it in GitHub Secrets or .env file');
  process.exit(1);
}

if (!process.env.KIE_API_KEY) {
  console.error('Error: KIE_API_KEY not found in environment');
  console.error('Set it in GitHub Secrets or .env file');
  process.exit(1);
}

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

/**
 * Read the blog skill and keyword research
 */
function loadBlogContext() {
  const blogSkill = fs.readFileSync(
    path.join(__dirname, '..', '.claude', 'skills', 'blog.md'),
    'utf-8'
  );

  const keywordResearch = fs.readFileSync(
    path.join(__dirname, '..', 'blog', 'research', 'methodology-drift-keywords.md'),
    'utf-8'
  );

  const claudeFramework = fs.readFileSync(
    path.join(__dirname, '..', 'CLAUDE.md'),
    'utf-8'
  );

  return { blogSkill, keywordResearch, claudeFramework };
}

/**
 * Get list of existing blog posts to avoid duplicates
 */
function getExistingPosts() {
  const blogDir = path.join(__dirname, '..', 'blog');
  const files = fs.readdirSync(blogDir);
  return files
    .filter(f => f.endsWith('.html') && f !== 'index.html')
    .map(f => f.replace('.html', ''));
}

/**
 * Generate blog post using Claude
 */
async function generateBlogPost() {
  console.log('🤖 Starting automated blog post generation...\n');

  const { blogSkill, keywordResearch, claudeFramework } = loadBlogContext();
  const existingPosts = getExistingPosts();

  console.log(`📚 Found ${existingPosts.length} existing blog posts`);
  console.log('🔍 Researching trending topics...\n');

  const prompt = `You are an expert sales coaching content writer following the One Click Coaching blog creation workflow.

CONTEXT:
${claudeFramework}

BLOG CREATION WORKFLOW:
${blogSkill}

KEYWORD RESEARCH:
${keywordResearch}

EXISTING POSTS (avoid duplicates):
${existingPosts.join(', ')}

TASK:
Follow the blog skill workflow to create a new blog post for ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}:

1. Research trending topics using your knowledge of current sales coaching trends
2. Select the best topic that:
   - Hasn't been covered in existing posts
   - Aligns with keyword research
   - Is timely and relevant for 2026
   - Targets featured snippet opportunities

3. Generate a complete blog post following ALL requirements:
   - 1200-2000 words
   - CLAUDE.md copywriting framework
   - 6 rhetorical devices (list them)
   - Concrete example with before/after scores
   - "What to Do This Week" section (3 actionable steps)
   - FAQ section (3 objections)
   - 6+ authoritative sources cited (2026 sources)
   - PAA questions as H2 headers

4. Output in this EXACT JSON format:
{
  "topic": "The selected topic",
  "title": "SEO-optimized blog post title",
  "slug": "lowercase-with-hyphens",
  "excerpt": "1-2 sentence summary",
  "category": "Sales Coaching",
  "keywords": "comma, separated, keywords",
  "readingTime": "8",
  "imagePrompt": "Description for Nano Banana 2 image generation",
  "content": "Complete HTML content (all paragraphs, headers, sections)",
  "rhetoricalDevices": ["Device 1: Example", "Device 2: Example", ...],
  "sources": [{"title": "Source 1", "url": "https://..."}, ...],
  "reasoning": "Why this topic was selected and how it meets the criteria"
}

IMPORTANT:
- Content must be complete, publication-ready HTML
- Include ALL required sections
- Follow brand voice: calm, confident, experienced
- No placeholders or TODOs
- All statistics must have sources
- Reading time based on word count ÷ 200

Generate the blog post now.`;

  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-5-20250929',
    max_tokens: 64000,
    temperature: 1,
    messages: [{
      role: 'user',
      content: prompt
    }]
  });

  const responseText = message.content[0].text;

  // Extract JSON from response (handle markdown code blocks)
  let jsonMatch = responseText.match(/```json\n([\s\S]*?)\n```/);
  let jsonString;

  if (jsonMatch) {
    jsonString = jsonMatch[1];
  } else {
    // Try to find JSON object (first { to last })
    const firstBrace = responseText.indexOf('{');
    const lastBrace = responseText.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      jsonString = responseText.substring(firstBrace, lastBrace + 1);
    }
  }

  if (!jsonString) {
    console.error('Failed to extract JSON from response.');
    console.error('Response preview:', responseText.substring(0, 500));
    throw new Error('Failed to extract JSON from Claude response');
  }

  let blogData;
  try {
    blogData = JSON.parse(jsonString);
  } catch (error) {
    console.error('JSON parsing failed. JSON string preview:');
    console.error(jsonString.substring(0, 500));
    throw new Error(`Invalid JSON from Claude: ${error.message}`);
  }

  console.log(`✅ Generated blog post: "${blogData.title}"`);
  console.log(`📊 Reading time: ${blogData.readingTime} min`);
  console.log(`🎯 Keywords: ${blogData.keywords}`);
  console.log(`\n🎨 Rhetorical devices used:`);
  blogData.rhetoricalDevices.forEach((device, i) => {
    console.log(`   ${i + 1}. ${device}`);
  });

  return blogData;
}

/**
 * Generate cover image using Nano Banana 2
 */
function generateCoverImage(imagePrompt, slug) {
  console.log('\n🎨 Generating cover image...');

  try {
    const result = execSync(
      `node ${path.join(__dirname, 'generate-blog-image.js')} "${imagePrompt}" "${slug}"`,
      { encoding: 'utf-8', stdio: 'pipe' }
    );

    console.log('✅ Cover image generated successfully');
    return `/blog/images/${slug}.png`;
  } catch (error) {
    console.error('❌ Image generation failed:', error.message);
    throw error;
  }
}

/**
 * Get related posts for internal linking
 */
function getRelatedPosts(currentSlug, blogData) {
  const blogDir = path.join(__dirname, '..', 'blog');
  const files = fs.readdirSync(blogDir);
  const posts = files
    .filter(f => f.endsWith('.html') && f !== 'index.html' && !f.includes(currentSlug))
    .map(f => ({
      slug: f.replace('.html', ''),
      filename: f
    }))
    .slice(0, 3); // Get top 3 posts

  return posts;
}

/**
 * Create blog post HTML file
 */
function createBlogHTML(blogData, imagePath) {
  console.log('\n📝 Creating blog post HTML...');

  const date = new Date().toISOString().split('T')[0];
  const relatedPosts = getRelatedPosts(blogData.slug, blogData);

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${blogData.title} | One Click Coaching</title>
    <meta name="description" content="${blogData.excerpt}">
    <meta name="keywords" content="${blogData.keywords}">

    <!-- Open Graph -->
    <meta property="og:title" content="${blogData.title}">
    <meta property="og:description" content="${blogData.excerpt}">
    <meta property="og:image" content="https://oneclickcoaching.com${imagePath}">
    <meta property="og:url" content="https://oneclickcoaching.com/blog/${blogData.slug}.html">

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${blogData.title}">
    <meta name="twitter:description" content="${blogData.excerpt}">
    <meta name="twitter:image" content="https://oneclickcoaching.com${imagePath}">

    <link rel="stylesheet" href="../styles.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">

    <!-- Umami Analytics -->
    <script defer src="https://cloud.umami.is/script.js" data-website-id="675efbd2e57c2ede6f99c1df"></script>
</head>
<body>
    <nav style="background:#F4EFE8;padding:20px;border-bottom:1px solid #2A221C;">
        <div style="max-width:1200px;margin:0 auto;display:flex;justify-content:space-between;align-items:center;">
            <a href="../index.html" style="font-size:24px;font-weight:700;color:#2A221C;text-decoration:none;">One Click Coaching</a>
            <div>
                <a href="../index.html" style="color:#2A221C;text-decoration:none;margin:0 16px;">Home</a>
                <a href="../blog.html" style="color:#2A221C;text-decoration:none;margin:0 16px;">Blog</a>
                <a href="../contact.html" style="color:#2A221C;text-decoration:none;margin:0 16px;">Contact</a>
            </div>
        </div>
    </nav>

    <article style="max-width:800px;margin:60px auto;padding:0 20px;">
        <header style="margin-bottom:40px;">
            <div style="display:flex;gap:12px;margin-bottom:16px;">
                <span style="background:#B5583E;color:white;padding:4px 12px;border-radius:4px;font-size:14px;">${blogData.category}</span>
                <span style="color:#666;font-size:14px;">${blogData.readingTime} min read</span>
                <span style="color:#666;font-size:14px;">${date}</span>
            </div>
            <h1 style="font-size:48px;line-height:1.2;margin-bottom:20px;color:#2A221C;">${blogData.title}</h1>
            <p style="font-size:20px;color:#666;line-height:1.6;">${blogData.excerpt}</p>
        </header>

        <img src="images/${blogData.slug}.png" alt="Abstract visualization of ${blogData.topic}" style="width:100%;border-radius:12px;margin-bottom:32px;">

        <div style="font-size:18px;line-height:1.8;color:#2A221C;">
            ${blogData.content}
        </div>

        ${relatedPosts.length > 0 ? `
        <section style="margin-top:60px;padding:32px;background:#F4EFE8;border-radius:12px;">
            <h3 style="margin-bottom:24px;color:#2A221C;">Related Articles</h3>
            <div style="display:grid;gap:20px;">
                ${relatedPosts.map(post => `
                <a href="${post.filename}" style="display:block;padding:20px;background:white;border-radius:8px;text-decoration:none;color:#2A221C;transition:transform 0.2s;border-left:4px solid #B5583E;">
                    <div style="font-size:18px;font-weight:600;margin-bottom:8px;color:#2A221C;">${post.slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</div>
                    <div style="color:#666;font-size:14px;">Read more →</div>
                </a>
                `).join('')}
            </div>
        </section>
        ` : ''}

        <footer style="margin-top:60px;padding-top:40px;border-top:2px solid #F4EFE8;">
            <h3 style="margin-bottom:20px;">Sources</h3>
            <ul style="list-style:none;padding:0;">
                ${blogData.sources.map(s => `<li style="margin-bottom:12px;"><a href="${s.url}" target="_blank" rel="noopener" style="color:#B5583E;">${s.title}</a></li>`).join('\n                ')}
            </ul>
        </footer>
    </article>

    <footer style="background:#2A221C;color:#F4EFE8;padding:40px 20px;margin-top:80px;">
        <div style="max-width:1200px;margin:0 auto;text-align:center;">
            <p>&copy; ${new Date().getFullYear()} One Click Coaching. All rights reserved.</p>
        </div>
    </footer>
</body>
</html>`;

  const filepath = path.join(__dirname, '..', 'blog', `${blogData.slug}.html`);
  fs.writeFileSync(filepath, html);

  console.log(`✅ Created ${blogData.slug}.html`);
  return filepath;
}

/**
 * Update blog listing page
 */
function updateBlogListing(blogData) {
  console.log('\n📋 Updating blog listing...');

  const blogListPath = path.join(__dirname, '..', 'blog.html');
  let blogHTML = fs.readFileSync(blogListPath, 'utf-8');

  const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).replace(',', '');

  // Choose emoji based on category
  const emojiMap = {
    'Sales Coaching': '🎯',
    'Sales Methodology': '📊',
    'Coaching': '👥',
    'Sales Performance': '⭐',
    'Sales Training': '📚',
    'Sales Process': '🔄',
    'Sales Onboarding': '🎯',
    'AI Sales Coaching': '🤖',
    'Sales Analytics': '📈',
    'Sales Management': '👔'
  };
  const emoji = emojiMap[blogData.category] || '💡';

  const newCard = `
      <a href="blog/${blogData.slug}.html" class="post-card">
        <div class="thumb"><span>${emoji}</span></div>
        <div class="body">
          <div class="category">${blogData.category}</div>
          <h3>${blogData.title}</h3>
          <p class="excerpt">${blogData.excerpt}</p>
          <div class="meta">
            <span>${blogData.readingTime} min read</span>
            <span class="dot"></span>
            <span>${date}</span>
          </div>
        </div>
      </a>
`;

  // Insert after the posts-grid opening div
  const gridPattern = /<div class="posts-grid">\s*/;
  blogHTML = blogHTML.replace(gridPattern, match => match + newCard);

  fs.writeFileSync(blogListPath, blogHTML);
  console.log('✅ Updated blog.html listing');
}

/**
 * Main execution
 */
async function main() {
  try {
    console.log('╔═══════════════════════════════════════════╗');
    console.log('║  Automated Blog Post Generator            ║');
    console.log('║  One Click Coaching                       ║');
    console.log('╚═══════════════════════════════════════════╝\n');

    // Step 1: Generate blog post content
    const blogData = await generateBlogPost();

    // Step 2: Generate cover image
    const imagePath = generateCoverImage(blogData.imagePrompt, blogData.slug);

    // Step 3: Create HTML file
    createBlogHTML(blogData, imagePath);

    // Step 4: Update blog listing
    updateBlogListing(blogData);

    console.log('\n╔═══════════════════════════════════════════╗');
    console.log('║  ✅ Blog Post Generated Successfully!     ║');
    console.log('╚═══════════════════════════════════════════╝\n');
    console.log(`Title: ${blogData.title}`);
    console.log(`Slug: ${blogData.slug}`);
    console.log(`Files created:`);
    console.log(`  - blog/${blogData.slug}.html`);
    console.log(`  - blog/images/${blogData.slug}.png`);
    console.log(`  - blog.html (updated)`);
    console.log('\nReasoning:');
    console.log(blogData.reasoning);
    console.log('\n✨ Ready for review and PR creation!\n');

    // Output JSON for GitHub Actions to use
    const output = {
      success: true,
      title: blogData.title,
      slug: blogData.slug,
      files: [
        `blog/${blogData.slug}.html`,
        `blog/images/${blogData.slug}.png`,
        'blog.html'
      ]
    };

    console.log('\n---OUTPUT---');
    console.log(JSON.stringify(output, null, 2));
    console.log('---END OUTPUT---');

  } catch (error) {
    console.error('\n❌ Error generating blog post:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { generateBlogPost, generateCoverImage, createBlogHTML, updateBlogListing };
