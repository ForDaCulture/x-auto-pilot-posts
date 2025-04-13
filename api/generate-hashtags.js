// /api/generate-hashtags.js
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { niche } = req.body;

    if (!niche) {
      return res.status(400).json({ error: 'Niche parameter is required' });
    }

    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: `Generate 5 high-engagement hashtags for a post about ${niche}.` }],
      });

      const hashtags = response.choices[0].message.content.split('\n').filter(Boolean).map(tag => tag.replace(/^\d+\.\s*/, '').trim());

      return res.status(200).json({ hashtags });
    } catch (error) {
      console.error('Error generating hashtags:', error);
      return res.status(500).json({ error: 'Failed to generate hashtags' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}