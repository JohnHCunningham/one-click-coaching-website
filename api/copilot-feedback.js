/**
 * OCC Copilot - Feedback Handler
 * Receives button clicks (👍 👎) from Slack
 */

import { createHmac } from 'crypto';
import pkg from 'pg';
const { Pool } = pkg;

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
 * Log feedback
 */
async function logFeedback(data) {
  try {
    await pool.query(
      `INSERT INTO copilot_feedback
       (user_id, intent_name, helpful, created_at)
       VALUES ($1, $2, $3, NOW())`,
      [data.user_id, data.intent_name, data.helpful]
    );
  } catch (error) {
    console.error('Error logging feedback:', error);
  }
}

/**
 * Main handler
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(200).json({
      status: 'ok',
      message: 'OCC Copilot Feedback API - Use POST to send button clicks'
    });
  }

  try {
    // Slack sends payload as form-encoded
    const payload = JSON.parse(req.body.payload);

    // Handle block actions (button clicks)
    if (payload.type === 'block_actions') {
      const action = payload.actions[0];
      const userId = payload.user.id;
      const [, intentName] = action.value.split(':');
      const helpful = action.action_id === 'copilot_helpful';

      await logFeedback({
        user_id: userId,
        intent_name: intentName,
        helpful,
      });

      console.log(`Feedback: ${userId} ${helpful ? '👍' : '👎'} ${intentName}`);

      return res.status(200).json({ ok: true });
    }

    return res.status(200).json({ ok: true });

  } catch (error) {
    console.error('Feedback error:', error);
    return res.status(500).json({ error: error.message });
  }
}
