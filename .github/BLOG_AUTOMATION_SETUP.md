# Blog Automation Setup Guide

This guide explains how to set up automated blog post generation for One Click Coaching.

## Overview

The automation system generates blog posts **every Tuesday and Thursday at 9:00 AM EST** using:
- **Claude API** (Anthropic) - Content generation
- **Nano Banana 2 API** (Kie.ai) - Cover image generation
- **GitHub Actions** - Scheduling and PR creation

## How It Works

1. **Scheduled Trigger** - GitHub Actions runs on Tuesdays and Thursdays at 9am EST
2. **Topic Research** - AI analyzes trending topics and keyword research
3. **Content Generation** - Complete blog post created following CLAUDE.md framework
4. **Image Generation** - Cover image created using Nano Banana 2 (no garbled text)
5. **PR Creation** - Pull request created with draft blog post for review
6. **Review & Merge** - You review the PR, check quality checklist, and merge to publish

## Required API Keys

### 1. Anthropic API Key

**Purpose:** Content generation using Claude API

**Get your key:**
1. Go to https://console.anthropic.com/
2. Sign up or log in
3. Navigate to API Keys
4. Create a new key
5. Copy the key (starts with `sk-ant-`)

**Cost:** ~$0.50-1.00 per blog post (Claude Sonnet 4.5)

### 2. Kie.ai API Key

**Purpose:** Blog cover image generation (Nano Banana 2)

**Get your key:**
1. Go to https://kie.ai/dashboard
2. Sign up or log in
3. Navigate to API Keys
4. Create a new key
5. Copy the key

**Cost:** ~$0.04 per image (1K resolution)

## GitHub Secrets Setup

Add both API keys as **repository secrets**:

### Step 1: Navigate to Secrets

1. Go to your GitHub repository: `https://github.com/JohnHCunningham/one-click-coaching-website`
2. Click **Settings**
3. In the left sidebar, expand **Secrets and variables**
4. Click **Actions**

### Step 2: Add ANTHROPIC_API_KEY

1. Click **New repository secret**
2. Name: `ANTHROPIC_API_KEY`
3. Value: Paste your Anthropic API key (starts with `sk-ant-`)
4. Click **Add secret**

### Step 3: Add KIE_API_KEY

1. Click **New repository secret**
2. Name: `KIE_API_KEY`
3. Value: Paste your Kie.ai API key
4. Click **Add secret**

### Step 4: Verify Setup

Both secrets should now appear in the list:
- ✅ `ANTHROPIC_API_KEY`
- ✅ `KIE_API_KEY`
- ✅ `GITHUB_TOKEN` (automatically provided, no setup needed)

## Testing the Automation

### Manual Trigger (Recommended for First Test)

1. Go to **Actions** tab in GitHub
2. Select **Automated Blog Post Generation** workflow
3. Click **Run workflow** dropdown
4. Click **Run workflow** button
5. Wait 2-5 minutes for completion
6. Check **Pull Requests** for the generated draft

### Review the Generated PR

The PR will include:
- Blog post HTML file (`blog/[slug].html`)
- Cover image (`blog/images/[slug].png`)
- Updated blog listing (`blog.html`)
- Quality checklist to review

### Quality Checklist

Before merging, verify:
- [ ] Content reads well (read it aloud)
- [ ] 4-6 rhetorical devices used
- [ ] Statistics have sources
- [ ] Concrete examples included
- [ ] "What to Do This Week" section present
- [ ] FAQ section addresses objections
- [ ] All links work
- [ ] Image displays correctly
- [ ] SEO meta tags complete
- [ ] Brand voice maintained

### Merge to Publish

Once you've reviewed and approved:
1. Click **Merge pull request**
2. Confirm merge
3. Vercel automatically deploys the updated site
4. New blog post is live at `oneclickcoaching.com/blog/[slug].html`

## Schedule

The workflow runs automatically on:
- **Tuesdays at 9:00 AM EST** (14:00 UTC)
- **Thursdays at 9:00 AM EST** (14:00 UTC)

You'll receive a notification when a new PR is created.

## Customization

### Change Schedule

Edit `.github/workflows/blog-automation.yml`:

```yaml
on:
  schedule:
    # Change these cron expressions
    - cron: '0 14 * * 2'  # Tuesday 9am EST
    - cron: '0 14 * * 4'  # Thursday 9am EST
```

Cron format: `minute hour day-of-month month day-of-week`

Examples:
- `0 14 * * 1` - Mondays at 9am EST
- `0 17 * * 3` - Wednesdays at 12pm EST (noon)
- `0 13 * * 1,3,5` - Mon/Wed/Fri at 8am EST

### Adjust Image Resolution

Edit `utils/generate-scheduled-blog.js` to use 4K images:

```javascript
input: {
  prompt: prompt,
  aspect_ratio: '1:1',
  resolution: '4K',  // Change from '1K' to '4K'
  output_format: 'png'
}
```

**Note:** 4K costs more (~$0.15 vs $0.04)

## Troubleshooting

### Workflow Fails

**Check:**
1. API keys are set correctly in GitHub Secrets
2. API keys have sufficient credits
3. Review workflow logs in Actions tab

**Common errors:**
- `ANTHROPIC_API_KEY not found` - Secret not set or misspelled
- `KIE_API_KEY not found` - Secret not set or misspelled
- `Image generation timeout` - Kie.ai service may be slow, re-run workflow
- `Failed to create PR` - Check repository permissions

### No PR Created

**Verify:**
1. Workflow completed successfully (check Actions tab)
2. No existing branch with same name
3. GitHub token has write permissions (automatic, but check Settings > Actions > General > Workflow permissions)

### Poor Quality Content

**Solutions:**
1. Update keyword research: `/blog/research/methodology-drift-keywords.md`
2. Refine CLAUDE.md framework for better voice
3. Add more examples to blog skill documentation
4. Manually edit the PR before merging

## Monitoring

### View Workflow Runs

1. Go to **Actions** tab
2. Click **Automated Blog Post Generation**
3. See history of all runs (success/failure)

### Check Logs

1. Click on a specific workflow run
2. Click **generate-blog-post** job
3. Expand steps to see detailed logs
4. Download **blog-generation-log** artifact for full output

### Track Costs

- **Anthropic Console:** https://console.anthropic.com/settings/usage
- **Kie.ai Dashboard:** https://kie.ai/dashboard (check credits)

Expected monthly cost:
- 8 blog posts/month × $0.50 (Claude) = $4.00
- 8 images/month × $0.04 (Kie.ai) = $0.32
- **Total: ~$4.32/month**

## Disabling Automation

To pause scheduled posts:

### Option 1: Disable Workflow

1. Go to **Actions** tab
2. Click **Automated Blog Post Generation**
3. Click **⋯** (three dots)
4. Click **Disable workflow**

### Option 2: Delete Schedule

Edit `.github/workflows/blog-automation.yml` and remove the `schedule:` section, keeping only `workflow_dispatch:` for manual triggers.

## Support

If issues persist:
1. Check workflow logs in Actions tab
2. Review error messages in failed runs
3. Verify all secrets are set correctly
4. Test manually using `workflow_dispatch`

---

**Last Updated:** 2026-05-02
**Version:** 1.0.0
