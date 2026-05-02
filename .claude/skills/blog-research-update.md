# Blog Keyword Research Update Skill

## Command
`/blog-research-update [optional: specific topic]`

## Description
Refreshes the keyword research database with current PAA questions, trending searches, and SEO opportunities.

## What This Skill Does
1. Searches for latest "People Also Ask" questions across core topics
2. Identifies trending keywords in sales coaching/training space
3. Discovers new blog post opportunities
4. Updates `/blog/research/methodology-drift-keywords.md`
5. Flags high-priority content gaps

## Usage Examples
- `/blog-research-update` - Refresh all core topics
- `/blog-research-update sales methodology` - Focus on specific topic
- `/blog-research-update Sandler training` - Research specific methodology

## Workflow

### Step 1: Define Search Scope

**Default Core Topics (if no topic specified):**
- methodology drift
- sales training reinforcement
- sales coaching automation
- AI sales coaching
- Sandler sales training
- MEDDIC sales methodology
- sales process adherence
- sales training ROI

**Or use user-specified topic**

### Step 2: Research Current Keywords

For each topic, use WebSearch to find:

**Query 1: PAA Questions**
`"{topic}" people also ask 2026`
- Extract all PAA questions
- Note which appear most frequently
- Identify featured snippet opportunities

**Query 2: Trending Searches**
`"{topic}" trends 2026 site:trends.google.com OR site:semrush.com OR site:ahrefs.com`
- Current search volume trends
- Rising queries
- Seasonal patterns

**Query 3: Related Questions**
`"how to {topic}" OR "why {topic}" OR "what is {topic}" sales`
- Question-based queries
- Problem-focused searches
- Solution-seeking intent

**Query 4: Statistics & Data**
`"{topic}" statistics 2026 OR "{topic}" data 2026`
- Current industry stats
- Recent research findings
- Data points for blog posts

**Query 5: Competitor Content**
`"{topic}" blog site:gong.io OR site:chorus.ai OR site:salesloft.com`
- What competitors are writing about
- Content gaps to exploit
- Angles to differentiate

### Step 3: Analyze & Organize

**Group findings by:**
1. **High-Intent Questions** - Direct problem/solution searches
2. **Featured Snippet Opportunities** - Questions with quick answer boxes
3. **Long-Tail Keywords** - Specific, low-competition phrases
4. **Trend Keywords** - Rising searches worth targeting
5. **Content Gaps** - Topics competitors aren't covering

**For each keyword, note:**
- Search intent (informational, commercial, transactional)
- Difficulty (estimated competition level)
- Blog post potential (1-5 rating)
- Connection to methodology drift theme

### Step 4: Update Research File

Update `/blog/research/methodology-drift-keywords.md` with:

```markdown
# Methodology Drift - Keyword Research & SEO Strategy
*Last updated: [DATE]*

## Latest Trends (2026)
[New trending keywords discovered]

## High-Priority PAA Questions
[Questions with featured snippet opportunities]

## Blog Post Queue
### High Priority
1. [Topic] - [Why it's timely]
2. [Topic] - [Why it's timely]

### Medium Priority
[List]

### Research & Education
[Evergreen topics]

## Keywords by Intent

### Informational (Top of Funnel)
- [keyword] - [monthly searches estimate] - [difficulty]

### Commercial Investigation (Middle)
- [keyword] - [monthly searches estimate] - [difficulty]

### Transactional (Bottom)
- [keyword] - [monthly searches estimate] - [difficulty]

## Competitive Analysis
### Content Gaps We Can Fill
- [Gap] - [Opportunity]

### Angles to Differentiate
- [Competitor angle] → [Our unique angle]

## Recent Statistics & Data Points
- [Stat with source and date]
- [Stat with source and date]

## SEO Opportunities
### Featured Snippets We Can Target
- [Question] - [Current snippet holder]

### Related Searches to Incorporate
- [Search phrase]

---

[Previous research sections maintained below]
```

### Step 5: Generate Blog Post Recommendations

Output a prioritized list:

**Must Write This Month:**
1. [Title] - Targeting: [keyword] - Why: [trending/high volume/competitor gap]
2. [Title] - Targeting: [keyword] - Why: [reason]

**Write This Quarter:**
[List of 5-8 topics]

**Evergreen Backlog:**
[List of ongoing relevant topics]

## Output Format

After updating the research file, provide a summary:

```
✅ Keyword Research Updated

📊 New Findings:
- [X] new PAA questions discovered
- [X] trending keywords identified
- [X] content gaps found

🎯 High-Priority Blog Posts:
1. [Title] - [Keyword]
2. [Title] - [Keyword]
3. [Title] - [Keyword]

📈 Top Trending Topics:
- [Topic] (+XX% search volume)
- [Topic] (emerging keyword)

💡 Featured Snippet Opportunities:
- [Question 1]
- [Question 2]

📁 Updated: /blog/research/methodology-drift-keywords.md
```

## Best Practices

- Run this monthly minimum
- Run before planning quarterly content calendar
- Run when you notice traffic drops
- Run when entering new topic areas
- Always check 2026 (current year) data

## Notes

- Uses WebSearch exclusively (no API keys needed)
- Updates existing research file (doesn't replace)
- Maintains historical data while adding new insights
- Flags opportunities, you decide priorities
- Always connects back to methodology drift theme
