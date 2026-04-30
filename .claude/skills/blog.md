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
- 1792x1024px (social media optimized)

**Claude Image Generation Prompt:**
```
Create a minimalist abstract geometric composition representing [TOPIC] in sales coaching.

Style:
- Color palette: warm beige (#F4EFE8), terracotta/burnt orange (#B5583E), dark espresso brown (#2A221C)
- Flat design with simple geometric shapes
- Subtle gradients and negative space
- Professional, modern, calming aesthetic
- NO text, NO people, NO charts/graphs

Composition: Balanced, sophisticated, emphasizing the concept through abstract shapes and color relationships.
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

## Image Generation with Claude
**Uses:** Claude Sonnet 4.5's built-in image generation

**Process:**
1. Generate image during blog post creation
2. Save to `blog/images/[slug].png`
3. Reference in blog post HTML

**No API key needed** - Claude generates images natively

## Notes
- All blog posts must follow the CLAUDE.md copywriting framework
- Target length: 1200-2000 words
- Include specific data/statistics where possible
- CTA always links to contact.html
- Images stored in `/blog/images/`
- Maintain consistent brand voice: calm, confident, experienced
