/**
 * This code assumes you have a Post model and an OpenAI client initialized.
 *  It also assumes you are using Express.js for your API.
 */

// Example Post model (assuming Mongoose/MongoDB):
// const mongoose = require('mongoose');
// const PostSchema = new mongoose.Schema({
//   text: String,
//   lastPostedAt: { type: Date, default: null },
//   // other fields...
// });
// const Post = mongoose.model('Post', PostSchema);

// Example OpenAI client initialization:
// const OpenAI = require('openai');
// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// --- Modifying the scheduling endpoint ---
// Assuming your scheduling endpoint looks something like this:
// app.post('/api/schedule-post', async (req, res) => { ... });

// Modify it to update lastPostedAt:
app.post('/api/schedule-post', async (req, res) => {
  // ... your existing scheduling logic ...

  try {
    // Assuming you have a way to identify the scheduled post (e.g., from req.body)
    const postId = req.body.postId; 

    // Update lastPostedAt in the database
    const post = await Post.findById(postId);
    if (post) {
      post.lastPostedAt = new Date();
      await post.save();
    }

    // ... rest of your scheduling logic ...

    res.status(200).json({ message: 'Post scheduled successfully' });
  } catch (error) {
    console.error('Error scheduling post:', error);
    res.status(500).json({ error: 'Failed to schedule post' });
  }
});



// --- New endpoint for recycling posts ---
app.post('/api/recycle-post/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const now = new Date();
    const lastPosted = post.lastPostedAt;

    if (lastPosted) {
      const diffInHours = Math.floor((now - lastPosted) / (1000 * 60 * 60));
      if (diffInHours < 72) {
        return res.status(400).json({ error: `Cooldown period not passed. Please wait ${72 - diffInHours} more hours.` });
      }
    }

    const prompt = `Reword this historical post in a different tone. Provide 3 distinct versions.\n\nOriginal post: "${post.text}"`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // or gpt-4, depending on your access
      messages: [{ role: "user", content: prompt }],
      n: 1, // We only need one completion with 3 variations in it.
    });
    
    // Assuming the variations are separated by some delimiter (e.g., "Version 1:", "Version 2:", etc.)
    const variationsText = response.choices[0].message.content;
    const variations = variationsText.split(/Version \d: /).filter(Boolean).map(v => v.trim());

    if (variations.length !== 3) {
      console.warn("Expected 3 variations but got:", variations.length);
      // You might want to handle this more gracefully, e.g., by returning an error or fewer variations.
    }
    
    res.status(200).json({ variations });
  } catch (error) {
    console.error('Error recycling post:', error);
    res.status(500).json({ error: 'Failed to recycle post' });
  }
});