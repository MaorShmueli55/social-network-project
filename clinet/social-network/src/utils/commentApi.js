import axios from "axios";
import Cookies from "js-cookie";

const base_url = `http://localhost:3000`;

export const getAllCommentsByPostId = async (postId) => {
  try {
    const response = await axios.get(`${base_url}/api/comment/All/${postId}`);
    return response.data;
  } catch (error) {
    return {
      success: false,
      error: error.response?.data || error.message,
    };
  }
};

export const deleteComment = async (commentsId) => {
  try {
    const response = await axios.delete(
      `${base_url}/api/comment/delete/${commentsId}`
    );
    return response.data;
  } catch (error) {
    return {
      success: false,
      error: error.response?.data || error.message,
    };
  }
};
