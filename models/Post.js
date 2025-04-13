// Assuming a Mongoose schema for the Post model

const PostSchema = new mongoose.Schema({
  // ... other fields ...
  lastPostedAt: {
    type: Date,
    default: null,
  },
  // ... other fields ...
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;


// If you are not using Mongoose or a similar ORM, 
// adapt this to your database schema.  The key is to
// add the `lastPostedAt` field with a Date or timestamp
// type and a default value of null.  For example, in a
// hypothetical in-memory array of posts:

// posts = posts.map(post => ({ ...post, lastPostedAt: post.lastPostedAt || null }));