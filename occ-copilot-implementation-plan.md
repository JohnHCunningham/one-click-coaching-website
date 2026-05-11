# OCC Sales Copilot: Slack Bot Implementation Plan

> **Goal:** Build a Slack bot that helps sales reps execute Sandler methodology in real-time during calls.

**Timeline:** 1-2 weeks
**Effort:** ~40-60 hours
**Tech Stack:** Next.js, Vercel, Slack API, Claude API, Vercel Postgres

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Prerequisites](#prerequisites)
3. [Week 1: Core Bot Functionality](#week-1-core-bot-functionality)
4. [Week 2: Analytics & Refinement](#week-2-analytics--refinement)
5. [Database Schema](#database-schema)
6. [API Endpoints](#api-endpoints)
7. [Slack App Setup](#slack-app-setup)
8. [Testing Plan](#testing-plan)
9. [Launch Checklist](#launch-checklist)
10. [Post-Launch Roadmap](#post-launch-roadmap)

---

## Architecture Overview

### User Flow

```
┌─────────────────────────────────────────────────────────────┐
│  1. REP (in Slack during a call)                            │
│     Types: "@occ-copilot Give me pain funnel questions"    │
└─────────────────┬───────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────────────────────────┐
│  2. SLACK BOT receives message                              │
│     → Forwards to OCC backend via webhook                  │
└─────────────────┬───────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────────────────────────┐
│  3. OCC BACKEND (/api/copilot/message)                      │
│     → Receives Slack event                                 │
│     → Extracts user question                               │
│     → Matches question to intent (9 categories)            │
│     → Generates response using Claude + intent template    │
│     → Logs interaction to database                         │
└─────────────────┬───────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────────────────────────┐
│  4. SLACK BOT sends response                                │
│     → Formats response with rich formatting                │
│     → Adds "Was this helpful? 👍 👎" buttons               │
└─────────────────┬───────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────────────────────────┐
│  5. REP reads response during call                          │
│     → Uses Sandler guidance                                │
│     → Clicks 👍 or 👎 for feedback                        │
└─────────────────────────────────────────────────────────────┘
```

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│  SLACK WORKSPACE                                            │
│  • Sales reps message @occ-copilot                         │
│  • Bot responds in DM or channel                           │
└─────────────────┬───────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────────────────────────┐
│  VERCEL (Next.js App)                                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  /api/copilot/message                                       │
│  • Receives Slack app mentions                             │
│  • Validates Slack signature                               │
│  • Processes message                                       │
│                                                             │
│  /api/copilot/generate-response                             │
│  • Matches user question to intent                         │
│  • Loads response template from JSON                       │
│  • Calls Claude API to personalize response               │
│  • Returns formatted Slack message                         │
│                                                             │
│  /api/copilot/feedback                                      │
│  • Receives 👍 👎 button clicks                           │
│  • Logs feedback to database                               │
│  • Updates intent matching model                           │
│                                                             │
└─────────────────┬───────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────────────────────────┐
│  VERCEL POSTGRES (Database)                                 │
│  • copilot_interactions (usage logs)                       │
│  • copilot_feedback (thumbs up/down)                       │
│  • users (rep info)                                        │
│  • teams (workspace info)                                  │
└─────────────────────────────────────────────────────────────┘
                  ↑
┌─────────────────────────────────────────────────────────────┐
│  CLAUDE API                                                 │
│  • Intent classification                                   │
│  • Response personalization                                │
│  • Model: claude-sonnet-4-20250514                         │
└─────────────────────────────────────────────────────────────┘
```

---

## Prerequisites

### 1. Accounts & Access

- [x] Vercel account (already have)
- [ ] Slack workspace for development/testing
- [ ] Slack App created (see [Slack App Setup](#slack-app-setup))
- [x] Anthropic API key (already have)
- [ ] Vercel Postgres database provisioned

### 2. Development Environment

```bash
# Already have these:
- Node.js 24+
- Next.js project
- Git repository

# Need to add:
npm install @slack/web-api @slack/bolt
npm install @vercel/postgres
```

### 3. Environment Variables

Add to Vercel (all environments):

```bash
# Existing
ANTHROPIC_API_KEY=sk-ant-api03-...

# New - Slack
SLACK_BOT_TOKEN=xoxb-...
SLACK_SIGNING_SECRET=...
SLACK_APP_TOKEN=xapp-...

# New - Database
POSTGRES_URL=...  # Auto-provisioned by Vercel
```

---

## Week 1: Core Bot Functionality

### Day 1-2: Setup & Intent Matching

**Goal:** Bot can receive messages and match them to intents

**Tasks:**

1. **Create Slack App** (1 hour)
   - Follow [Slack App Setup](#slack-app-setup) guide below
   - Get bot token, signing secret, app token
   - Add to Vercel env vars

2. **Database Setup** (1 hour)
   ```bash
   # Provision Vercel Postgres
   vercel env add POSTGRES_URL production
   vercel env add POSTGRES_URL preview
   vercel env add POSTGRES_URL development

   # Create tables (see Database Schema below)
   ```

3. **Create Intent Matcher** (3 hours)
   - **File:** `lib/copilot/intent-matcher.ts`
   - Load `sales-copilot-intents.json`
   - Match user question to one of 9 intents
   - Use Claude for fuzzy matching

   ```typescript
   // lib/copilot/intent-matcher.ts
   import Anthropic from '@anthropic-ai/sdk';
   import intents from '@/sales-copilot-intents.json';

   const anthropic = new Anthropic({
     apiKey: process.env.ANTHROPIC_API_KEY,
   });

   export async function matchIntent(userQuestion: string) {
     // Use Claude to classify which intent matches best
     const prompt = `You are an intent classifier for a sales copilot.

Given this user question from a sales rep:
"${userQuestion}"

Match it to ONE of these intents:
${intents.map(i => `- ${i.name}: ${i.sample_user_utterances.join(', ')}`).join('\n')}

Return ONLY the intent name (e.g., "explore_pain"), nothing else.`;

     const message = await anthropic.messages.create({
       model: 'claude-sonnet-4-20250514',
       max_tokens: 50,
       messages: [{ role: 'user', content: prompt }]
     });

     const intentName = message.content[0].text.trim();
     return intents.find(i => i.name === intentName);
   }
   ```

4. **Create Response Generator** (3 hours)
   - **File:** `lib/copilot/response-generator.ts`
   - Takes matched intent + user context
   - Generates personalized Sandler response
   - Formats for Slack (markdown, buttons)

   ```typescript
   // lib/copilot/response-generator.ts
   import Anthropic from '@anthropic-ai/sdk';

   const anthropic = new Anthropic({
     apiKey: process.env.ANTHROPIC_API_KEY,
   });

   export async function generateResponse(
     intent: any,
     userQuestion: string,
     context?: string
   ) {
     const systemPrompt = `You are a Sandler-certified sales coach helping a rep in real-time during a call.

Intent: ${intent.name}
Stage: ${intent.stage}
Bot Behavior: ${intent.bot_behavior}

Available response templates:
${intent.response_templates.join('\n\n---\n\n')}

User's question: "${userQuestion}"
${context ? `Additional context: ${context}` : ''}

Generate a helpful, actionable response following Sandler methodology.
Keep it concise (2-3 paragraphs max) - they're on a live call.
Use the response templates as a guide but adapt to their specific question.`;

     const message = await anthropic.messages.create({
       model: 'claude-sonnet-4-20250514',
       max_tokens: 500,
       messages: [{ role: 'user', content: systemPrompt }]
     });

     return message.content[0].text;
   }
   ```

**Deliverable:** Intent matching + response generation working in isolation

---

### Day 3-4: Slack Integration

**Goal:** Bot receives messages in Slack and responds

**Tasks:**

1. **Create Slack Webhook Endpoint** (4 hours)
   - **File:** `app/api/copilot/message/route.ts`
   - Receives Slack events
   - Validates Slack signature
   - Processes app mentions
   - Responds to user

   ```typescript
   // app/api/copilot/message/route.ts
   import { NextRequest, NextResponse } from 'next/server';
   import { createHmac } from 'crypto';
   import { WebClient } from '@slack/web-api';
   import { matchIntent } from '@/lib/copilot/intent-matcher';
   import { generateResponse } from '@/lib/copilot/response-generator';
   import { logInteraction } from '@/lib/copilot/database';

   const slack = new WebClient(process.env.SLACK_BOT_TOKEN);

   export async function POST(request: NextRequest) {
     const body = await request.text();
     const timestamp = request.headers.get('x-slack-request-timestamp');
     const signature = request.headers.get('x-slack-signature');

     // Verify Slack signature
     if (!verifySlackSignature(body, timestamp, signature)) {
       return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
     }

     const event = JSON.parse(body);

     // Handle Slack URL verification
     if (event.type === 'url_verification') {
       return NextResponse.json({ challenge: event.challenge });
     }

     // Handle app mention
     if (event.event?.type === 'app_mention') {
       const { user, text, channel, ts } = event.event;

       // Extract question (remove @occ-copilot mention)
       const question = text.replace(/<@[\w]+>/g, '').trim();

       try {
         // Match intent
         const intent = await matchIntent(question);

         if (!intent) {
           await slack.chat.postMessage({
             channel,
             thread_ts: ts,
             text: "I'm not sure how to help with that. Try asking:\n• Give me pain funnel questions\n• They asked for pricing early\n• How do I handle 'think it over'?"
           });
           return NextResponse.json({ ok: true });
         }

         // Generate response
         const response = await generateResponse(intent, question);

         // Send to Slack with feedback buttons
         await slack.chat.postMessage({
           channel,
           thread_ts: ts,
           text: response,
           blocks: [
             {
               type: 'section',
               text: { type: 'mrkdwn', text: response }
             },
             {
               type: 'actions',
               elements: [
                 {
                   type: 'button',
                   text: { type: 'plain_text', text: '👍 Helpful' },
                   action_id: 'copilot_helpful',
                   value: `${user}:${intent.name}`
                 },
                 {
                   type: 'button',
                   text: { type: 'plain_text', text: '👎 Not helpful' },
                   action_id: 'copilot_not_helpful',
                   value: `${user}:${intent.name}`
                 }
               ]
             }
           ]
         });

         // Log interaction
         await logInteraction({
           user_id: user,
           question,
           intent_matched: intent.name,
           response,
           channel,
           timestamp: ts
         });

         return NextResponse.json({ ok: true });

       } catch (error) {
         console.error('Copilot error:', error);

         await slack.chat.postMessage({
           channel,
           thread_ts: ts,
           text: "Sorry, I'm having trouble right now. Please try again in a moment."
         });

         return NextResponse.json({ error: error.message }, { status: 500 });
       }
     }

     return NextResponse.json({ ok: true });
   }

   function verifySlackSignature(body: string, timestamp: string, signature: string): boolean {
     const signingSecret = process.env.SLACK_SIGNING_SECRET;
     const hmac = createHmac('sha256', signingSecret);
     const [version, hash] = signature.split('=');

     hmac.update(`${version}:${timestamp}:${body}`);
     const computedHash = hmac.digest('hex');

     return hash === computedHash;
   }
   ```

2. **Create Feedback Endpoint** (2 hours)
   - **File:** `app/api/copilot/feedback/route.ts`
   - Receives button clicks (👍 👎)
   - Logs feedback to database
   - Updates future intent matching

   ```typescript
   // app/api/copilot/feedback/route.ts
   import { NextRequest, NextResponse } from 'next/server';
   import { logFeedback } from '@/lib/copilot/database';

   export async function POST(request: NextRequest) {
     const body = await request.json();
     const payload = JSON.parse(body.payload);

     if (payload.type === 'block_actions') {
       const action = payload.actions[0];
       const [userId, intentName] = action.value.split(':');
       const helpful = action.action_id === 'copilot_helpful';

       await logFeedback({
         user_id: userId,
         intent_name: intentName,
         helpful,
         timestamp: new Date()
       });

       return NextResponse.json({ ok: true });
     }

     return NextResponse.json({ ok: true });
   }
   ```

3. **Database Functions** (2 hours)
   - **File:** `lib/copilot/database.ts`
   - Functions to log interactions and feedback

   ```typescript
   // lib/copilot/database.ts
   import { sql } from '@vercel/postgres';

   export async function logInteraction(data: {
     user_id: string;
     question: string;
     intent_matched: string;
     response: string;
     channel: string;
     timestamp: string;
   }) {
     await sql`
       INSERT INTO copilot_interactions
       (user_id, question, intent_matched, response, channel, slack_timestamp, created_at)
       VALUES
       (${data.user_id}, ${data.question}, ${data.intent_matched}, ${data.response}, ${data.channel}, ${data.timestamp}, NOW())
     `;
   }

   export async function logFeedback(data: {
     user_id: string;
     intent_name: string;
     helpful: boolean;
     timestamp: Date;
   }) {
     await sql`
       INSERT INTO copilot_feedback
       (user_id, intent_name, helpful, created_at)
       VALUES
       (${data.user_id}, ${data.intent_name}, ${data.helpful}, ${data.timestamp})
     `;
   }

   export async function getCopilotStats() {
     const result = await sql`
       SELECT
         COUNT(*) as total_interactions,
         COUNT(DISTINCT user_id) as unique_users,
         AVG(CASE WHEN cf.helpful THEN 1 ELSE 0 END)::float as helpfulness_rate
       FROM copilot_interactions ci
       LEFT JOIN copilot_feedback cf ON ci.user_id = cf.user_id AND ci.intent_matched = cf.intent_name
       WHERE ci.created_at > NOW() - INTERVAL '7 days'
     `;

     return result.rows[0];
   }
   ```

**Deliverable:** Working Slack bot that responds to @mentions

---

### Day 5: Testing & Refinement

**Goal:** Bot works reliably, handles edge cases

**Tasks:**

1. **Test All 9 Intents** (3 hours)
   - For each intent, test with 3-5 sample questions
   - Verify responses are helpful and accurate
   - Adjust intent matching if needed

2. **Handle Edge Cases** (2 hours)
   - User asks gibberish → "I'm not sure how to help"
   - User asks multiple questions → Clarify which one
   - User provides context → Use it in response

3. **Optimize Response Time** (2 hours)
   - Current: ~3-5 seconds (Claude API call)
   - Goal: <3 seconds
   - Consider: Cache common responses, faster model for intent matching

4. **Add Help Command** (1 hour)
   ```typescript
   // In message handler
   if (question.toLowerCase().includes('help')) {
     return `I can help you execute Sandler methodology during calls. Try asking:

📋 **Conversation starters:**
• "Give me pain funnel questions"
• "How do I start a Sandler call?"
• "Give me an upfront contract example"

💰 **Handling objections:**
• "They asked for pricing early"
• "They said 'too expensive'"
• "They said 'let me think about it'"

🎯 **Decision & close:**
• "How do I find the real decision maker?"
• "They said 'send a proposal'"
• "How do I set a clear next step?"

Just @ mention me anytime during a call!`;
   }
   ```

**Deliverable:** Reliable bot ready for beta testing

---

## Week 2: Analytics & Refinement

### Day 6-7: Analytics Dashboard

**Goal:** Track usage and prove value

**Tasks:**

1. **Create Admin Dashboard** (6 hours)
   - **File:** `app/admin/copilot/page.tsx`
   - Show key metrics:
     - Total interactions (last 7 days, 30 days, all time)
     - Unique users
     - Most common intents
     - Helpfulness rate (👍 vs 👎)
     - Peak usage times

   ```typescript
   // app/admin/copilot/page.tsx
   import { getCopilotStats, getIntentBreakdown, getTopUsers } from '@/lib/copilot/database';

   export default async function CopilotAdminPage() {
     const stats = await getCopilotStats();
     const intentBreakdown = await getIntentBreakdown();
     const topUsers = await getTopUsers();

     return (
       <div className="container mx-auto p-8">
         <h1 className="text-3xl font-bold mb-8">OCC Copilot Analytics</h1>

         {/* Key Metrics */}
         <div className="grid grid-cols-4 gap-4 mb-8">
           <MetricCard title="Total Interactions" value={stats.total_interactions} />
           <MetricCard title="Unique Users" value={stats.unique_users} />
           <MetricCard title="Helpfulness Rate" value={`${(stats.helpfulness_rate * 100).toFixed(1)}%`} />
           <MetricCard title="Avg per User" value={(stats.total_interactions / stats.unique_users).toFixed(1)} />
         </div>

         {/* Intent Breakdown */}
         <div className="mb-8">
           <h2 className="text-2xl font-bold mb-4">Most Common Questions</h2>
           <table className="w-full">
             <thead>
               <tr>
                 <th>Intent</th>
                 <th>Count</th>
                 <th>% of Total</th>
                 <th>Helpfulness</th>
               </tr>
             </thead>
             <tbody>
               {intentBreakdown.map(row => (
                 <tr key={row.intent_name}>
                   <td>{row.intent_name}</td>
                   <td>{row.count}</td>
                   <td>{((row.count / stats.total_interactions) * 100).toFixed(1)}%</td>
                   <td>{(row.helpfulness * 100).toFixed(0)}%</td>
                 </tr>
               ))}
             </tbody>
           </table>
         </div>

         {/* Top Users */}
         <div>
           <h2 className="text-2xl font-bold mb-4">Power Users</h2>
           <table className="w-full">
             <thead>
               <tr>
                 <th>User</th>
                 <th>Interactions</th>
                 <th>Avg per Day</th>
               </tr>
             </thead>
             <tbody>
               {topUsers.map(row => (
                 <tr key={row.user_id}>
                   <td>{row.user_id}</td>
                   <td>{row.interaction_count}</td>
                   <td>{row.avg_per_day}</td>
                 </tr>
               ))}
             </tbody>
           </table>
         </div>
       </div>
     );
   }
   ```

2. **Add Database Queries** (2 hours)
   - **File:** `lib/copilot/database.ts` (extend)
   - Add functions for analytics queries

**Deliverable:** Dashboard showing Copilot usage and value

---

### Day 8-9: Beta Testing

**Goal:** Get real reps using it, collect feedback

**Tasks:**

1. **Recruit Beta Testers** (1 hour)
   - Invite 3-5 sales reps (internal or friendly customers)
   - Add to Slack workspace
   - Give them onboarding doc

2. **Onboarding Doc** (2 hours)
   - **File:** `occ-copilot-beta-guide.md`
   - How to use the bot
   - Example questions to try
   - How to give feedback

3. **Monitor Usage** (ongoing)
   - Watch dashboard daily
   - Jump in Slack if reps are stuck
   - Note which intents are most/least used

4. **Collect Feedback** (3 hours)
   - End of week: Survey beta testers
   - Questions:
     - How often did you use it?
     - Did it help you during calls?
     - What would make it more useful?
     - Would you pay $50/month for this?

**Deliverable:** Feedback from 3-5 real users

---

### Day 10: Refinement & Polish

**Goal:** Fix issues, improve most-used intents

**Tasks:**

1. **Analyze Beta Feedback** (2 hours)
   - Which intents were used most?
   - Which got the most 👎 feedback?
   - What features are missing?

2. **Refine Top 3 Intents** (4 hours)
   - Focus on most-used intents (likely: `explore_pain`, `handle_budget_question_early`, `handle_stall_or_think_it_over`)
   - Improve response templates
   - Add more examples
   - Make responses more concise

3. **Add Missing Intents** (2 hours)
   - If beta testers asked questions we don't have intents for
   - Add 1-2 new intents based on real usage

4. **Performance Optimization** (2 hours)
   - Reduce response time
   - Consider caching frequent questions
   - Use faster model (Haiku) for intent matching

**Deliverable:** Polished bot ready for launch

---

## Database Schema

### SQL Migration

Create this file: `lib/copilot/schema.sql`

```sql
-- Teams (Slack workspaces)
CREATE TABLE teams (
  id TEXT PRIMARY KEY,
  team_name TEXT NOT NULL,
  slack_team_id TEXT UNIQUE NOT NULL,
  installed_at TIMESTAMP DEFAULT NOW(),
  plan TEXT DEFAULT 'trial', -- trial, paid, enterprise
  active BOOLEAN DEFAULT true
);

-- Users (Sales reps)
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  slack_user_id TEXT UNIQUE NOT NULL,
  team_id TEXT REFERENCES teams(id),
  name TEXT,
  email TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  last_active TIMESTAMP
);

-- Copilot Interactions (Every question asked)
CREATE TABLE copilot_interactions (
  id SERIAL PRIMARY KEY,
  user_id TEXT REFERENCES users(slack_user_id),
  team_id TEXT REFERENCES teams(id),
  question TEXT NOT NULL,
  intent_matched TEXT, -- e.g., "explore_pain"
  response TEXT NOT NULL,
  channel TEXT, -- Slack channel ID
  slack_timestamp TEXT, -- For threading
  created_at TIMESTAMP DEFAULT NOW()
);

-- Copilot Feedback (👍 👎 button clicks)
CREATE TABLE copilot_feedback (
  id SERIAL PRIMARY KEY,
  user_id TEXT REFERENCES users(slack_user_id),
  interaction_id INTEGER REFERENCES copilot_interactions(id),
  intent_name TEXT,
  helpful BOOLEAN NOT NULL, -- true = 👍, false = 👎
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_interactions_user ON copilot_interactions(user_id);
CREATE INDEX idx_interactions_created ON copilot_interactions(created_at);
CREATE INDEX idx_interactions_intent ON copilot_interactions(intent_matched);
CREATE INDEX idx_feedback_intent ON copilot_feedback(intent_name);
```

### Run Migration

```bash
# Deploy schema to Vercel Postgres
vercel env pull .env.local
psql $POSTGRES_URL -f lib/copilot/schema.sql
```

---

## API Endpoints

### Summary

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/copilot/message` | POST | Receives Slack app mentions, generates responses |
| `/api/copilot/feedback` | POST | Receives button clicks (👍 👎) |
| `/api/copilot/stats` | GET | Returns analytics for dashboard |

All endpoints are Vercel serverless functions (Next.js API routes).

---

## Slack App Setup

### Step 1: Create Slack App

1. Go to https://api.slack.com/apps
2. Click "Create New App" → "From scratch"
3. App Name: `OCC Copilot`
4. Workspace: Select your dev workspace
5. Click "Create App"

### Step 2: Configure Bot

**OAuth & Permissions:**
1. Navigate to "OAuth & Permissions"
2. Add these **Bot Token Scopes**:
   - `app_mentions:read` - Listen for @mentions
   - `chat:write` - Send messages
   - `users:read` - Get user info
   - `channels:read` - Read channel names

3. Click "Install to Workspace"
4. Copy **Bot User OAuth Token** (starts with `xoxb-`)
   - Add to Vercel: `SLACK_BOT_TOKEN`

**Event Subscriptions:**
1. Navigate to "Event Subscriptions"
2. Enable Events: **ON**
3. Request URL: `https://your-domain.vercel.app/api/copilot/message`
4. Subscribe to bot events:
   - `app_mention` - When someone @mentions the bot
5. Save Changes

**Interactivity:**
1. Navigate to "Interactivity & Shortcuts"
2. Enable Interactivity: **ON**
3. Request URL: `https://your-domain.vercel.app/api/copilot/feedback`
4. Save Changes

### Step 3: Get Credentials

**Signing Secret:**
1. Navigate to "Basic Information"
2. Copy **Signing Secret**
3. Add to Vercel: `SLACK_SIGNING_SECRET`

**App-Level Token (optional, for Socket Mode):**
1. Navigate to "Basic Information" → "App-Level Tokens"
2. Generate token with scope `connections:write`
3. Copy token (starts with `xapp-`)
4. Add to Vercel: `SLACK_APP_TOKEN`

### Step 4: Test Installation

```bash
# Test that Slack can reach your webhook
curl -X POST https://your-domain.vercel.app/api/copilot/message \
  -H "Content-Type: application/json" \
  -d '{"type":"url_verification","challenge":"test123"}'

# Should return: {"challenge":"test123"}
```

### Step 5: Invite Bot to Channel

In Slack:
1. Go to any channel
2. Type: `/invite @OCC Copilot`
3. Or in DMs, just start typing `@OCC Copilot`

---

## Testing Plan

### Unit Tests

**Test Intent Matching:**
```typescript
// __tests__/copilot/intent-matcher.test.ts
import { matchIntent } from '@/lib/copilot/intent-matcher';

describe('Intent Matcher', () => {
  it('matches "give me pain funnel questions" to explore_pain', async () => {
    const intent = await matchIntent('give me pain funnel questions');
    expect(intent.name).toBe('explore_pain');
  });

  it('matches "they asked for pricing" to handle_budget_question_early', async () => {
    const intent = await matchIntent('prospect just asked price at the start');
    expect(intent.name).toBe('handle_budget_question_early');
  });

  // Test all 9 intents...
});
```

**Test Response Generation:**
```typescript
// __tests__/copilot/response-generator.test.ts
import { generateResponse } from '@/lib/copilot/response-generator';
import intents from '@/sales-copilot-intents.json';

describe('Response Generator', () => {
  it('generates helpful response for explore_pain intent', async () => {
    const intent = intents.find(i => i.name === 'explore_pain');
    const response = await generateResponse(intent, 'Give me pain funnel questions');

    expect(response).toContain('pain funnel');
    expect(response.length).toBeLessThan(1000); // Keep it concise
  });
});
```

### Integration Tests

**Test Slack Webhook:**
```bash
# Send mock Slack event
curl -X POST http://localhost:3000/api/copilot/message \
  -H "Content-Type: application/json" \
  -H "x-slack-request-timestamp: $(date +%s)" \
  -H "x-slack-signature: v0=..." \
  -d @test-fixtures/slack-app-mention.json
```

**Test End-to-End:**
1. Send real @mention in Slack dev workspace
2. Verify bot responds within 3 seconds
3. Verify response is relevant
4. Click 👍 button
5. Verify feedback logged in database

### Load Testing

**Test Concurrent Requests:**
```bash
# Send 10 requests simultaneously
for i in {1..10}; do
  curl -X POST https://your-domain.vercel.app/api/copilot/message \
    -H "Content-Type: application/json" \
    -d @test-fixtures/slack-app-mention.json &
done
wait

# All should respond within 5 seconds
```

---

## Launch Checklist

### Pre-Launch

- [ ] All 9 intents tested and working
- [ ] Response time < 3 seconds average
- [ ] Helpfulness rate > 70% in beta
- [ ] Database properly provisioned
- [ ] Error logging configured (Vercel, Sentry, etc.)
- [ ] Analytics dashboard working
- [ ] Beta feedback addressed

### Launch Day

- [ ] Announce in customer Slack workspaces
- [ ] Send onboarding email to reps
- [ ] Monitor dashboard for errors
- [ ] Jump in Slack to help users
- [ ] Collect initial feedback

### Week 1 Post-Launch

- [ ] Daily check-in: usage stats, error rate
- [ ] Respond to all feedback within 24 hours
- [ ] Fix any critical bugs immediately
- [ ] Start collecting testimonials

---

## Post-Launch Roadmap

### Month 1: Optimize

**Goals:**
- 50+ daily interactions
- 80%+ helpfulness rate
- 5+ customers using it

**Features:**
- [ ] Add 2-3 new intents based on real usage
- [ ] Improve response templates for top 3 intents
- [ ] Add "Ask follow-up" button (threads conversation)
- [ ] Weekly digest email: "Your Copilot stats this week"

### Month 2: Expand

**Goals:**
- 200+ daily interactions
- Launch call tracking integration

**Features:**
- [ ] Link Copilot interactions to specific calls
  - Rep says "I'm on a call with Acme Corp"
  - Copilot tracks context throughout call
  - After call, OCC scores it and references Copilot guidance used
- [ ] "Copilot used X techniques → Call scored Y" correlation
- [ ] Manager dashboard: "Reps who use Copilot score 15 pts higher"

### Month 3: Advanced

**Goals:**
- Prove ROI: "Copilot users close at 2x rate"

**Features:**
- [ ] Proactive suggestions
  - Copilot detects rep is struggling (long pauses, asking same question twice)
  - Sends suggestion: "Seems like they're stalling - try negative reverse?"
- [ ] Chrome extension (sidebar during Zoom/Google Meet)
- [ ] Voice mode (Whisper transcription → Copilot → TTS response)

---

## Estimated Costs

### Development

- **Week 1:** 40 hours × $100/hr = $4,000
- **Week 2:** 20 hours × $100/hr = $2,000
- **Total dev cost:** $6,000

*(Or build it yourself - 1-2 weeks of focused work)*

### Monthly Operating Costs

- **Vercel hosting:** $0 (Hobby plan) or $20/month (Pro)
- **Vercel Postgres:** $0 (included in Pro) or $0.26/10k rows
- **Claude API:** ~$0.015 per interaction
  - 1,000 interactions/month = $15
  - 10,000 interactions/month = $150
- **Slack:** Free (using standard Slack API)

**Total monthly cost at scale:**
- 10 customers × 10 reps × 5 interactions/day × 20 days/month = 10,000 interactions
- Cost: ~$170/month

**Revenue:**
- 100 reps × $50/month = $5,000/month
- **Gross margin: 97%**

---

## Success Metrics

### Week 1 (Beta)
- ✅ 5 reps using it
- ✅ 50+ total interactions
- ✅ 70%+ helpfulness rate
- ✅ <3 second response time

### Month 1 (Launch)
- ✅ 3-5 customers
- ✅ 30-50 reps using it
- ✅ 500+ interactions
- ✅ 75%+ helpfulness rate
- ✅ "This is a game-changer" feedback

### Month 3 (Scale)
- ✅ 10+ customers
- ✅ 100+ reps
- ✅ 5,000+ interactions/month
- ✅ Prove: "Reps who use Copilot score 10-15 pts higher on calls"

---

## Questions?

**Technical questions:**
- Slack API: https://api.slack.com/docs
- Vercel Postgres: https://vercel.com/docs/storage/vercel-postgres
- Claude API: https://docs.anthropic.com

**Need help building?**
- I can help implement any of these components
- Or you can hire a developer using this spec

---

**Ready to start? Let's build Week 1, Day 1-2 first!** 🚀
