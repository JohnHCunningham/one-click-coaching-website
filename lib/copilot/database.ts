/**
 * Database Helper Functions
 * Handles all database operations for the Copilot
 */

import { sql } from '@vercel/postgres';

// Types
export type CopilotInteraction = {
  id?: number;
  user_id: string;
  team_id?: string;
  question: string;
  intent_matched: string | null;
  response: string;
  channel: string;
  slack_timestamp: string;
  created_at?: Date;
};

export type CopilotFeedback = {
  id?: number;
  user_id: string;
  interaction_id?: number;
  intent_name: string;
  helpful: boolean;
  created_at?: Date;
};

export type CopilotStats = {
  total_interactions: number;
  unique_users: number;
  helpfulness_rate: number;
  avg_per_user: number;
};

/**
 * Log a copilot interaction
 */
export async function logInteraction(data: CopilotInteraction): Promise<number> {
  try {
    const result = await sql`
      INSERT INTO copilot_interactions
      (user_id, team_id, question, intent_matched, response, channel, slack_timestamp, created_at)
      VALUES
      (${data.user_id}, ${data.team_id || null}, ${data.question}, ${data.intent_matched},
       ${data.response}, ${data.channel}, ${data.slack_timestamp}, NOW())
      RETURNING id
    `;

    return result.rows[0].id;
  } catch (error) {
    console.error('Error logging interaction:', error);
    throw error;
  }
}

/**
 * Log feedback (👍 👎)
 */
export async function logFeedback(data: CopilotFeedback): Promise<void> {
  try {
    await sql`
      INSERT INTO copilot_feedback
      (user_id, interaction_id, intent_name, helpful, created_at)
      VALUES
      (${data.user_id}, ${data.interaction_id || null}, ${data.intent_name}, ${data.helpful}, NOW())
    `;
  } catch (error) {
    console.error('Error logging feedback:', error);
    throw error;
  }
}

/**
 * Get recent interactions for a user (for conversation history)
 */
export async function getRecentInteractions(
  userId: string,
  limit: number = 5
): Promise<Array<{ question: string; response: string }>> {
  try {
    const result = await sql`
      SELECT question, response
      FROM copilot_interactions
      WHERE user_id = ${userId}
      ORDER BY created_at DESC
      LIMIT ${limit}
    `;

    return result.rows.map(row => ({
      question: row.question,
      response: row.response
    }));
  } catch (error) {
    console.error('Error getting recent interactions:', error);
    return [];
  }
}

/**
 * Get copilot stats (for dashboard)
 */
export async function getCopilotStats(days: number = 7): Promise<CopilotStats> {
  try {
    const result = await sql`
      SELECT
        COUNT(*)::int as total_interactions,
        COUNT(DISTINCT user_id)::int as unique_users,
        COALESCE(AVG(CASE WHEN cf.helpful THEN 1 ELSE 0 END)::float, 0) as helpfulness_rate
      FROM copilot_interactions ci
      LEFT JOIN copilot_feedback cf
        ON ci.id = cf.interaction_id
      WHERE ci.created_at > NOW() - INTERVAL '${days} days'
    `;

    const row = result.rows[0];
    return {
      total_interactions: row.total_interactions || 0,
      unique_users: row.unique_users || 0,
      helpfulness_rate: row.helpfulness_rate || 0,
      avg_per_user: row.unique_users > 0
        ? row.total_interactions / row.unique_users
        : 0
    };
  } catch (error) {
    console.error('Error getting copilot stats:', error);
    return {
      total_interactions: 0,
      unique_users: 0,
      helpfulness_rate: 0,
      avg_per_user: 0
    };
  }
}

/**
 * Get intent breakdown (which intents are used most)
 */
export async function getIntentBreakdown(days: number = 7) {
  try {
    const result = await sql`
      SELECT
        intent_matched,
        COUNT(*)::int as count,
        COALESCE(AVG(CASE WHEN cf.helpful THEN 1 ELSE 0 END)::float, 0) as helpfulness
      FROM copilot_interactions ci
      LEFT JOIN copilot_feedback cf
        ON ci.id = cf.interaction_id
      WHERE ci.created_at > NOW() - INTERVAL '${days} days'
        AND ci.intent_matched IS NOT NULL
      GROUP BY intent_matched
      ORDER BY count DESC
    `;

    return result.rows.map(row => ({
      intent_name: row.intent_matched,
      count: row.count,
      helpfulness: row.helpfulness || 0
    }));
  } catch (error) {
    console.error('Error getting intent breakdown:', error);
    return [];
  }
}

/**
 * Get top users (power users)
 */
export async function getTopUsers(limit: number = 10) {
  try {
    const result = await sql`
      SELECT
        user_id,
        COUNT(*)::int as interaction_count,
        (COUNT(*) /
          NULLIF(
            EXTRACT(EPOCH FROM (MAX(created_at) - MIN(created_at))) / 86400,
            0
          )
        )::float as avg_per_day
      FROM copilot_interactions
      WHERE created_at > NOW() - INTERVAL '30 days'
      GROUP BY user_id
      ORDER BY interaction_count DESC
      LIMIT ${limit}
    `;

    return result.rows.map(row => ({
      user_id: row.user_id,
      interaction_count: row.interaction_count,
      avg_per_day: Math.round(row.avg_per_day * 10) / 10 || 0
    }));
  } catch (error) {
    console.error('Error getting top users:', error);
    return [];
  }
}

/**
 * Ensure user exists in database
 */
export async function ensureUser(slackUserId: string, teamId?: string): Promise<void> {
  try {
    await sql`
      INSERT INTO users (id, slack_user_id, team_id, created_at, last_active)
      VALUES (${slackUserId}, ${slackUserId}, ${teamId || null}, NOW(), NOW())
      ON CONFLICT (slack_user_id)
      DO UPDATE SET last_active = NOW()
    `;
  } catch (error) {
    console.error('Error ensuring user exists:', error);
  }
}

/**
 * Ensure team exists in database
 */
export async function ensureTeam(slackTeamId: string, teamName: string): Promise<void> {
  try {
    await sql`
      INSERT INTO teams (id, team_name, slack_team_id, installed_at, active)
      VALUES (${slackTeamId}, ${teamName}, ${slackTeamId}, NOW(), true)
      ON CONFLICT (slack_team_id)
      DO UPDATE SET team_name = ${teamName}
    `;
  } catch (error) {
    console.error('Error ensuring team exists:', error);
  }
}
