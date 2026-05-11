# Implementation Guide - Claude Workflow Reorganization

**Status:** Ready to implement
**Time Required:** 15-20 minutes
**Difficulty:** Easy (mostly deleting and moving configs)

---

## What We're Fixing

**The Problem:** You've been using Claude Code for content creation and have skills/MCPs in the wrong places.

**The Solution:** Clean up Desktop skills, move MCPs to Desktop, establish clear separation.

---

## Implementation Steps (Do in Order)

### Phase 1: Clean Up Claude Desktop Skills (5 minutes)

#### Skills to Remove

These 4 skills should be **deleted** from Claude Desktop:

1. **`mcp-builder`**
   - Why remove: This is development work - just ask Claude Code "build an MCP for X" when needed
   - No skill required

2. **`skill-creator`**
   - Why remove: Meta-skill - just ask Claude Desktop "create a skill for X" when needed
   - No skill required

3. **`canvas-design`**
   - Why remove: Early automation attempt you're not using anymore
   - If you need it again, recreate it then

4. **`theme-factory`**
   - Why remove: Early automation attempt you're not using anymore
   - If you need it again, recreate it then

#### How to Remove Skills in Claude Desktop

**Instructions:**
1. Open Claude Desktop application
2. Go to Skills section (usually in left sidebar)
3. Find each skill listed above
4. Click the skill
5. Look for "Delete" or "Remove" option (usually three-dot menu or trash icon)
6. Confirm deletion
7. Repeat for all 4 skills

**After removal, you should have exactly 4 skills in Desktop:**
- ✅ `occ-cmo` (Marketing, content, strategy)
- ✅ `cold-email-sequence` (Email campaigns)
- ✅ `b2b-copy` (Copywriting)
- ✅ `aa-speech` (Speech writing)

---

### Phase 2: Move MCPs from Code to Desktop (10 minutes)

**The Problem:** All 6 of your MCPs are configured for Code but should be in Desktop.

**MCPs to move:**
- Notion (content databases)
- Gamma (presentations)
- Gmail (email)
- Google Drive (documents)
- Google Calendar (scheduling)
- Buffer (social media)

#### Step 2A: Find Your Claude Desktop MCP Config

The config file location depends on your operating system:

**macOS (your system):**
```
~/Library/Application Support/Claude/claude_desktop_config.json
```

**Alternative macOS location:**
```
~/.config/claude/claude_desktop_config.json
```

**How to find it:**
1. Open Terminal
2. Run this command:
```bash
find ~ -name "claude_desktop_config.json" 2>/dev/null
```

This will show you the exact path.

#### Step 2B: Understanding the Config Structure

Your Desktop config should look like this:

```json
{
  "mcpServers": {
    "claude.ai Gmail": {
      "command": "npx",
      "args": ["-y", "@claude.ai/mcp-server-gmail"]
    },
    "claude.ai Google Drive": {
      "command": "npx",
      "args": ["-y", "@claude.ai/mcp-server-google-drive"]
    },
    "claude.ai Google Calendar": {
      "command": "npx",
      "args": ["-y", "@claude.ai/mcp-server-google-calendar"]
    },
    "claude.ai Notion": {
      "command": "npx",
      "args": ["-y", "@claude.ai/mcp-server-notion"]
    },
    "claude.ai Gamma": {
      "command": "npx",
      "args": ["-y", "@claude.ai/mcp-server-gamma"]
    },
    "buffer": {
      "command": "npx",
      "args": ["-y", "@bufferapp/mcp-server"]
    }
  }
}
```

#### Step 2C: Add MCPs to Desktop Config

**Option 1: Manual Edit (Recommended if comfortable with JSON)**

1. Open the config file in a text editor:
```bash
open ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

2. Add the `mcpServers` section shown above

3. Save the file

4. Restart Claude Desktop

**Option 2: Let Claude Code Help**

Since you're currently in Claude Code, I can help you create/update this file:

1. First, let me check if the config exists:
```bash
cat ~/Library/Application\ Support/Claude/claude_desktop_config.json 2>/dev/null || echo "Config not found"
```

2. If it doesn't exist, I'll create it with the right structure
3. If it exists, I'll show you what to add

Would you like me to do this for you right now?

#### Step 2D: Verify MCPs in Desktop

After editing config and restarting Desktop:

1. Open Claude Desktop
2. Create a new project (test project)
3. Type "@" and see if you can select MCPs
4. You should see: Gmail, Google Drive, Google Calendar, Notion, Gamma, Buffer

**If they appear:** ✅ Success!
**If they don't appear:** Check the config file for JSON syntax errors

#### Step 2E: Remove MCPs from Code (Optional)

**Note:** The MCPs in Code aren't hurting anything, but if you want a clean separation:

1. Find your Claude Code config: `~/.claude/config.json`
2. Remove or comment out the MCP entries
3. Restart Claude Code

**I recommend leaving them for now** - they don't cause issues in Code, and you might occasionally need them for blog automation.

---

### Phase 3: Test Your New Setup (5 minutes)

#### Test 1: Content Creation in Desktop

1. Open Claude Desktop
2. Create project: "Test - LinkedIn Post"
3. Attach `occ-cmo` skill
4. Ask: "Write a LinkedIn post about sales coaching consistency. 200 words. Use antithesis as a rhetorical device."
5. Verify Claude uses the occ-cmo references and CLAUDE.md framework

**Expected result:** Claude writes a post using the content strategy references, brand voice, and rhetorical devices.

#### Test 2: Development in Code

1. Terminal: `cd ~/one-click-coaching-website`
2. Run: `claude`
3. Ask: "Show me the current blog automation workflow file"
4. Verify Claude can read files and provide technical analysis

**Expected result:** Claude reads `.github/workflows/blog-automation.yml` and explains it.

#### Test 3: MCPs in Desktop

1. In Claude Desktop, create project: "Test - MCP Access"
2. Ask: "List my recent Gmail messages" (requires Gmail MCP)
3. Or: "Show my Google Calendar events for this week" (requires Calendar MCP)

**Expected result:** Claude uses the MCP to fetch your data.

---

## What You Were Doing Wrong (Real Examples)

Let me show you specific scenarios where you used the wrong tool:

### Example 1: Blog Post Creation ❌ → ✅

**What you did (WRONG):**
- Opened Claude Code
- Asked "write a blog post about sales coaching"
- Struggled because Code doesn't have content skills or MCP access

**What you should do (RIGHT):**
- Open Claude Desktop
- Create project: "Blog - Sales Coaching Topic"
- Attach `occ-cmo` skill
- Ask for blog post using content strategy references
- Copy result, then switch to Code to commit HTML file

**Tool Decision:**
- Content creation = Desktop
- File system operations (committing) = Code

---

### Example 2: Debugging GitHub Actions ✅ (You got this right!)

**What you did (CORRECT):**
- Used Claude Code
- Debugged `.github/workflows/blog-automation.yml`
- Fixed JSON parsing issues
- Committed changes

**Why this was right:**
- Development task
- File system access needed
- Git operations needed

---

### Example 3: Marketing Strategy (If you did this in Code ❌)

**Wrong approach:**
- Claude Code
- Asked about competitor analysis
- Asked to write cold emails

**Right approach:**
- Claude Desktop
- Create project: "Q2 2026 Marketing Strategy"
- Attach `occ-cmo` skill
- Use web search + market intelligence references
- Access Gmail/Drive MCPs if needed for data

---

### Example 4: Kanban Board Work

**For marketing kanban (content planning):**
- Desktop: Plan content, create task descriptions
- Code: If you need to modify the HTML/JS files

**For daily schedule:**
- Desktop: Review and plan tasks
- Code: If you need to modify functionality

---

## Quick Reference Card (Print This)

```
┌─────────────────────────────────────────────────┐
│ CLAUDE DESKTOP                                  │
├─────────────────────────────────────────────────┤
│ Use for:                                        │
│  • Writing LinkedIn posts                       │
│  • Creating email sequences                     │
│  • Competitive analysis                         │
│  • Blog post content (not file operations)      │
│  • Presentations (via Gamma)                    │
│  • Email management (via Gmail)                 │
│  • Strategy & planning                          │
│                                                  │
│ Skills Available:                               │
│  • occ-cmo                                      │
│  • cold-email-sequence                          │
│  • b2b-copy                                     │
│  • aa-speech                                    │
│                                                  │
│ MCPs Available:                                 │
│  • Gmail, Drive, Calendar, Notion               │
│  • Gamma, Buffer                                │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ CLAUDE CODE                                     │
├─────────────────────────────────────────────────┤
│ Use for:                                        │
│  • Writing/editing code                         │
│  • Debugging                                    │
│  • Git operations (commit, PR, push)            │
│  • File system operations                       │
│  • Automation scripts                           │
│  • GitHub Actions workflows                     │
│                                                  │
│ Skills Available:                               │
│  • blog.md (blog automation)                    │
│  • blog-research-update.md                      │
│                                                  │
│ MCPs Available:                                 │
│  • None needed (has file access)                │
└─────────────────────────────────────────────────┘
```

---

## Common Scenarios - Decision Matrix

| Scenario | Desktop or Code? | Why |
|----------|------------------|-----|
| Write LinkedIn post | Desktop + occ-cmo | Content creation |
| Debug blog script | Code | Development |
| Create presentation | Desktop + Gamma | Content + MCP |
| Fix website bug | Code | Code editing |
| Research competitors | Desktop + occ-cmo | Research + web search |
| Write cold email | Desktop + cold-email-sequence | Content |
| Commit blog post HTML | Code | Git operations |
| Plan content calendar | Desktop | Strategic planning |
| Update npm packages | Code | Development |
| Write landing page copy | Desktop + b2b-copy | Copywriting |

---

## Checklist: Am I Using the Right Tool?

### Before Starting ANY Task

Ask yourself:

**Question 1:** "Am I writing or editing code?"
- YES → Use Claude Code
- NO → Continue to Question 2

**Question 2:** "Am I creating content (writing, strategy, research)?"
- YES → Use Claude Desktop
- NO → Continue to Question 3

**Question 3:** "Do I need to access email/calendar/docs/presentations?"
- YES → Use Claude Desktop (MCPs)
- NO → You might be doing a mixed task - consider which is primary

**Question 4:** "Do I need git operations or file system changes?"
- YES → Use Claude Code
- NO → Use Claude Desktop

**Still unsure?** → Default to Desktop (easier to switch if wrong)

---

## What Success Looks Like After Implementation

### Desktop (Content & Strategy)
```
✅ 4 skills: occ-cmo, cold-email-sequence, b2b-copy, aa-speech
✅ 6 MCPs: Gmail, Drive, Calendar, Notion, Gamma, Buffer
✅ Used for all content creation
✅ Used for all marketing strategy
✅ Never used for writing code
```

### Code (Development)
```
✅ 2 skills: blog.md, blog-research-update.md
✅ 0-6 MCPs: (optional - can keep them here too)
✅ Used for all code editing
✅ Used for all git operations
✅ Used for all debugging
✅ Never used for writing content
```

### Your Workflow (Clear Separation)
```
✅ You know instantly which tool to open
✅ No more "where do I do this?" confusion
✅ Each tool has the right resources
✅ Faster, more efficient work
```

---

## Troubleshooting

### "I can't find the Desktop MCP config file"

Try all these locations:
```bash
# Try 1
ls ~/Library/Application\ Support/Claude/claude_desktop_config.json

# Try 2
ls ~/.config/claude/claude_desktop_config.json

# Try 3 (search everywhere)
find ~ -name "claude_desktop_config.json" 2>/dev/null
```

If none exist, create it:
```bash
mkdir -p ~/Library/Application\ Support/Claude
touch ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

### "MCPs don't show up in Desktop after restart"

1. Check JSON syntax - use a JSON validator
2. Ensure you saved the file
3. Completely quit Desktop (not just close window) and reopen
4. Check Desktop logs for errors (usually in app menu → Help → Logs)

### "I deleted a skill I actually needed"

Skills in Desktop are just markdown files. If you have a backup or can describe what it did, you can recreate it easily.

### "I'm still confused about which tool to use"

Open `DESKTOP-VS-CODE-QUICK-REF.md` and find your scenario in the table. Follow what it says.

---

## Need Help Implementing?

I'm right here in Claude Code. I can:

1. ✅ Check if your Desktop config file exists
2. ✅ Create the MCP config for you
3. ✅ Verify the JSON is valid
4. ✅ Test that everything works

Just say: "Help me implement the MCP migration" and I'll walk you through it step by step.

---

## After Implementation

### Week 1: Build the Habit
- Reference `DESKTOP-VS-CODE-QUICK-REF.md` before every task
- Notice when you start in the wrong tool and correct yourself
- Track scenarios that weren't in the guide

### Week 2: Reinforce
- Should feel more natural
- Reduced reference to guides
- Clear mental model forming

### Week 3+: Automatic
- Instant tool selection
- No more confusion
- Workflow feels seamless

---

**Ready to implement?** Start with Phase 1 (removing Desktop skills) - it's the easiest and most immediate impact.

**Need help?** I'm here in Claude Code ready to assist with the technical parts (MCP config file creation/editing).

**Created by:** Claude Sonnet 4.5
**Date:** May 6, 2026
