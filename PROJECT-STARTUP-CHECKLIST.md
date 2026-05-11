# Project Startup Checklist
**How to properly start new projects in Claude Desktop and Claude Code**

---

## Before You Start ANY Project

### Step 0: Decide the Tool First

**Ask yourself ONE question:**
> "Is this project fundamentally about writing/editing code?"

- **YES** → Use Claude Code (skip to Code checklist below)
- **NO** → Use Claude Desktop (skip to Desktop checklist below)

**Still unsure?** Reference `DESKTOP-VS-CODE-QUICK-REF.md`

---

## Starting a Content/Marketing Project (Claude Desktop)

### ✅ Proper Order of Operations

#### 1. Open Claude Desktop
- Launch the application
- Don't jump into an existing project yet

#### 2. Create a New Project
- Click "New Project" or "Create Project"
- **Name it descriptively:**
  - ✅ GOOD: "OCC LinkedIn Content Q2 2026"
  - ✅ GOOD: "Sandler Partner Outreach Campaign"
  - ✅ GOOD: "Blog Post - Sales Coaching ROI"
  - ❌ BAD: "Project 1"
  - ❌ BAD: "Work"
  - ❌ BAD: "Untitled"

**Why projects matter:**
- Keeps conversation history organized
- Maintains context across sessions
- You can attach skills and files specific to that project

#### 3. Attach Relevant Skills
**Before you ask Claude to do anything**, attach the right skills:

**Marketing/Strategy work?**
- Attach `occ-cmo`

**Writing cold emails?**
- Attach `occ-cmo` AND `cold-email-sequence`

**Writing landing page copy?**
- Attach `occ-cmo` AND `b2b-copy`

**Writing a speech?**
- Attach `aa-speech`

**Multiple content types in one project?**
- Attach ALL relevant skills upfront

**How to attach skills:**
1. Look for "Skills" or "Add Skills" in project sidebar
2. Select from your available skills
3. Skills load their reference files automatically

#### 4. Load Necessary Context Files
If you need Claude to reference specific documents:
- Upload files to the project (PDFs, docs, spreadsheets)
- Or reference them via MCP (Google Drive, Notion)

#### 5. State Your Objective Clearly
Don't just say "help with marketing"

✅ **GOOD opening messages:**
- "I need to write a LinkedIn post about the perception gap in sales coaching. Target audience: VPs of Sales who invested in Sandler. Use the content strategy from occ-cmo references."
- "Create a cold email sequence for Sandler franchisees. 3 emails, focus on partner value proposition. Reference partner-strategy.md."
- "Write landing page copy for OCC's Growth tier ($489/mo). Target: mid-market B2B companies, 10-15 reps, using Sandler."

❌ **BAD opening messages:**
- "I need marketing help"
- "Write a post"
- "Help with OCC"

#### 6. Iterate and Refine
- Ask for revisions
- Reference the brand voice guidelines
- Ensure rhetorical devices are used (if content)
- Check that data is cited

#### 7. Export/Save Results
- Copy final content to destination (LinkedIn, email tool, website)
- Or use MCPs to publish directly (Buffer for social, Gmail for email drafts)

### 🚫 Common Mistakes (Desktop Projects)

| Mistake | Why It's Wrong | Fix |
|---------|----------------|-----|
| Starting without creating a project | Lost context, no skill attachment | Always create project first |
| Not attaching skills upfront | Claude doesn't have access to references | Attach before asking for work |
| Vague initial prompt | Claude has to guess intent | Be specific about deliverable |
| Asking Desktop to edit code files | Desktop can't access file system | Use Claude Code instead |
| Forgetting to specify voice/tone | Output doesn't match brand | Reference occ-cmo or CLAUDE.md |

---

## Starting a Development Project (Claude Code)

### ✅ Proper Order of Operations

#### 1. Open Terminal
- Use your preferred terminal app
- Don't open Claude Code yet

#### 2. Navigate to Repository
```bash
cd /path/to/your/repository
```

**Example:**
```bash
cd ~/one-click-coaching-website
```

**Why this matters:**
- Claude Code uses your current directory as workspace
- It gets access to all files in that directory
- It can read repository-specific skills from `.claude/skills/`

#### 3. Verify You're in the Right Place
```bash
pwd  # Print working directory
ls   # List files to confirm
```

**Check:**
- Are you in the correct repository?
- Can you see the files you need to work on?

#### 4. Start Claude Code
```bash
claude
```

This launches the Claude Code CLI in the current directory.

#### 5. State Your Objective Clearly
Claude Code automatically has access to:
- All files in current directory
- Git repository information
- Repository-specific skills (`.claude/skills/*.md`)

✅ **GOOD opening messages:**
- "The blog automation GitHub Action is failing. Error code 5. Debug the workflow file and fix the JSON parsing issue."
- "Add a new feature: show reading time estimate on each blog post card in blog.html. Should be calculated from word count."
- "Refactor generate-scheduled-blog.js to use streaming API responses. Current max_tokens is too low."

❌ **BAD opening messages:**
- "Fix my code"
- "Something's broken"
- "Help with the website"

#### 6. Let Claude Work
Claude Code will:
- Read relevant files automatically
- Suggest changes
- Write/edit files as needed
- Run commands if needed (npm, git, etc.)
- Explain what it's doing

#### 7. Review Changes
Before committing:
- Review the diff: `git diff`
- Test the changes
- Ensure nothing broke

#### 8. Commit and Push (If Appropriate)
If the changes are good:
- Let Claude create the commit
- Or do it manually: `git add . && git commit -m "message" && git push`

### 🚫 Common Mistakes (Code Projects)

| Mistake | Why It's Wrong | Fix |
|---------|----------------|-----|
| Starting `claude` in wrong directory | Can't access files you need | Always `cd` to repo first |
| Asking Code to write blog posts | Use Desktop for content | Use Desktop + occ-cmo |
| Not reviewing changes before commit | Risk breaking production | Always review diffs |
| Creating "coding skills" unnecessarily | Code has dev tools built-in | Just describe the task |
| Expecting MCPs to be available | Code doesn't need content MCPs | Use file system directly |

---

## Special Case: Blog Automation (Uses Both Tools)

**This is the rare case where you use BOTH tools:**

### For Manual Blog Writing
**Use:** Claude Desktop
1. Create project: "Blog Post - [Topic]"
2. Attach `occ-cmo` skill
3. Ask Claude to research topic and write post
4. Review and refine content
5. Copy final HTML to repository manually
6. Use Claude Code to commit and push

### For Automated Blog Generation
**Use:** Claude Code
1. `cd ~/one-click-coaching-website`
2. `claude`
3. Ask Claude to debug/improve the automation script
4. Test: `node utils/generate-scheduled-blog.js`
5. Review generated post
6. Commit changes if needed

**Key Insight:** Desktop creates content. Code automates systems.

---

## Decision Matrix: Project Startup

| Project Type | Tool | Skills Needed | MCPs Needed |
|--------------|------|---------------|-------------|
| LinkedIn content calendar | Desktop | occ-cmo | Buffer (optional) |
| Cold email campaign | Desktop | occ-cmo, cold-email-sequence | Gmail (optional) |
| Landing page copywriting | Desktop | occ-cmo, b2b-copy | None |
| Investor pitch deck | Desktop | occ-cmo, aa-speech | Gamma |
| Bug fix in website | Code | None (built-in tools) | None |
| New website feature | Code | blog.md (if blog-related) | None |
| Automate content publishing | Code | None | None |
| Debug GitHub Actions | Code | None | None |
| Competitive analysis report | Desktop | occ-cmo | Notion (optional) |
| Partner outreach sequence | Desktop | occ-cmo | Gmail (optional) |

---

## Checklist: "Am I Starting This Project Correctly?"

### For Desktop Projects
- [ ] Created a new project with descriptive name?
- [ ] Attached all relevant skills before asking for work?
- [ ] Opened necessary context files or MCPs?
- [ ] Stated objective clearly with target audience, deliverable, and constraints?

### For Code Projects
- [ ] Navigated to correct repository directory?
- [ ] Verified with `pwd` and `ls`?
- [ ] Started `claude` from correct location?
- [ ] Stated objective clearly with specific files/features to change?

---

## What Success Looks Like

### Desktop Project (Done Right)
```
✅ Project created: "OCC Blog - Sales Coaching Perception Gap"
✅ Skills attached: occ-cmo
✅ Prompt: "Write a 1500-word blog post about the perception gap
   between managers and reps on coaching effectiveness. Include
   2025 statistics, 4-6 rhetorical devices, What to Do This Week
   section, and FAQ. Target keyword: sales coaching effectiveness.
   Use CLAUDE.md framework."
✅ Claude generates post with all requirements
✅ Review, refine, copy to publish
```

### Code Project (Done Right)
```bash
✅ cd ~/one-click-coaching-website
✅ pwd  # Confirms correct directory
✅ claude  # Launches in right location
✅ Prompt: "The generate-scheduled-blog.js script is hitting token
   limits. Increase max_tokens to 32000 and add streaming support.
   Update line 150 in the file."
✅ Claude reads file, makes changes, explains
✅ Review diff: git diff utils/generate-scheduled-blog.js
✅ Test: node utils/generate-scheduled-blog.js
✅ Commit if successful
```

---

## Anti-Patterns to Avoid

### ❌ Anti-Pattern 1: "No Project Syndrome" (Desktop)
**What it looks like:**
- Opening Desktop and immediately asking for help without creating project
- Losing all context when you close the app
- Can't find previous work

**Fix:** Always create a project first, even for quick tasks.

### ❌ Anti-Pattern 2: "Wrong Directory Syndrome" (Code)
**What it looks like:**
- Running `claude` from home directory or desktop
- Asking Claude to edit files it can't see
- Getting errors about missing files

**Fix:** Always `cd` to repository before starting `claude`.

### ❌ Anti-Pattern 3: "Skill Overload" (Desktop)
**What it looks like:**
- Attaching every skill to every project "just in case"
- Claude gets confused about which context to use
- Slower performance, mixed messaging

**Fix:** Only attach skills relevant to the specific deliverable.

### ❌ Anti-Pattern 4: "Zero Context Prompt"
**What it looks like:**
- "Help with marketing" (Desktop)
- "Fix this" (Code)
- "I need content" (Desktop)

**Fix:** State objective, deliverable, audience, and constraints upfront.

---

## Quick Start Templates

### Template: Marketing Content (Desktop)
```
Project Name: [Topic] - [Format] - [Date]
Skills: occ-cmo, [other if needed]
First Prompt:
"I need [deliverable] for [audience] about [topic].
Key points to cover: [list].
Brand voice: [calm/confident/experienced per CLAUDE.md].
Deliverable format: [LinkedIn post/email/landing page].
Length: [word count or structure].
Due: [date if time-sensitive]."
```

### Template: Development Task (Code)
```bash
cd /path/to/repo
claude

First Prompt:
"I need to [add feature/fix bug/refactor] in [file or component].
Current behavior: [what happens now].
Desired behavior: [what should happen].
Constraints: [technology, dependencies, style guide].
Files involved: [list if known]."
```

---

## Order of Operations - Visual Summary

### Claude Desktop Flow
```
1. Open Desktop
   ↓
2. Create Project (descriptive name)
   ↓
3. Attach Skills (occ-cmo, etc.)
   ↓
4. Load Context (files, MCPs)
   ↓
5. Clear Prompt (deliverable + audience + constraints)
   ↓
6. Iterate & Refine
   ↓
7. Export/Publish Results
```

### Claude Code Flow
```
1. Open Terminal
   ↓
2. cd /path/to/repository
   ↓
3. Verify location (pwd, ls)
   ↓
4. claude
   ↓
5. Clear Prompt (specific task + files)
   ↓
6. Review Changes (git diff)
   ↓
7. Test
   ↓
8. Commit & Push (if successful)
```

---

## Remember

**Desktop:** Projects → Skills → Context → Prompt → Publish
**Code:** Directory → Launch → Prompt → Review → Commit

**The most common mistake:** Skipping steps or starting in the wrong place.

**The easiest fix:** Follow this checklist every single time until it becomes habit.

---

**Created by:** Claude Sonnet 4.5
**Date:** May 6, 2026
**For:** One Click Coaching workflow optimization
