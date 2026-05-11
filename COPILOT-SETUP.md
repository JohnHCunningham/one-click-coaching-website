# OCC Copilot Setup Guide

Follow these steps to get your Slack bot running.

---

## Step 1: Provision Database (5 minutes)

### Option A: Vercel Dashboard (Easiest)

1. Go to https://vercel.com/johncunninghams-projects-7f2beb2e/one-click-coaching-website/stores
2. Click "Create Database"
3. Select "Postgres" (powered by Neon)
4. Name it: `occ-copilot-db`
5. Click "Create"

Vercel will automatically add these env vars to all environments:
- `POSTGRES_URL`
- `POSTGRES_PRISMA_URL`
- `POSTGRES_URL_NON_POOLING`
- etc.

### Option B: Vercel CLI (Alternative)

```bash
vercel link  # If not already linked
vercel env ls  # Check current env vars
# Follow prompts in dashboard to create Postgres
```

---

## Step 2: Run Database Migration (2 minutes)

Pull your new Postgres credentials locally:

```bash
vercel env pull .env.local
```

Now run the schema:

```bash
# If you have psql installed:
psql $POSTGRES_URL -f lib/copilot/schema.sql

# Or using the Vercel Data tab:
# 1. Go to https://vercel.com/.../stores/[your-postgres-store]
# 2. Click "Data" tab → "SQL Editor"
# 3. Copy/paste contents of lib/copilot/schema.sql
# 4. Click "Run Query"
```

Verify tables were created:

```bash
psql $POSTGRES_URL -c "\dt"
```

Should show:
- `teams`
- `users`
- `copilot_interactions`
- `copilot_feedback`

---

## Step 3: Create Slack App (15 minutes)

### 3.1 Create the App

1. Go to https://api.slack.com/apps
2. Click **"Create New App"** → **"From scratch"**
3. App Name: `OCC Copilot`
4. Pick a workspace: Select your Slack workspace (or create a dev workspace)
5. Click **"Create App"**

---

### 3.2 Configure OAuth Scopes

1. In the left sidebar, click **"OAuth & Permissions"**
2. Scroll to **"Bot Token Scopes"**
3. Click **"Add an OAuth Scope"** and add these scopes:
   - `app_mentions:read` - Listen for @mentions
   - `chat:write` - Send messages
   - `users:read` - Get user info
   - `channels:read` - Read channel names

---

### 3.3 Install to Workspace

1. Still on **"OAuth & Permissions"** page
2. Scroll to top, click **"Install to Workspace"**
3. Review permissions, click **"Allow"**
4. **Copy the "Bot User OAuth Token"** (starts with `xoxb-`)
   - Save this - you'll need it in Step 4

---

### 3.4 Get Signing Secret

1. In the left sidebar, click **"Basic Information"**
2. Scroll to **"App Credentials"**
3. Find **"Signing Secret"**
4. Click **"Show"**, then copy it
   - Save this - you'll need it in Step 4

---

### 3.5 Enable Event Subscriptions (DO THIS AFTER STEP 4)

**WAIT!** Don't do this yet. We need to deploy the API endpoint first (Step 5).

Once deployed, come back here and:

1. In the left sidebar, click **"Event Subscriptions"**
2. Toggle **"Enable Events"** to **ON**
3. **Request URL:** `https://one-click-coaching-website.vercel.app/api/copilot/message`
   - Slack will send a challenge request
   - Your endpoint must respond with the challenge
   - You'll see ✅ "Verified" when it works
4. Scroll to **"Subscribe to bot events"**
5. Click **"Add Bot User Event"**
6. Add: `app_mention`
7. Click **"Save Changes"**

---

### 3.6 Enable Interactivity (DO THIS AFTER STEP 4)

**WAIT!** Don't do this yet. We need to deploy the API endpoint first (Step 5).

Once deployed, come back here and:

1. In the left sidebar, click **"Interactivity & Shortcuts"**
2. Toggle **"Interactivity"** to **ON**
3. **Request URL:** `https://one-click-coaching-website.vercel.app/api/copilot/feedback`
4. Click **"Save Changes"**

---

## Step 4: Add Environment Variables to Vercel (5 minutes)

Add these Slack credentials to all Vercel environments:

```bash
# Add Slack Bot Token
echo "xoxb-YOUR-BOT-TOKEN" | vercel env add SLACK_BOT_TOKEN production
echo "xoxb-YOUR-BOT-TOKEN" | vercel env add SLACK_BOT_TOKEN preview
echo "xoxb-YOUR-BOT-TOKEN" | vercel env add SLACK_BOT_TOKEN development

# Add Slack Signing Secret
echo "YOUR-SIGNING-SECRET" | vercel env add SLACK_SIGNING_SECRET production
echo "YOUR-SIGNING-SECRET" | vercel env add SLACK_SIGNING_SECRET preview
echo "YOUR-SIGNING-SECRET" | vercel env add SLACK_SIGNING_SECRET development

# Pull to local
vercel env pull .env.local
```

Verify your `.env.local` now has:
- ✅ `ANTHROPIC_API_KEY`
- ✅ `SLACK_BOT_TOKEN`
- ✅ `SLACK_SIGNING_SECRET`
- ✅ `POSTGRES_URL`

---

## Step 5: Deploy API Endpoints (Next step)

We'll create the API endpoints next, then deploy them.

After deploying, you'll come back to Slack app settings and finish Step 3.5 and 3.6.

---

## Verification Checklist

Before moving on:

- [ ] Database provisioned
- [ ] Schema tables created (4 tables)
- [ ] Slack app created
- [ ] Bot token copied (`xoxb-...`)
- [ ] Signing secret copied
- [ ] Environment variables added to Vercel
- [ ] `.env.local` has all required vars

---

## Next: Build the API Endpoints

Continue to next message for API endpoint creation!
