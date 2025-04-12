const express = require('express');
const router = express.Router();
const openai = require('openai'); // Assuming OpenAI client is initialized and available

router.post('/sentiment', async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Or another suitable model
      messages: [
        { role: "user", content: `Classify the sentiment of this text as Positive, Neutral, or Negative: ${text}` },
      ],
      max_tokens: 10,
    });

    const sentiment = response.choices[0].message.content.trim();

    if (!['Positive', 'Neutral', 'Negative'].includes(sentiment)) {
      console.error('Unexpected sentiment response from OpenAI:', sentiment);
      return res.status(500).json({ error: 'Unexpected sentiment analysis result' });
    }

    res.json({ sentiment });
  } catch (error) {
    console.error('Error during sentiment analysis:', error);
    res.status(500).json({ error: 'Sentiment analysis failed' });
  }
});

module.exports = router;