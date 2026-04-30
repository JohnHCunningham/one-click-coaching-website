# Blog Creation Workflow

## Quick Start

### 1. Create a Blog Post

**Using Claude Code:**
```
/blog why sales training fails without reinforcement
```

**Manual workflow:**
1. Research your topic (use your research tool/artifact)
2. Ask Claude to write the blog using CLAUDE.md framework
3. Ask Claude to generate the cover image (uses built-in image generation)
4. Claude creates the HTML file in `blog/`
5. Claude updates `blog.html` with the new post

## Blog Post Structure

Every blog post follows this format:

```
blog/
  your-post-slug.html          # Full blog post
  images/
    your-post-slug.png         # Cover image (1792x1024)
```

## Copywriting Framework

All posts use the CLAUDE.md framework:

1. **Core Problem** - Name it better than the reader could
2. **Agitation** - Show consequences without hype
3. **Action vs Inaction** - Contrast the two paths
4. **Solution** - Built naturally, not "sold"
5. **Vision** - Show the transformation
6. **Conclusion** - Anchor with repetition

### Rhetorical Devices to Use (4-6 per post)
- **Tricolon** - Rule of three for rhythm
- **Antithesis** - Contrasting ideas side-by-side
- **Anaphora** - Repeat beginnings for momentum
- **Epistrophe** - Repeat endings to anchor
- **Antimetabole** - Reverse word order for memorability

### Tone
- Calm, confident, experienced
- No hype, no fluff, no clichés
- Insight over persuasion
- Short paragraphs (1-3 lines)
- Data-driven

## Image Generation with Claude

**Claude Sonnet 4.5 generates images natively** - no API key needed!

**Example topics:**
- "sales methodology execution under pressure"
- "feedback loop speed in training retention"
- "pipeline leakage from process abandonment"

**Images automatically:**
- Use brand colors (bone, terracotta, espresso)
- Are minimalist and professional
- Exclude text, people, charts
- Sized for social sharing (1792x1024)

## Publishing Workflow

1. Create blog post HTML
2. Generate cover image
3. Update blog.html listing
4. Commit and push:
   ```bash
   git add blog/
   git commit -m "Add new blog post: [title]"
   git push
   ```
5. Vercel auto-deploys to www.oneclickcoaching.com

## Example Usage

**Create full post with Claude:**
```
/blog sales methodology execution gaps
```

Claude will:
1. Research the topic
2. Write the post using CLAUDE.md framework
3. Generate a brand-matched cover image
4. Create the HTML file
5. Update the blog listing

## Troubleshooting

**Image generation issues**
- Make sure you're using Claude Sonnet 4.5 (not Haiku)
- Images are generated inline during blog creation
- No separate API key needed

**Blog not showing on site**
- Verify HTML file is in `blog/` directory
- Check you updated `blog.html` listing
- Push to GitHub to trigger Vercel deploy
