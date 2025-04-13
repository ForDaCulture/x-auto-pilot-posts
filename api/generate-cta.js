import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { text } = req.body;

    try {
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful assistant that helps improve social media posts." },
          {
            role: "user",
            content: `Add a short, engaging call to action to the end of this social media post to invite replies or retweets: "${text}"`,
          },
        ],
        max_tokens: 50, // Limit the CTA length
      });

      const cta = completion.data.choices[0].message.content.trim();
      const updatedText = `${text}\n\n${cta}`;

      res.status(200).json({ text: updatedText });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to generate CTA' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}