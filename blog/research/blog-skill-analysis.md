# Blog Skill Analysis & Review

**Skill File:** `.claude/skills/blog.md`
**Date Analyzed:** May 2, 2026
**Current Status:** Workflow documentation (not registered as executable command)

---

## Overall Assessment

| Criterion | Score | Grade |
|-----------|-------|-------|
| **Process Completeness** | 8.5/10 | B+ |
| **Actionability** | 9/10 | A |
| **Keyword Strategy** | 9/10 | A |
| **Quality Control** | 7/10 | C+ |
| **Automation Readiness** | 6/10 | D+ |
| **OVERALL** | **7.9/10** | **B** |

**Summary:** Strong workflow with excellent research and writing guidance, but lacks quality gates, post-creation review, and true automation.

---

## 1. PROCESS COMPLETENESS (8.5/10)

### ✅ Strengths

**Clear 5-Step Workflow:**
1. Research & Outline ✅
2. Write Using CLAUDE.md ✅
3. Generate Cover Image ✅
4. Create HTML File ✅
5. Update Blog Listing ✅

Each step has specific instructions and deliverables.

**Research Phase is Excellent:**
- Uses WebSearch for fresh 2026 data
- Targets PAA questions systematically
- Cross-references existing keyword database
- Gathers statistics and pain points
- Plans rhetorical devices upfront

**Copywriting Framework Integration:**
- Explicitly follows CLAUDE.md structure
- Requires 4-6 rhetorical devices
- Mandates data-driven content
- Enforces brand voice (calm, confident, experienced)
- Short paragraphs (1-3 lines)

**SEO Optimization Built-In:**
- PAA questions as H2 headers
- Featured snippet opportunities identified
- 40-60 word direct answers required
- Internal linking to methodology drift theme

### ⚠️ Weaknesses

1. **No Quality Gates**
   - Missing: "Review checklist before publishing"
   - Missing: "Did you include 4-6 rhetorical devices? Check."
   - Missing: "Are all stats cited with sources?"

2. **No Post-Creation Review**
   - Doesn't specify when/how to review the finished post
   - No "re-read for errors" step
   - No "test all links" requirement

3. **Image Generation Outdated**
   - Says "Claude Sonnet 4.5's built-in image generation" (incorrect)
   - Says "No API key needed" (incorrect - uses OpenAI API)
   - Needs update to reflect DALL-E 2 automation

4. **Missing Content Improvements Section**
   - Doesn't mention adding FAQ sections
   - Doesn't mention "What to Do This Week" tactical steps
   - Doesn't reference the blog review findings

**Recommendation:** Add Step 6: "Quality Review & Improvements"

---

## 2. ACTIONABILITY (9/10)

### ✅ Strengths

**Step-by-Step Instructions:**
Every step has clear, executable actions:
- "Use WebSearch to research the topic with these queries: ..."
- "Select 3-5 PAA questions to answer as H2 headers"
- "Save to `/blog/[slug].html`"

**Specific Search Queries Provided:**
```
- "{topic}" people also ask 2026
- "sales {topic}" trends 2026
- "{topic}" questions salespeople ask
- "{topic}" statistics data
```

**Clear Success Criteria:**
- 1200-2000 words
- 4-6 rhetorical devices
- Data-driven (specific numbers)
- CTA links to contact.html

**Template Variables Defined:**
- TITLE, SLUG, EXCERPT, CATEGORY, READING_TIME, DATE, KEYWORDS, CONTENT, TAGS

### ⚠️ Weaknesses

1. **No "What If" Guidance**
   - What if WebSearch returns no PAA questions?
   - What if topic doesn't relate to methodology drift?
   - What if no 2026 statistics available?

2. **Missing Examples for Each Step**
   - Research phase: No example of good vs. bad outline
   - Writing phase: No example of strong vs. weak opening
   - Image prompt: No example of good vs. bad image description

3. **No Error Recovery**
   - Image generation fails → what's the fallback?
   - Can't find 4-6 rhetorical devices → what do you do?
   - Blog.html update conflicts → how to resolve?

**Recommendation:** Add "Common Issues & Solutions" appendix

---

## 3. KEYWORD STRATEGY (9/10)

### ✅ Strengths

**Automatic Fresh Research:**
- WebSearch runs for every blog post
- Targets current year (2026) data
- Identifies trending searches
- Discovers new PAA questions

**Systematic PAA Integration:**
- Uses PAA questions as H2 headers
- Answers questions directly (40-60 words)
- Expands with examples
- Links back to methodology drift theme

**Keyword Database Maintained:**
- References `/blog/research/methodology-drift-keywords.md`
- Cross-checks existing strategy
- Maintains proven high-performing keywords

**Manual Refresh Process Documented:**
- `/blog-research-update [topic]` command
- Monthly cadence recommended
- Updates base keyword file
- Flags new opportunities

**Core Topics Defined:**
- methodology drift
- sales training ROI
- sales coaching automation
- AI sales coaching
- [methodology name] sales training

### ⚠️ Weaknesses

1. **No Keyword Difficulty Assessment**
   - Doesn't check if keyword is too competitive
   - Doesn't suggest easier alternatives if primary is hard
   - No volume estimates

2. **No Internal Linking Strategy**
   - Mentions "link to contact.html" but nothing about linking between blog posts
   - Missing: "Link to related posts when mentioning similar topics"

3. **No Competitor Analysis**
   - Doesn't check what competitors are ranking for
   - Doesn't identify content gaps
   - Misses differentiation opportunities

**Recommendation:** Add competitive keyword analysis step

---

## 4. QUALITY CONTROL (7/10)

### ✅ Strengths

**Brand Voice Enforced:**
- Calm, confident, experienced
- No hype, no fluff, no clichés
- Pattern recognition over persuasion

**Framework Compliance:**
- Must follow CLAUDE.md structure
- Requires specific rhetorical devices
- Mandates short paragraphs

**Data Requirements:**
- Must cite specific numbers
- Must include recent statistics
- Must link to authoritative sources

### ⚠️ Weaknesses (CRITICAL)

1. **No Pre-Publish Checklist**
   ```
   Missing:
   [ ] All links tested and working
   [ ] Images load correctly
   [ ] SEO meta tags complete
   [ ] Sources cited for all statistics
   [ ] 4-6 rhetorical devices used
   [ ] CTA links to correct page
   [ ] Spelling/grammar checked
   [ ] Read time accurate
   ```

2. **No Peer Review**
   - Doesn't suggest having someone else read it
   - No "wait 1 hour and re-read" recommendation
   - No tone/voice verification

3. **No A/B Testing Guidance**
   - Doesn't mention testing different headlines
   - No guidance on tracking performance
   - Missing: "Monitor rankings and traffic for 30 days"

4. **No Post-Publication Review**
   - Doesn't specify when to review and improve
   - No "update old posts quarterly" guidance
   - Missing analytics integration

**Recommendation:** Add mandatory pre-publish quality checklist

---

## 5. AUTOMATION READINESS (6/10)

### ✅ Strengths

**Clear Input/Output:**
- Input: Topic/keyword
- Output: Complete blog post + image + updated listing

**Repeatable Process:**
- Same 5 steps every time
- Consistent format
- Standardized structure

**Tool Integration:**
- WebSearch for research
- OpenAI API for images (partially automated)
- Template-based HTML generation

### ⚠️ Weaknesses (MAJOR GAPS)

1. **Not Actually Executable as `/blog` Command**
   - Exists as documentation only
   - Requires manual execution of each step
   - Can't run `/ blog [topic]` and get a finished post

2. **Manual Steps Required:**
   - Reading search results
   - Writing the content (most time-consuming)
   - Crafting rhetorical devices
   - Editing and polishing
   - Quality review

3. **No Integration Between Steps:**
   - Research output doesn't automatically feed into writing
   - Writing output doesn't automatically populate HTML template
   - Image generation is separate manual command
   - Blog listing update is manual edit

4. **No State Management:**
   - Can't pause mid-workflow and resume
   - No "draft" state vs "published"
   - No version control beyond git

### What True Automation Would Look Like:

```bash
$ /blog "the 3-3-3 rule in sales"

✅ Researching... (WebSearch)
  - Found 12 PAA questions
  - Found 7 2026 statistics
  - Identified featured snippet opportunity

✅ Outlining... (AI)
  - Selected 5 PAA questions as H2s
  - Mapped CLAUDE.md structure
  - Planned 6 rhetorical devices

✅ Writing... (AI + CLAUDE.md framework)
  - 1,847 words generated
  - 6 rhetorical devices included
  - 7 sources cited
  - Tricolon: "They know... believe... execute"
  - Antithesis: "Training teaches knowledge. Pressure demands execution."

✅ Generating image... (DALL-E 2)
  - Saved to /blog/images/3-3-3-rule.png

✅ Creating HTML... (Template)
  - Saved to /blog/3-3-3-rule-fails-without-reinforcement.html
  - SEO meta tags added
  - Analytics script included

✅ Updating blog listing... (blog.html)
  - New post card prepended

✅ Quality Check...
  ⚠️  Warning: Only 5 rhetorical devices found (target: 6)
  ✅ All links tested
  ✅ Image loads correctly
  ✅ Reading time: 7 min

📝 Draft created. Review before publishing.
```

**Current Reality:** Each step is manual, requiring copy/paste and editing.

**Recommendation:** Either:
- Build true automation (complex)
- Or reframe as "Blog Creation Workflow Checklist" (honest about manual process)

---

## CRITICAL GAPS

### 1. Missing: Tactical Next Steps Section

**Issue:** Blog posts educate but don't always drive action.

**Fix:** Add to workflow:
```markdown
### Step 2.5: Add Tactical Section

Before the CTA, include:

## What [Audience] Should Do This Week

1. [Actionable step with clear outcome]
2. [Actionable step with clear outcome]
3. [Actionable step with clear outcome]

Then ask: [Decision question that positions solution]
```

**Example from 3-3-3 post:**
- Audit one rep's last 5 calls
- Ask team about % methodology adherence
- Test same-day feedback with one rep
- Then decide: Keep guessing or start measuring?

### 2. Missing: FAQ/Objection Handling

**Issue:** Sales leaders have common objections not addressed.

**Fix:** Add to workflow:
```markdown
### Step 2.6: Address Objections

Add FAQ section addressing:

1. **Most common objection to solution**
   - Example: "Isn't this micromanagement?"

2. **Competitive alternative question**
   - Example: "We use Gong/Chorus. How is this different?"

3. **Timeline/ROI question**
   - Example: "How long until we see results?"

Answer each in 2-3 sentences. Be direct, not defensive.
```

### 3. Missing: Post-Publication Checklist

**Issue:** No quality gate before publishing.

**Fix:** Add Step 6:
```markdown
### Step 6: Pre-Publish Quality Review

Before committing and pushing:

**Content Quality:**
- [ ] Read entire post aloud (catches awkward phrasing)
- [ ] Verify 4-6 rhetorical devices used (list them)
- [ ] Check all statistics have sources linked
- [ ] Confirm CTA links to correct page
- [ ] Verify reading time is accurate

**Technical Quality:**
- [ ] Test all external links (open in new tabs)
- [ ] Verify image loads and displays correctly
- [ ] Check SEO meta description (under 160 characters)
- [ ] Confirm alt text on image describes content
- [ ] Verify slug is lowercase-with-hyphens

**SEO Quality:**
- [ ] Primary keyword in title, H1, first paragraph
- [ ] At least 3 H2s answer PAA questions
- [ ] Internal links to other blog posts (when available)
- [ ] Sources section includes all cited links

**Voice Quality:**
- [ ] Tone is calm, confident, experienced (not excited/desperate)
- [ ] No buzzwords, fluff, or clichés
- [ ] Insight over persuasion
- [ ] Pattern recognition clear

If all boxes checked → Push to production
If any boxes unchecked → Fix, then re-review
```

### 4. Missing: Post-Performance Tracking

**Issue:** No guidance on measuring success or iterating.

**Fix:** Add Step 7:
```markdown
### Step 7: Post-Publication Monitoring (Days 1-30)

**Week 1:**
- [ ] Check Google Search Console for indexing
- [ ] Monitor rankings for primary keyword
- [ ] Review traffic in analytics
- [ ] Check social shares (if shared)

**Week 2-4:**
- [ ] Track featured snippet achievement
- [ ] Monitor page 1 ranking progress
- [ ] Identify which PAA questions are ranking
- [ ] Note time-on-page and bounce rate

**After 30 Days:**
- [ ] If ranking page 2-3: Add more internal links, refresh with new stats
- [ ] If low time-on-page: Improve opening hook, add more subheads
- [ ] If high bounce: Add related posts links, improve CTA clarity

**Success Metrics:**
- Primary keyword ranking page 1 within 30 days
- Featured snippet for PAA question
- Average time-on-page > 3 minutes
- Bounce rate < 60%
```

---

## SKILL COMPARISON: As-Is vs. Should-Be

### Current Skill (What It Says)

```
1. Research topic
2. Write blog post
3. Generate image
4. Create HTML
5. Update listing
```

**Result:** Manual execution of documented process

### Ideal Skill (What It Should Be)

**Option A: Fully Automated**
```
/blog [topic] → Complete blog post ready to review
```
- AI researches, writes, generates image, creates files
- Human reviews and approves before publishing
- Requires significant AI orchestration

**Option B: Semi-Automated (Realistic)**
```
/blog [topic] → Guided workflow with automation where possible
```
- Step 1: Auto-research (WebSearch + compile results)
- Step 2: Human writes with AI assistance (rhetorical device suggestions)
- Step 3: Auto-generate image (already works)
- Step 4: Auto-create HTML from template
- Step 5: Auto-update blog listing
- Step 6: Quality checklist (human reviews)
- Step 7: Git commit helper

**Option C: Workflow Checklist (Current Reality)**
```
Follow blog.md workflow manually
```
- Honest about what's manual vs. automated
- Clear checkboxes for each step
- No false promises of `/blog` command

**Recommendation:** Implement Option B (Semi-Automated) OR rebrand as "Blog Creation Playbook"

---

## RECOMMENDED IMPROVEMENTS

### High Priority (Do Now)

1. **Add Pre-Publish Quality Checklist**
   - 20 checkboxes covering content, technical, SEO, voice
   - Required before git push
   - Catches errors before publication

2. **Update Image Generation Instructions**
   - Current says "Claude generates images natively" (incorrect)
   - Should say "Uses OpenAI DALL-E 2 API"
   - Should reference `utils/generate-blog-image.js`

3. **Add Tactical Steps Requirement**
   - "What to Do This Week" section
   - 3 actionable items
   - Decision question

4. **Add FAQ/Objections Section Requirement**
   - 3 common questions addressed
   - 2-3 sentence answers
   - Direct, not defensive tone

### Medium Priority (Next Version)

5. **Add Competitor Analysis Step**
   - Check what's ranking for target keyword
   - Identify content gaps
   - Differentiate angle

6. **Add Internal Linking Strategy**
   - Link to related posts
   - Link to pricing/contact where relevant
   - Build topic clusters

7. **Add Post-Performance Monitoring**
   - 30-day tracking plan
   - Success metrics defined
   - Iteration guidelines

8. **Create Quality Control Templates**
   - Good vs. bad opening examples
   - Strong vs. weak CTA examples
   - Effective vs. ineffective rhetorical device usage

### Low Priority (Future)

9. **Build True Automation**
   - Executable `/blog [topic]` command
   - AI orchestration across all steps
   - Human review gate before publishing

10. **Add A/B Testing Framework**
    - Test different headlines
    - Test different CTAs
    - Track conversion rates

---

## FINAL VERDICT

**Current Grade: B (7.9/10)**

**The blog skill is a solid workflow document** with excellent research and writing guidance. It successfully produced an A+ blog post (the 3-3-3 rule article).

### What Works:
- ✅ Clear step-by-step process
- ✅ Strong keyword research methodology
- ✅ Enforces CLAUDE.md framework
- ✅ SEO optimization built-in
- ✅ Brand voice consistency

### What's Missing:
- ❌ No quality control checklist
- ❌ Not actually executable as `/blog` command
- ❌ Missing tactical steps and FAQ requirements
- ❌ No post-publication tracking
- ❌ Outdated image generation info

### Recommendation:

**Short-term:** Add the 4 high-priority improvements (quality checklist, update image info, add tactical/FAQ requirements). **Grade improvement: B → A-**

**Long-term:** Either build true automation or rebrand as "Blog Creation Playbook" and be honest about manual process. **Potential grade: A**

The skill successfully guided creation of a high-quality blog post, which proves the process works. Now formalize the quality gates that were added manually (tactical steps, FAQ, review checklist) so every post gets them by default.

---

## NEXT STEPS

1. Update `blog.md` with quality checklist
2. Correct image generation documentation
3. Add tactical steps + FAQ requirements
4. Test workflow on next blog post ("30-60-90 rule")
5. Refine based on what worked/didn't work
6. Build automation incrementally (research → writing → HTML generation)
