# Blog Creation Workflow

## Quick Start

### 1. Get OpenAI API Key
1. Go to https://platform.openai.com/api-keys
2. Create a new API key
3. Set it in your environment:
   ```bash
   export OPENAI_API_KEY="sk-your-key-here"
   ```

   Or add to your `~/.zshrc` or `~/.bashrc`:
   ```bash
   echo 'export OPENAI_API_KEY="sk-your-key-here"' >> ~/.zshrc
   source ~/.zshrc
   ```

### 2. Install OpenAI Package
```bash
cd /Users/johncunningham/one-click-coaching-website
npm install openai
```

### 3. Create a Blog Post

**Using Claude Code:**
```
/blog why sales training fails without reinforcement
```

**Manual workflow:**
1. Research your topic (use your research tool/artifact)
2. Ask Claude to write the blog using CLAUDE.md framework
3. Generate the cover image:
   ```bash
   node utils/generate-blog-image.js "sales training reinforcement" "sales-training-reinforcement"
   ```
4. Create the HTML file in `blog/`
5. Update `blog.html` with the new post

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

## Image Generation Tips

**Good topics for DALL-E:**
- "sales methodology execution under pressure"
- "feedback loop speed in training retention"
- "pipeline leakage from process abandonment"

**Image will automatically:**
- Use brand colors (bone, terracotta, espresso)
- Be minimalist and professional
- Exclude text, people, charts
- Be sized for social sharing (1792x1024)

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

## Example Commands

**Generate image only:**
```bash
node utils/generate-blog-image.js "sales coaching feedback loops" "coaching-feedback-loops"
```

**Create full post with Claude:**
```
/blog sales methodology execution gaps
```

## Troubleshooting

**"OPENAI_API_KEY not set"**
- Check: `echo $OPENAI_API_KEY`
- If empty, export it or add to shell config

**Image generation fails**
- Check API key is valid
- Check you have credits on OpenAI account
- Try simpler prompt

**Blog not showing on site**
- Verify HTML file is in `blog/` directory
- Check you updated `blog.html` listing
- Push to GitHub to trigger Vercel deploy
