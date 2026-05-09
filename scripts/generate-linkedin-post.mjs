#!/usr/bin/env node

import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs';
import path from 'path';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const OCC_CMO_PROMPT = `You are the OCC Chief Marketing Officer - an expert B2B copywriter specializing in sales enablement content.

# OCC BRAND VOICE
- Calm, confident, experienced
- No hype, no fluff, no clichés
- Insight over persuasion
- Write like someone who has seen the problem unfold many times

# CONTENT PILLARS (rotate through these)
1. Neuroscience/Data - Use research, data, behavioral science
2. Story + Insight - Real scenarios, pattern recognition
3. Contrarian Take - Challenge common assumptions
4. Thought Leadership - Industry perspective, future trends
5. Social Proof/Outcome - Results, case studies, proof points

# RHETORICAL DEVICES (use 2-3 per post)
- **Tricolon**: Three parallel phrases for rhythm
- **Antithesis**: Contrasting ideas side by side
- **Anaphora**: Repeat beginnings of consecutive phrases
- **Epistrophe**: Repeat endings of consecutive phrases
- **Metaphor**: State something IS something else
- **Antimetabole**: Reverse word order for impact

# HOOK STYLES (choose one)
- Number (e.g., "72 hours.")
- Provocation (e.g., "More coaching isn't the problem.")
- Scene (e.g., "Third discovery call of the day...")
- Statement (e.g., "The gap between top performers...")
- Incomplete Statement (e.g., "The best sales managers don't...")

# POST STRUCTURE
1. **Hook** (1-3 lines, pattern interrupt)
2. **Problem** (name it precisely, use contrast)
3. **Insight** (reframe, show the hidden dynamic)
4. **Resolution** (what this means, what to do differently)
5. **CTA** (curiosity-based, not salesy)
6. **Hashtags** (3 strategic tags)

# IMAGE PROMPT REQUIREMENTS
- Abstract visualization (no people, no stock photos)
- OCC brand colors: Espresso (#2A221C), Terracotta (#B5583E), Bone (#F4EFE8), Clay (#C9A687)
- Clean, minimal, data-driven aesthetic
- Professional, modern design

# OUTPUT FORMAT
Return ONLY valid JSON with this structure:
{
  "pillar": "Neuroscience/Data",
  "hook_style": "Number",
  "devices": ["Tricolon", "Antithesis"],
  "post": "The full LinkedIn post text...",
  "image_prompt": "Abstract visualization of...",
  "hashtags": ["#SalesEnablement", "#SalesCoaching", "#B2BSales"]
}

Generate a new LinkedIn post about sales training reinforcement and behavior change.
Make it specific, insightful, and true to the OCC brand voice.`;

async function generatePost() {
  console.log('🤖 Generating LinkedIn post with Claude...');

  try {
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514', // Will auto-update to latest
      max_tokens: 2000,
      messages: [{
        role: 'user',
        content: OCC_CMO_PROMPT
      }]
    });

    const responseText = message.content[0].text;

    // Extract JSON from response (handle markdown code blocks)
    let jsonText = responseText;
    if (responseText.includes('```json')) {
      jsonText = responseText.split('```json')[1].split('```')[0].trim();
    } else if (responseText.includes('```')) {
      jsonText = responseText.split('```')[1].split('```')[0].trim();
    }

    const post = JSON.parse(jsonText);

    // Create filename with today's date
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const filename = `${today}-linkedin-post.md`;
    const filepath = path.join(process.cwd(), 'linkedin-posts', filename);

    // Format the post file
    const postContent = `# LinkedIn Post - ${today}

**Pillar:** ${post.pillar}
**Hook Style:** ${post.hook_style}
**Devices:** ${post.devices.join(', ')}

---

## Post Content

${post.post}

${post.hashtags.join(' ')}

---

## Image Prompt

${post.image_prompt}

---

## Usage Instructions

1. **Review** the post for quality and brand alignment
2. **Edit** if needed (keep the voice and structure)
3. **Generate image** using the prompt above (ChatGPT/DALL-E or Canva)
4. **Post to Buffer**:
   - Copy the post content
   - Upload the generated image
   - Schedule for posting

## Quality Checklist

- [ ] Brand voice: Calm, confident, no hype
- [ ] Rhetorical devices used effectively
- [ ] Hook grabs attention
- [ ] Insight is valuable and specific
- [ ] CTA encourages engagement
- [ ] Image prompt matches content theme
- [ ] No repetition of recent angles
`;

    // Write the post file
    fs.writeFileSync(filepath, postContent);

    console.log('✅ Post generated successfully!');
    console.log(`📄 Saved to: ${filepath}`);
    console.log(`\n📊 Pillar: ${post.pillar}`);
    console.log(`🎣 Hook: ${post.hook_style}`);
    console.log(`🎨 Devices: ${post.devices.join(', ')}`);

  } catch (error) {
    console.error('❌ Error generating post:', error.message);
    throw error;
  }
}

generatePost();
