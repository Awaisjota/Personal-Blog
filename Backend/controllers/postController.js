import Post from "../models/Post.js";

// Fetch all posts
export const fetchPost = async (req, res) => {
  try {
    const posts = await Post.find()
      .select("title image excerpt createdAt likes comments") // basic fields
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Failed to fetch posts" });
  }
};

// Add a new post
export const addPost = async (req, res) => {
  try {
    const { title, description, image, author } = req.body;

    // Validation
    if (!title || !description || !image) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const post = await Post.create({
      title,
      description,
      excerpt: description.substring(0, 150),
      image, // URL directly from frontend
      author,
    });

    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// Fetch single post by ID with likes & comments populated
export const fetchById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("likes", "name email") // user info for likes
      .populate("comments.user", "name email"); // user info for comments
    if (!post) return res.status(404).json({ msg: "Post not found" });
    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Failed to fetch post" });
  }
};

// Update a post (admin only)
export const updatePost = async (req, res) => {
  try {
    const { title, description, image } = req.body;

    let updatedData = {
      title,
      description,
      excerpt: description.substring(0, 150),
      image, // URL directly
    };

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// Delete a post (admin only)
export const deletePost = async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Post delete failed" });
  }
};

// Toggle like for a post
export const toggleLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: "Post not found" });

    const index = post.likes.indexOf(req.user.id);
    if (index === -1) {
      post.likes.push(req.user.id); // add like
    } else {
      post.likes.splice(index, 1); // remove like
    }

    await post.save();
    await post.populate("likes", "name email"); // populate user info
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Failed to toggle like" });
  }
};

// Add comment to a post
export const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: "Post not found" });

    post.comments.push({ user: req.user.id, text });
    await post.save();
    await post.populate("comments.user", "name email"); // populate user info

    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Failed to add comment" });
  }
};
