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

**A. Fresh Keyword Research (ALWAYS DO THIS FIRST):**
1. Use WebSearch to research the topic with these queries:
   - `"{topic}" people also ask 2026`
   - `"sales {topic}" trends 2026`
   - `"{topic}" questions salespeople ask`
   - `"{topic}" statistics data`

2. Extract from search results:
   - Current PAA (People Also Ask) questions
   - Trending related searches
   - Recent statistics and data points
   - Common pain points and objections
   - Featured snippet opportunities

3. Cross-reference with `/blog/research/methodology-drift-keywords.md` for:
   - Existing keyword strategy
   - Core themes to maintain
   - Proven high-performing questions

**B. Outline Creation:**
- Identify the core insight/pattern to name
- Select 3-5 PAA questions to answer as H2 headers
- Draft sections connecting topic to methodology drift
- Gather specific data points and statistics
- Plan rhetorical devices (4-6 minimum)

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
3. Knowledge vs. Execution gap (with concrete example)
4. Action vs Inaction (contrast)
5. Solution (built, not announced)
6. **What [Audience] Should Do This Week** (3 actionable steps) - REQUIRED
7. **FAQ Section** (3 common objections addressed) - REQUIRED
8. Vision (transformation)
9. CTA
10. Conclusion (anchor with repetition)

**Required Sections (Must Include):**

**A. Concrete Example (Early in Post):**
Show specific, measurable feedback example:
- "Sandler Score: 65%. Pain Funnel executed. Budget not qualified..."
- Include before/after improvement (65% → 85%)
- Use timestamps or specific call references
- Make it tangible, not theoretical

**B. What to Do This Week:**
3 actionable steps sales leaders can take immediately:
- Step 1: Audit/observe something specific
- Step 2: Ask a revealing question
- Step 3: Test one small change
- End with decision question: "Then decide: [inaction] or [action]?"

Example:
```
## What Sales Leaders Should Do This Week

1. Audit one rep's last 5 calls - Listen for methodology execution
2. Ask your team: "What % of calls follow our methodology?"
   (They'll say 80%. Reality is 30%. That gap is the problem.)
3. Test same-day feedback with one rep, one call

Then decide: Keep guessing or start measuring?
```

**C. FAQ Section:**
Address 3 common objections:
1. "Isn't this [negative perception]?" - Address concern directly
2. "We already use [competitor/alternative]" - Differentiate clearly
3. "How long until results?" - Set realistic timeline

Keep answers to 2-3 sentences. Be direct, not defensive.

### Step 3: Generate Cover Image

**Uses:** OpenAI DALL-E 2 API via automated script

**Command:**
```bash
node utils/generate-blog-image.js "topic description" "slug-name"
```

**Example:**
```bash
node utils/generate-blog-image.js "sales methodology adherence scoring showing 3-3-3 rule framework" "3-3-3-rule-fails-without-reinforcement"
```

**Image Style Guidelines:**
- Minimalist, professional, abstract/geometric
- Color palette: bone (#F4EFE8), terracotta (#B5583E), espresso (#2A221C)
- NO text overlays, NO people, NO charts/graphs
- Size: 1024x1024px (DALL-E 2)
- Automatically saved to `/blog/images/[slug].png`

**The script automatically:**
1. Generates image with brand colors
2. Downloads and saves to correct directory
3. Returns web path for HTML reference

**In blog post HTML:**
```html
<img src="images/[slug].png" alt="[Descriptive alt text for SEO]" style="width:100%;border-radius:12px;margin-bottom:32px;">
```

**Alt text format:** "Abstract visualization of [topic] showing [key concept]"

### Step 4: Create HTML File
- Use the template from existing blog posts
- Slug format: lowercase-with-hyphens.html
- Include all SEO meta tags
- Add Vercel Analytics script
- Save to `/blog/[slug].html`

### Step 5: Update Blog Listing
- Add new post card to blog.html (prepend to list)
- Include: title, excerpt, category, reading time, date

### Step 6: Pre-Publish Quality Review

**MANDATORY CHECKLIST - Complete before committing:**

**Content Quality:**
- [ ] Read entire post aloud (catches awkward phrasing)
- [ ] Verify 4-6 rhetorical devices used and list them:
  - [ ] Device 1: _____________
  - [ ] Device 2: _____________
  - [ ] Device 3: _____________
  - [ ] Device 4: _____________
- [ ] All statistics have sources linked
- [ ] Concrete example included with before/after scores
- [ ] "What to Do This Week" section with 3 actionable steps
- [ ] FAQ section addresses 3 common objections
- [ ] CTA links to correct page (contact.html)
- [ ] Reading time is accurate (word count ÷ 200)

**Technical Quality:**
- [ ] Test ALL external links (open in new tabs, verify they work)
- [ ] Verify image loads and displays correctly
- [ ] Check image alt text describes content for SEO
- [ ] SEO meta description complete and under 160 characters
- [ ] Verify slug is lowercase-with-hyphens
- [ ] Analytics script included (Umami)
- [ ] All template variables replaced (no {PLACEHOLDERS} remain)

**SEO Quality:**
- [ ] Primary keyword in title, H1, and first paragraph
- [ ] At least 3 H2s answer PAA questions directly
- [ ] PAA questions answered in 40-60 words first, then expanded
- [ ] Sources section includes all cited links with proper attribution
- [ ] Internal links to other blog posts (when available)
- [ ] Meta keywords include primary and secondary keywords

**Voice Quality:**
- [ ] Tone is calm, confident, experienced (not excited/desperate)
- [ ] No buzzwords, fluff, or clichés
- [ ] Insight over persuasion
- [ ] Pattern recognition is clear
- [ ] No hype or exaggerated claims
- [ ] Brand voice matches CLAUDE.md guidelines

**Final Check:**
- [ ] Post length: 1200-2000 words ✅
- [ ] All checklist items above are checked ✅
- [ ] Ready to push to production ✅

**If all boxes checked:** Proceed to Step 7 (commit and push)
**If any boxes unchecked:** Fix issues, then re-review

### Step 7: Commit and Push

**Git workflow:**
```bash
git add blog/[slug].html blog/images/[slug].png blog.html
git commit -m "Add blog post: [Title]

- [Brief description of topic]
- [Key statistics or insights]
- SEO optimized for [primary keyword]

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"

git push origin main
```

### Step 8: Post-Publication Monitoring (30 days)

**Week 1:**
- [ ] Verify post is live and loads correctly
- [ ] Check Google Search Console for indexing
- [ ] Monitor initial traffic in analytics
- [ ] Share on social if applicable

**Week 2-4:**
- [ ] Track rankings for primary keyword
- [ ] Check if featured snippet achieved for PAA questions
- [ ] Monitor time-on-page and bounce rate
- [ ] Note any page 1 rankings

**After 30 Days - Review Performance:**

**Success Metrics:**
- Primary keyword ranking page 1 ✅
- Featured snippet for PAA question ✅
- Average time-on-page > 3 minutes ✅
- Bounce rate < 60% ✅

**If metrics not met:**
- **Ranking page 2-3:** Add more internal links, refresh with new 2026 stats, expand content
- **Low time-on-page:** Improve opening hook, add more H2 subheads, include more concrete examples
- **High bounce rate:** Add "Related Posts" section, improve CTA clarity, check page load speed
- **No featured snippet:** Refine PAA answer to be more direct, use bullet points, add definition box

**Iteration:**
Update successful posts quarterly with:
- Fresh 2026 statistics
- New PAA questions discovered
- Additional case studies or examples
- Updated "What to Do This Week" based on trends

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

## Notes
- All blog posts must follow the CLAUDE.md copywriting framework
- Target length: 1200-2000 words
- Include specific data/statistics where possible
- CTA always links to contact.html
- Images stored in `/blog/images/`
- Maintain consistent brand voice: calm, confident, experienced
- **Reference `/blog/research/methodology-drift-keywords.md` for SEO optimization**
- Use PAA (People Also Ask) questions as H2 headers for featured snippet opportunities
- Answer PAA questions directly (40-60 words) then expand with examples
- Connect all content back to core theme: methodology drift prevention

## Keeping Keywords Fresh

**Automatic (Every Blog Post):**
- WebSearch fetches current PAA questions and trends
- Real-time data ensures relevance
- No manual updates needed

**Manual Refresh (Monthly Recommended):**
To update the base keyword research file, run:
```
/blog-research-update [topic]
```

This will:
1. Search for latest PAA questions across all core topics
2. Identify trending sales/coaching keywords for 2026
3. Update `/blog/research/methodology-drift-keywords.md`
4. Flag new blog post opportunities

**Core Topics to Monitor:**
- methodology drift
- sales training ROI
- sales coaching automation
- AI sales coaching
- [methodology name] sales training (Sandler, MEDDIC, etc.)
