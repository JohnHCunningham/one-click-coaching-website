# Claude Desktop vs Code - Quick Reference

**Print this. Bookmark this. Reference this every time you're unsure.**

---

## The 10-Second Decision

```
Writing code?          → Claude Code
Creating content?      → Claude Desktop
Using docs/email/cal?  → Claude Desktop (MCPs)
Debugging/git work?    → Claude Code
```

---

## Real Scenarios

| I need to... | Use | Why |
|--------------|-----|-----|
| Write a LinkedIn post | Desktop | Content creation with `occ-cmo` |
| Fix a bug in the website | Code | File access + git |
| Create a presentation | Desktop | Gamma MCP |
| Write a cold email sequence | Desktop | `cold-email-sequence` skill |
| Debug GitHub Actions | Code | Dev tools + file access |
| Research competitors | Desktop | Web search + `occ-cmo` |
| Add a new website feature | Code | Writing code |
| Draft a blog post | Desktop | Content + `occ-cmo` |
| Automate blog publishing | Code | File system + git + automation |
| Prep for discovery call | Desktop | `occ-cmo` sales enablement |
| Build an MCP server | Code | Development task |
| Analyze LinkedIn performance | Desktop | `occ-cmo` + data analysis |
| Update dependencies | Code | npm/package management |
| Write speech for conference | Desktop | `aa-speech` skill |
| Create git commit/PR | Code | Git integration |

---

## Your Skills Cheat Sheet

### Claude Desktop Skills
- `occ-cmo` - Marketing, content, strategy, positioning
- `cold-email-sequence` - Email campaigns
- `b2b-copy` - Landing pages, ads, copy
- `aa-speech` - Speeches, presentations

### Claude Code Skills (This Repo)
- `blog.md` - Blog automation
- `blog-research-update.md` - Keyword research

---

## MCPs: Where They Belong

**Claude Desktop:**
- Notion (content databases)
- Gamma (presentations)
- Gmail (email)
- Google Drive (documents)
- Google Calendar (scheduling)
- Buffer (social media)

**Claude Code:**
- None needed (has file system access by default)

---

## Starting a Session

### Desktop
```
1. Open Claude Desktop
2. Create new project or open existing
3. Attach relevant skill (occ-cmo, b2b-copy, etc.)
4. Start working
```

### Code
```bash
cd /path/to/repository
claude
# Start working - Claude has file access + git
```

---

## Red Flags (You're Using the Wrong Tool)

**Using Desktop when you should use Code:**
- ❌ "Can you edit this file?" → Use Code (file access)
- ❌ "Can you commit this?" → Use Code (git integration)
- ❌ "Can you debug this script?" → Use Code (dev tools)

**Using Code when you should use Desktop:**
- ❌ "Write a LinkedIn post" → Use Desktop (content skills)
- ❌ "Create a presentation" → Use Desktop (Gamma MCP)
- ❌ "Check my email" → Use Desktop (Gmail MCP)
- ❌ "Schedule a meeting" → Use Desktop (Calendar MCP)

---

## When in Doubt

**Ask yourself:** "Is this fundamentally about code or content?"
- Code → Claude Code
- Content → Claude Desktop

**Still unsure?** → Start with Desktop (easier to switch)

---

## Emergency Contact

**If something isn't working:**
- Desktop: `/help` command
- Code: `claude --help`
- Issues: github.com/anthropics/claude-code/issues

---

**Last Updated:** May 6, 2026
**Created by:** Claude Sonnet 4.5
