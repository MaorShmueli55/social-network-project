import Comment from "../models/commentModel.js";
import Post from "../models/postModel.js";

export const crateNewComment = async (req, res) => {
  const { CommentText, postId } = req.body;
  const userId = req.user._id;
  const username = req.user.username;
  if (!CommentText || !postId) {
    return res
      .status(400)
      .send({ error: "CommentText and postId are required" });
  }
  try {
    const newComment = new Comment({
      username: username,
      CommentText: CommentText,
      createdBy: userId,
      postId: postId,
    });

    await newComment.save();

    await Post.findByIdAndUpdate(postId, {
      $push: { comments: newComment._id },
    });

    res.status(201).send({
      message: "Comment added successfully",
      newComment,
    });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).send({ error: "Server error" });
  }
};

export const getAllCommentsByPostId = async (req, res) => {
  try {
    const { postId } = req.params;
    const postById = await Post.findById(postId);
    console.log(postById);

    if (!postById) {
      return res.status(404).send({ error: "post not found" });
    }
    const Comments = await Comment.find({ postId: postId }).populate(
      "createdBy",
      "username email"
    );
    res.status(201).send(Comments);
  } catch (error) {
    console.error("Error finding Comments by bookId:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const deleteCommentById = async (req, res) => {
  const { commentsId } = req.params;
  const userId = req.user._id;
  const commentById = await Comment.findById(commentsId);
  if (!commentById) {
    return res.status(404).send({ error: "comment not found" });
  }
  if (userId.equals(commentById.createdBy)) {
    try {
      const deleteComment = await Comment.findByIdAndDelete(commentsId);
      res.status(200).send({
        message: "comment deleted successfully",
        deleteComment,
      });
    } catch (error) {
      console.error("Error finding comment by ID:", error);
      res.status(500).json({ error: "Server error" });
    }
  } else
    res.status(400).send({
      status: "failed",
      mes: "only the user that created the comment can delete him",
    });
};
