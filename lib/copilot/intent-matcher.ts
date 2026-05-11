/**
 * Intent Matcher
 * Matches user questions to one of 9 Sandler coaching intents
 */

import Anthropic from '@anthropic-ai/sdk';
import intents from '@/sales-copilot-intents.json';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export type Intent = {
  name: string;
  stage: string;
  sample_user_utterances: string[];
  bot_behavior: string;
  response_templates: string[];
};

/**
 * Match a user question to the best intent
 * Uses Claude to do fuzzy matching
 */
export async function matchIntent(userQuestion: string): Promise<Intent | null> {
  // Special case: help command
  if (userQuestion.toLowerCase().includes('help') || userQuestion.toLowerCase().includes('what can you do')) {
    return null; // Will trigger help message in the API handler
  }

  const intentList = intents.map((i, idx) =>
    `${idx + 1}. **${i.name}** (${i.stage})\n   Examples: ${i.sample_user_utterances.slice(0, 2).join('; ')}`
  ).join('\n');

  const prompt = `You are an intent classifier for a Sandler sales coaching bot.

Given this question from a sales rep during a call:
"${userQuestion}"

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

    if (intentName === 'unknown') {
      return null;
    }

    const matchedIntent = intents.find(i => i.name === intentName);
    return matchedIntent || null;

  } catch (error) {
    console.error('Intent matching error:', error);
    return null;
  }
}

/**
 * Get all available intents (for help message)
 */
export function getAllIntents(): Intent[] {
  return intents;
}

/**
 * Get intent by name
 */
export function getIntentByName(name: string): Intent | undefined {
  return intents.find(i => i.name === name);
}
