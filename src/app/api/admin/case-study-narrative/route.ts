import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(request: NextRequest) {
  const intake = await request.json()
  const prompt = `You are a conversion copywriter for ConversionPro LLP. Write a case study narrative from these raw inputs.

Client: ${intake.clientAlias} | Industry: ${intake.industry} | Platform: ${intake.platform}
Primary result: ${intake.primaryMetric}: ${intake.primaryDelta}
Secondary result: ${intake.secondaryMetric}: ${intake.secondaryDelta}
Time to result: ${intake.timeToResult}
Challenge notes: ${intake.challenge}
Approach notes: ${intake.approach}
Key insight: ${intake.keyInsight}

Return ONLY valid JSON, no markdown, no preamble:
{
  "title": "60 chars max, outcome-first headline",
  "metaDesc": "150 chars, includes result metric",
  "challenge": "2-3 sentence problem statement, specific and concrete",
  "approach": ["step 1", "step 2", "step 3", "step 4", "step 5"],
  "keyInsight": "1-2 sentences, the unexpected thing that unlocked results",
  "excerpt": "2 sentence summary for case study card previews"
}`
  try {
    const msg = await client.messages.create({ model: 'claude-sonnet-4-5', max_tokens: 1500, messages: [{ role: 'user', content: prompt }] })
    const raw = (msg.content[0] as { type: string; text: string }).text.replace(/```json|```/g, '').trim()
    const parsed = JSON.parse(raw)
    return NextResponse.json(parsed)
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
