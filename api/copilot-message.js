/**
 * OCC Copilot - Slack Message Handler
 * Receives app mentions and responds with Sandler coaching
 */

import { WebClient } from '@slack/web-api';
import { createHmac } from 'crypto';
import Anthropic from '@anthropic-ai/sdk';
import pkg from 'pg';
const { Pool } = pkg;
import { readFileSync } from 'fs';
import { join } from 'path';

// Load intents
const intentsPath = join(process.cwd(), 'sales-copilot-intents.json');
const intents = JSON.parse(readFileSync(intentsPath, 'utf-8'));

const slack = new WebClient(process.env.SLACK_BOT_TOKEN);
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// Database connection pool
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: { rejectUnauthorized: false }
});

/**
 * Verify Slack signature
 */
function verifySlackSignature(body, timestamp, signature) {
  const signingSecret = process.env.SLACK_SIGNING_SECRET;
  if (!signingSecret) return false;

  const requestTime = parseInt(timestamp);
  const currentTime = Math.floor(Date.now() / 1000);
  if (Math.abs(currentTime - requestTime) > 60 * 5) return false;

  const hmac = createHmac('sha256', signingSecret);
  const [version, hash] = signature.split('=');
  hmac.update(`${version}:${timestamp}:${body}`);
  const computedHash = hmac.digest('hex');

  return hash === computedHash;
}

/**
 * Match intent using Claude
 */
async function matchIntent(question) {
  const intentList = intents.map((i, idx) =>
    `${idx + 1}. **${i.name}** (${i.stage})\n   Examples: ${i.sample_user_utterances.slice(0, 2).join('; ')}`
  ).join('\n');

  const prompt = `You are an intent classifier for a Sandler sales coaching bot.

Given this question from a sales rep:
"${question}"

Match it to ONE of these intents:
${intentList}

Return ONLY the intent name (e.g., "explore_pain"), nothing else.
If none match well, return "unknown".`;

  try {
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 50,
      messages: [{ role: 'user', content: prompt }]
    });

    const intentName = message.content[0].text.trim();
    if (intentName === 'unknown') return null;

    return intents.find(i => i.name === intentName) || null;
  } catch (error) {
    console.error('Intent matching error:', error);
    return null;
  }
}

/**
 * Generate response using Claude
 */
async function generateResponse(intent, question) {
  const systemPrompt = `You are a Sandler-certified sales coach helping a rep in real-time during a call.

Intent: ${intent.name}
Stage: ${intent.stage}
Bot Behavior: ${intent.bot_behavior}

User's question: "${question}"

Response templates:
${intent.response_templates.join('\n\n---\n\n')}

Generate a helpful, actionable response following Sandler methodology.
Keep it CONCISE (2-3 paragraphs max) - they're on a live call.
Use Slack-friendly formatting (markdown: **bold**, \`code\`, bullet lists).`;

  try {
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 600,
      messages: [{ role: 'user', content: systemPrompt }]
    });

    return message.content[0].text;
  } catch (error) {
    console.error('Response generation error:', error);
    throw error;
  }
}

/**
 * Log interaction to database
 */
async function logInteraction(data) {
  try {
    await pool.query(
      `INSERT INTO copilot_interactions
       (user_id, team_id, question, intent_matched, response, channel, slack_timestamp, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())`,
      [data.user_id, data.team_id || null, data.question, data.intent_matched,
       data.response, data.channel, data.slack_timestamp]
    );
  } catch (error) {
    console.error('Error logging interaction:', error);
  }
}

/**
 * Ensure user exists
 */
async function ensureUser(slackUserId, teamId) {
  try {
    await pool.query(
      `INSERT INTO users (id, slack_user_id, team_id, created_at, last_active)
       VALUES ($1, $2, $3, NOW(), NOW())
       ON CONFLICT (slack_user_id)
       DO UPDATE SET last_active = NOW()`,
      [slackUserId, slackUserId, teamId || null]
    );
  } catch (error) {
    console.error('Error ensuring user:', error);
  }
}

/**
 * Main handler
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(200).json({
      status: 'ok',
      message: 'OCC Copilot API - Use POST to send Slack events'
    });
  }

  try {
    const event = req.body;

    // URL verification (no signature check needed for this)
    if (event.type === 'url_verification') {
      console.log('URL verification requested');
      return res.status(200).json({ challenge: event.challenge });
    }

    // Get raw body for signature verification
    const body = JSON.stringify(req.body);
    const timestamp = req.headers['x-slack-request-timestamp'] || '';
    const signature = req.headers['x-slack-signature'] || '';

    // Verify signature for all other events
    if (!verifySlackSignature(body, timestamp, signature)) {
      console.error('Invalid signature');
      return res.status(401).json({ error: 'Invalid signature' });
    }

    // Handle app mention
    if (event.event?.type === 'app_mention') {
      const { user, text, channel, ts, team } = event.event;
      const question = text.replace(/<@[\w]+>/g, '').trim();

      await ensureUser(user, team);

      // Help command
      if (question.toLowerCase().includes('help') || !question) {
        const helpMessage = `👋 **I'm your Sandler sales coach!**

I can help you execute Sandler methodology during calls. Here's what to ask:

📋 **Getting Started**
• "Give me an upfront contract"
• "How should I start a Sandler call?"

💬 **Pain & Discovery**
• "Give me pain funnel questions"
• "How do I go deeper on pain?"

💰 **Budget & Objections**
• "They asked for pricing early"
• "They said 'too expensive'"
• "They said 'we'll think about it'"

🎯 **Decision & Close**
• "How do I find the real decision maker?"
• "They said 'send a proposal'"
• "How do I set a clear next step?"

Just @ mention me anytime during a call! Let's close some deals! 🚀`;

        await slack.chat.postMessage({
          channel,
          thread_ts: ts,
          text: helpMessage,
        });

        await logInteraction({
          user_id: user,
          team_id: team,
          question: question || 'help',
          intent_matched: 'help',
          response: helpMessage,
          channel,
          slack_timestamp: ts,
        });

        return res.status(200).json({ ok: true });
      }

      // Match intent
      const intent = await matchIntent(question);

      if (!intent) {
        const fallback = `I'm not sure how to help with that specific question.

Try asking:
• "Give me pain funnel questions"
• "They asked for pricing early"
• "How do I handle 'think it over'?"
• "Help" to see all available topics`;

        await slack.chat.postMessage({
          channel,
          thread_ts: ts,
          text: fallback,
        });

        await logInteraction({
          user_id: user,
          team_id: team,
          question,
          intent_matched: null,
          response: fallback,
          channel,
          slack_timestamp: ts,
        });

        return res.status(200).json({ ok: true });
      }

      // Generate response
      const response = await generateResponse(intent, question);

      // Send to Slack with buttons
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
                text: { type: 'plain_text', text: '👍 Helpful', emoji: true },
                action_id: 'copilot_helpful',
                value: `${user}:${intent.name}:${ts}`
              },
              {
                type: 'button',
                text: { type: 'plain_text', text: '👎 Not helpful', emoji: true },
                action_id: 'copilot_not_helpful',
                value: `${user}:${intent.name}:${ts}`
              }
            ]
          }
        ]
      });

      // Log interaction
      await logInteraction({
        user_id: user,
        team_id: team,
        question,
        intent_matched: intent.name,
        response,
        channel,
        slack_timestamp: ts,
      });

      return res.status(200).json({ ok: true });
    }

    return res.status(200).json({ ok: true });

  } catch (error) {
    console.error('Handler error:', error);
    return res.status(500).json({ error: error.message });
  }
}
