import Post from '../models/post_model';

export const createPost = (req, res) => {
  const post = new Post({ title: req.body.title, tags: req.body.tags, content: req.body.content, cover_url: req.body.cover_url });
  post.save()
  .then((result) => {
    res.json({ message: 'Post created!' });
  })
  .catch((error) => {
    res.status(500).json({ error });
  });
};
export const getPosts = (req, res) => {
  Post.find({})
  .then((result) => {
    res.json(result);
  })
  .catch((error) => {
    res.status(500).json({ error });
  });
};
export const getPost = (req, res) => {
  Post.findById(req.params.id)
  .then((result) => {
    res.json(result);
  })
  .catch((error) => {
    res.status(500).json({ error });
  });
};
export const deletePost = (req, res) => {
  Post.findById(req.params.id).remove()
  .then((result) => {
    res.json({ message: 'Post deleted!' });
  })
  .catch((error) => {
    res.status(500).json({ error });
  });
};
export const updatePost = (req, res) => {
  Post.findByIdAndUpdate(req.params.id, { $set: req.body })
  .then((result) => {
    res.json({ message: 'Post updated!' });
  })
  .catch((error) => {
    res.status(500).json({ error });
  });
};
