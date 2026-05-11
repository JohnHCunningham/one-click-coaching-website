# Claude Workflow Organization Guide

**Last Updated:** May 6, 2026
**For:** John Cunningham - One Click Coaching

---

## The Simple Rule

| Tool | Use For | Don't Use For |
|------|---------|---------------|
| **Claude Desktop** | Content creation, marketing strategy, research, presentations, documents | Writing code, debugging, git operations |
| **Claude Code** | Software development, coding, debugging, git workflows, automation scripts | Writing blog posts, creating presentations, email sequences |

---

## Your Current Setup - Audit Results

### Skills in Claude Desktop (From Screenshot)

| Skill Name | Keep? | Recommendation |
|------------|-------|----------------|
| `occ-cmo` | ✅ YES | Marketing/content strategy - belongs in Desktop |
| `cold-email-sequence` | ✅ YES | Email writing - belongs in Desktop |
| `b2b-copy` | ✅ YES | Copywriting - belongs in Desktop |
| `aa-speech` | ✅ YES | Speech writing - belongs in Desktop |
| `canvas-design` | ⚠️ REVIEW | If design work → keep. If code → remove |
| `theme-factory` | ⚠️ REVIEW | If design themes → keep. If code generation → remove |
| `mcp-builder` | ❌ REMOVE | Development task - just ask Claude Code when needed |
| `skill-creator` | ❌ REMOVE | Meta-skill - just ask Claude to create skills when needed |

### Skills in Claude Code (This Repository)

Located in `/Users/johncunningham/one-click-coaching-website/.claude/skills/`:

| Skill Name | Keep? | Recommendation |
|------------|-------|----------------|
| `blog.md` | ✅ YES | Blog automation requires file system access |
| `blog-research-update.md` | ✅ YES | Research automation requires web search + file writes |
| `occ-cmo.md` | ⚠️ DUPLICATE | Same as Desktop version - see below |

**The `occ-cmo` Duplication Problem:**
- You have `occ-cmo` in BOTH Claude Desktop AND Claude Code
- This creates confusion about which to use
- **Solution:** Keep it in Desktop for general marketing work, use Code version only for blog automation in this repo

### MCP Servers (Currently Configured)

All MCPs are content/productivity tools (not development tools):

| MCP Server | Current Location | Correct? | Recommendation |
|------------|------------------|----------|----------------|
| Notion | Claude Code | ⚠️ | Should be in Desktop (content/notes) |
| Gamma | Claude Code | ⚠️ | Should be in Desktop (presentations) |
| Gmail | Claude Code | ⚠️ | Should be in Desktop (email) |
| Google Drive | Claude Code | ⚠️ | Should be in Desktop (documents) |
| Google Calendar | Claude Code | ⚠️ | Should be in Desktop (scheduling) |
| Buffer | Claude Code | ⚠️ | Should be in Desktop (social media) |

**Finding:** All your MCPs are in the wrong place. They should be in Claude Desktop, not Claude Code.

---

## Reorganization Plan

### Phase 1: Clean Up Claude Desktop Skills

**REMOVE these skills (no longer needed):**
1. `mcp-builder` - Just ask Claude Code "build an MCP server for X" when needed
2. `skill-creator` - Just ask Claude "create a skill for X" when needed

**REVIEW and decide:**
3. `canvas-design` - Is this for design work or code?
4. `theme-factory` - Is this for design themes or code generation?

**KEEP these skills (they're perfect for Desktop):**
5. `occ-cmo` - Marketing strategy, content, positioning
6. `cold-email-sequence` - Email writing
7. `b2b-copy` - Copywriting
8. `aa-speech` - Speech writing

### Phase 2: Simplify `occ-cmo` Skill

The `occ-cmo` skill is doing a LOT (11+ different responsibilities). Consider splitting it:

**Option A: Keep as One "CMO Brain" Skill (Recommended)**
- Leave it as-is since it has a module system with reference files
- The modular structure already organizes the complexity well

**Option B: Split Into Multiple Skills**
- `occ-content` - LinkedIn posts, blog strategy, round planning
- `occ-outreach` - Cold emails, icebreakers, sequences
- `occ-competitive` - Market positioning, objection handling
- `occ-sales` - Discovery calls, demos, qualification
- `occ-partners` - Sandler franchisee outreach
- `occ-seo` - Backlink building, HARO, guest posts

**My Recommendation:** Keep it as one skill. The reference files already provide good organization.

### Phase 3: Fix `occ-cmo` Duplication

**Current State:**
- `occ-cmo` in Claude Desktop (for general marketing)
- `occ-cmo` in Claude Code repository (for blog automation)

**Recommended Solution:**
- Keep full `occ-cmo` in Claude Desktop
- Remove `occ-cmo.md` from this Code repository
- When using Code for blog automation, rely on `blog.md` skill instead
- The blog skill already references `CLAUDE.md` for copywriting framework

**Why:** This prevents confusion about which version to use.

### Phase 4: Move MCPs to Claude Desktop

**All these MCPs should be in Claude Desktop config**, not Code:
- Notion (notes, databases, content planning)
- Gamma (presentations)
- Gmail (email management)
- Google Drive (documents, content storage)
- Google Calendar (scheduling)
- Buffer (social media posting)

**How to move them:**
1. Find your Claude Desktop MCP config file (location varies by OS)
2. Copy the MCP server configurations from Code to Desktop
3. Remove them from Code config (if they exist there)
4. Restart both applications

---

## Order of Operations - Fresh Start

### Starting a Marketing/Content Project

**Tool:** Claude Desktop

1. Open Claude Desktop
2. Create a new project with descriptive name
3. Attach relevant skills:
   - `occ-cmo` for any marketing work
   - `cold-email-sequence` for email campaigns
   - `b2b-copy` for landing pages, ads, copy
   - `aa-speech` for speeches or presentations
4. Use MCP servers to access data:
   - Gmail for email research
   - Google Drive for existing docs
   - Notion for content databases
   - Buffer for social media scheduling
5. Work on content, strategy, research
6. Export/save results to appropriate tools

### Starting a Development Project

**Tool:** Claude Code (CLI)

1. Open terminal
2. Navigate to repository: `cd /path/to/repo`
3. Start Claude Code: `claude`
4. Work on code, debugging, automation
5. Claude Code automatically has:
   - File system access
   - Git integration
   - Development tools
   - Repository-specific skills (like `blog.md`)
6. Don't create "coding skills" - Code already has all dev tools

### When Both Tools Are Needed

**Example:** Blog automation for One Click Coaching

- **Claude Desktop:** Write individual blog posts using `occ-cmo` skill for strategy and content
- **Claude Code:** Automate blog generation system, debug GitHub Actions, manage git workflow

**Key Insight:** Desktop creates content. Code automates systems.

---

## Decision Tree: Which Tool Should I Use?

```
Am I writing code or debugging?
├─ YES → Use Claude Code
└─ NO  → Am I creating content, research, or strategy?
          ├─ YES → Use Claude Desktop
          └─ NO  → Are you working with documents/presentations?
                   ├─ YES → Use Claude Desktop (with MCPs)
                   └─ NO  → Ask John to clarify the task
```

---

## Skills Best Practices

### When to Create a Skill

**CREATE a skill when:**
- You do the same type of work repeatedly (blog posts, cold emails, partner outreach)
- The task requires specific context, voice, or framework
- You need to maintain consistency across sessions
- Reference materials are needed (like occ-cmo references)

**DON'T create a skill when:**
- It's a one-time task
- Claude already has built-in tools (don't make an "MCP builder" skill)
- It's too meta (don't make a "skill creator" skill)
- You can just describe it in 1-2 sentences

### Skill Naming Convention

**Good names:**
- `occ-cmo` - Clear purpose (CMO work for OCC)
- `blog` - Simple and direct
- `cold-email-sequence` - Descriptive

**Avoid:**
- Generic names like `helper` or `assistant`
- Acronyms without context
- Overly complex names

### Skill Size Guidelines

**Right-sized skills:**
- 100-300 lines with clear sections
- Modular design (like occ-cmo with reference files)
- One primary purpose with related sub-tasks

**Too large:**
- Skills doing 20+ unrelated things
- Skills that should be split by domain
- Skills over 500 lines without modules

**Too small:**
- One-sentence skills that could just be prompts
- Skills that duplicate Claude's built-in capabilities

---

## Reference: Claude Desktop vs Claude Code Feature Comparison

| Feature | Claude Desktop | Claude Code |
|---------|---------------|-------------|
| **Interface** | GUI (web-based) | CLI (terminal) |
| **Projects** | ✅ Yes | ❌ No (use git repos) |
| **Skills** | ✅ Yes | ✅ Yes (repo-specific) |
| **MCP Servers** | ✅ Yes | ✅ Yes |
| **File Access** | ⚠️ Via MCPs only | ✅ Full file system |
| **Git Integration** | ❌ No | ✅ Native |
| **Code Editing** | ⚠️ Limited | ✅ Full featured |
| **Web Search** | ✅ Yes | ✅ Yes |
| **Image Generation** | ✅ Via MCPs | ⚠️ Via API only |
| **Long Conversations** | ✅ Projects persist | ⚠️ Session-based |
| **Best For** | Content, strategy, research | Development, automation |

---

## Next Steps

### Immediate Actions (This Week)

1. **Clean up Desktop skills:**
   - [ ] Remove `mcp-builder` skill
   - [ ] Remove `skill-creator` skill
   - [ ] Review `canvas-design` and `theme-factory` (keep or remove?)

2. **Fix occ-cmo duplication:**
   - [ ] Keep full version in Claude Desktop
   - [ ] Consider removing from Code repository (or keep for blog automation only)

3. **Move MCPs to Desktop:**
   - [ ] Configure Notion, Gamma, Gmail, Drive, Calendar, Buffer in Desktop config
   - [ ] Test that they work in Desktop
   - [ ] Remove from Code config (if present)

### Future Improvements (This Month)

4. **Create reference guide bookmark:**
   - [ ] Save this document somewhere accessible
   - [ ] Reference it when deciding Desktop vs Code

5. **Audit other repositories:**
   - [ ] Check other projects for similar skill duplication
   - [ ] Apply same cleanup process

6. **Establish workflow patterns:**
   - [ ] Document when you successfully use Desktop vs Code
   - [ ] Refine decision tree based on real usage

---

## Common Scenarios

### "I need to write a LinkedIn post about sales coaching"

**Use:** Claude Desktop
- Open Desktop → Create project → Attach `occ-cmo` skill
- Ask Claude to write the post using content strategy references
- Copy result to LinkedIn

### "I need to debug the blog automation GitHub Actions workflow"

**Use:** Claude Code
- Terminal: `cd ~/one-click-coaching-website`
- Run: `claude`
- Ask Claude to debug the workflow
- Claude reads files, suggests fixes, commits changes

### "I need to create a presentation about One Click Coaching for investors"

**Use:** Claude Desktop with Gamma MCP
- Open Desktop → Create project
- Ask Claude to generate presentation using Gamma
- Review and refine in Gamma editor

### "I need to analyze competitor positioning and write a cold email sequence"

**Use:** Claude Desktop
- Open Desktop → Create project → Attach `occ-cmo` and `cold-email-sequence`
- Ask Claude to research competitors (web search)
- Ask Claude to write email sequence based on findings
- Access Gmail via MCP if needed to send test emails

### "I need to build a new feature in the OCC website"

**Use:** Claude Code
- Terminal: `cd ~/one-click-coaching-website`
- Run: `claude`
- Describe the feature
- Claude writes code, creates files, tests, commits

---

## Questions & Clarifications

### "Should I ever use both tools at the same time?"

**Rarely.** Usually one tool is clearly better for the task.

**Exception:** Complex projects that span content + code (like blog automation):
- Desktop: Write the blog post content
- Code: Automate the publishing system

### "What if I'm not sure which tool to use?"

**Ask yourself:**
1. Am I writing/editing code? → Code
2. Am I creating content/strategy/research? → Desktop
3. Still unsure? → Start with Desktop (easier to switch)

### "Can I move skills between Desktop and Code?"

**Yes**, but they serve different purposes:
- Desktop skills: Content, marketing, research
- Code skills: Development tasks, automation

Copy the `.md` file to the appropriate location.

### "Should I have the same MCPs in both Desktop and Code?"

**No.** Keep them separate:
- Desktop MCPs: Content/productivity (Notion, Gmail, Drive, Gamma, Buffer)
- Code MCPs: Development tools (if any - usually not needed)

---

## Contact & Support

**This guide created by:** Claude Sonnet 4.5 (May 6, 2026)
**For:** One Click Coaching workflow organization
**Repository:** /Users/johncunningham/one-click-coaching-website

**If you need help:**
- Desktop: Type `/help` in Claude Desktop
- Code: Run `claude --help` in terminal
- Issues: https://github.com/anthropics/claude-code/issues
