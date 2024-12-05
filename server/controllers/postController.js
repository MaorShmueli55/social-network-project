import Post from "../models/postModel.js";
import User from "../models/userModel.js";

export const crateNewPost = async (req, res) => {
  const { title, content, post } = req.body;
  if (!title && !content && !post) {
    return res.status(400).send({ error: "title or content are required" });
  }
  const id = req.user._id;
  const username = req.user.username;
  const profileImg = req.user.profileImg;

  try {
    const newPost = new Post({
      profileImg: profileImg,
      post,
      post,
      username: username,
      title,
      content,
      createdBy: id,
    });

    const savedPost = await newPost.save();
    res.status(201).send({
      status: "post Succefully created",
      savedPost,
    });
  } catch (error) {
    console.error("Error creating book:", error);
    res.status(500).json({ error: "Server error. Could not create book." });
  }
};

export const getPosts = async (req, res) => {
  try {
    const Posts = await Post.find().select("-comments");

    res.status(200).send(Posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).send({ error: "Server error" });
  }
};

export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const postById = await Post.findById(id);
    if (!postById) {
      return res.status(404).send({ error: "post not found" });
    }
    res.status(200).send(postById);
  } catch (error) {
    console.error("Error finding postById by ID:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const deletePostById = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  const postById = await Post.findById(id);
  if (!postById) {
    return res.status(404).send({ error: "post not found" });
  }
  if (userId.equals(postById.createdBy)) {
    try {
      const deletePost = await Post.findByIdAndDelete(id);
      res.status(200).send({
        message: "Book deleted successfully",
        deletePost,
      });
    } catch (error) {
      console.error("Error finding book by ID:", error);
      res.status(500).json({ error: "Server error" });
    }
  } else
    res.status(400).send({
      status: "failed",
      mes: "only user that created the post can delete him",
    });
};
