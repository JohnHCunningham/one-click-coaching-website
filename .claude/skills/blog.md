# Blog Post Creation Skill

## Command
`/blog [topic or keyword]`

## Description
Creates a new sales coaching blog post for One Click Coaching, following the established brand voice and copywriting framework.

## What This Skill Does
1. Takes a topic or keyword as input
2. Researches the topic using web search or provided research notes
3. Writes a compelling blog post using the CLAUDE.md copywriting framework
4. Generates a cover image using OpenAI DALL-E (matches bone/terracotta aesthetic)
5. Creates the HTML file in the blog/ directory
6. Updates blog.html to include the new post

## Usage Examples
- `/blog sales coaching feedback loops`
- `/blog why MEDDIC fails without AI`
- `/blog talk time ratio in discovery calls`

## Workflow

### Step 1: Research & Outline
- If user provides research notes/artifact, use those
- Otherwise, search for relevant data, statistics, case studies
- Identify the core insight/pattern to name
- Draft 3-5 key sections

### Step 2: Write Using CLAUDE.md Framework
**Apply these principles:**
- Name the problem better than the reader could
- Use 4-6 rhetorical devices (tricolon, antithesis, anaphora, epistrophe)
- Pattern recognition over hype
- Short paragraphs (1-3 lines)
- Data-driven (cite specific numbers)
- Calm, confident, experienced tone
- End with CTA to contact page

**Structure:**
1. Core Problem (pattern interrupt opening)
2. Agitation (consequences without hype)
3. Action vs Inaction (contrast)
4. Solution (built, not announced)
5. Vision (transformation)
6. Conclusion (anchor with repetition)

### Step 3: Generate Cover Image
**Image Style Guidelines:**
- Minimalist, professional
- Color palette: bone (#F4EFE8), terracotta (#B5583E), espresso (#2A221C)
- Abstract/geometric or clean photography
- No text overlays
- 1200x630px (social media optimized)

**DALL-E Prompt Template:**
```
Minimalist abstract geometric composition representing [TOPIC].
Color palette: warm beige (#F4EFE8), terracotta red (#B5583E), dark brown (#2A221C).
Professional, modern, clean. No text. No people.
Style: flat design, simple shapes, subtle gradients.
```

### Step 4: Create HTML File
- Use the template from existing blog posts
- Slug format: lowercase-with-hyphens.html
- Include all SEO meta tags
- Add Vercel Analytics script
- Save to `/blog/[slug].html`

### Step 5: Update Blog Listing
- Add new post card to blog.html (prepend to list)
- Include: title, excerpt, category, reading time, date

## Template Variables
- `{TITLE}` - Full blog post title
- `{SLUG}` - URL-friendly slug
- `{EXCERPT}` - 1-2 sentence summary
- `{CATEGORY}` - Sales Process, Sales Coaching, Sales Training, etc.
- `{READING_TIME}` - Estimated read time
- `{DATE}` - Publication date (YYYY-MM-DD)
- `{KEYWORDS}` - SEO keywords (comma-separated)
- `{CONTENT}` - Full HTML content
- `{TAGS}` - Post tags

## OpenAI Setup
**Required:** Set `OPENAI_API_KEY` environment variable

**Image Generation:**
```javascript
// utils/generate-image.js
const OpenAI = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function generateBlogImage(topic, slug) {
  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: `Minimalist abstract geometric composition representing ${topic}. Color palette: warm beige (#F4EFE8), terracotta red (#B5583E), dark brown (#2A221C). Professional, modern, clean. No text. No people. Style: flat design, simple shapes, subtle gradients.`,
    size: "1792x1024",
    quality: "standard",
    n: 1,
  });

  // Download and save to blog/images/[slug].png
  const imageUrl = response.data[0].url;
  // ... download logic
  return `/blog/images/${slug}.png`;
}
```

## Notes
- All blog posts must follow the CLAUDE.md copywriting framework
- Target length: 1200-2000 words
- Include specific data/statistics where possible
- CTA always links to contact.html
- Images stored in `/blog/images/`
- Maintain consistent brand voice: calm, confident, experienced
