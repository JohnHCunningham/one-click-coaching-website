/**
 * Response Generator
 * Generates personalized Sandler coaching responses
 */

import Anthropic from '@anthropic-ai/sdk';
import type { Intent } from './intent-matcher';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export type GenerateResponseOptions = {
  intent: Intent;
  userQuestion: string;
  userId?: string;
  recentHistory?: Array<{ question: string; response: string }>;
  context?: string; // Optional: "They just said: 'our reps aren't using methodology'"
};

/**
 * Generate a personalized response based on intent and context
 * Uses Claude to adapt the response templates to the specific situation
 */
export async function generateResponse(options: GenerateResponseOptions): Promise<string> {
  const { intent, userQuestion, recentHistory = [], context } = options;

  // Build history context
  const historyContext = recentHistory.length > 0
    ? `\n\nRecent conversation history:\n${recentHistory.map(h =>
        `Q: ${h.question}\nA: ${h.response.substring(0, 200)}...`
      ).join('\n\n')}`
    : '';

  // Check if they've asked similar questions before
  const repeatQuestion = recentHistory.some(h =>
    h.question.toLowerCase().includes(userQuestion.toLowerCase().substring(0, 20))
  );

  const systemPrompt = `You are a Sandler-certified sales coach helping a rep execute Sandler methodology in real-time during a call.

# Context
Intent: ${intent.name}
Stage: ${intent.stage}
Bot Behavior: ${intent.bot_behavior}

# User's Question
"${userQuestion}"
${context ? `\nAdditional context: ${context}` : ''}
${historyContext}

# Response Templates
${intent.response_templates.join('\n\n---\n\n')}

# Instructions
1. Generate a helpful, actionable response following Sandler methodology
2. Keep it CONCISE (2-3 paragraphs max) - they're on a live call
3. Use the response templates as a guide but adapt to their specific question
4. If they provided context (e.g., "They said X"), give specific next questions based on that
5. Use Slack-friendly formatting (markdown: **bold**, \`code\`, bullet lists)
${repeatQuestion ? '6. IMPORTANT: They asked a similar question before. Don\'t repeat yourself - ask for more context or build on previous guidance.' : ''}
${recentHistory.length > 0 ? '7. Reference or build on previous conversation if relevant' : ''}

# Tone
- Calm, confident, experienced
- Peer-to-peer (not preachy)
- Actionable (give them exact phrases to use)
- Encourage them

Generate the response now:`;

  try {
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 600,
      messages: [{ role: 'user', content: systemPrompt }]
    });

    return message.content[0].text;

  } catch (error) {
    console.error('Response generation error:', error);
    throw new Error('Failed to generate response');
  }
}

/**
 * Generate help message listing available intents
 */
export function generateHelpMessage(): string {
  return `👋 **I'm your Sandler sales coach!**

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

🚪 **Disqualifying**
• "How do I walk away Sandler style?"

💡 **Pro tip:** You can paste what the prospect just said and I'll suggest the next 2 questions!

Just @ mention me anytime during a call. Let's close some deals! 🚀`;
}

/**
 * Generate fallback message when intent can't be matched
 */
export function generateFallbackMessage(): string {
  return `I'm not sure how to help with that specific question.

Try asking:
• "Give me pain funnel questions"
• "They asked for pricing early"
• "How do I handle 'think it over'?"
• "Help" to see all available topics

Or describe your situation and I'll do my best to help!`;
}
