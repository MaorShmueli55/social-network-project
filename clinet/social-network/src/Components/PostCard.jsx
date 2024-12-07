import { getAllCommentsByPostId } from "../utils/commentApi.js";
import React, { useEffect, useState } from "react";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ModeCommentRoundedIcon from "@mui/icons-material/ModeCommentRounded";
import Comments from "./Comments.jsx";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import { useSelector } from "react-redux";
import { deletePost } from "../utils/postApi.js";

const PostCard = ({ postData }) => {
  const [commentsData, setCommentsData] = useState([]);
  const [ClickOnComments, setClickOnComments] = useState(false);

  const user = useSelector((state) => state.user);

  const getAllComments = async (postId) => {
    const data = await getAllCommentsByPostId(postId);
    setCommentsData(data);
  };

  useEffect(() => {
    getAllComments(postData._id);
  }, []);
  return (
    <>
      <div className=" rounded-lg shadow-md max-w-md mx-auto ">
        <div className="flex items-center p-4 border-b">
          {postData.profileImg ? (
            <img
              src={postData.profileImg}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <Person2OutlinedIcon sx={{ fontSize: 40, padding: "1px" }} />
          )}
          <h2 className="ml-3 text-sm font-semibold">{postData.username}</h2>
        </div>

        <img
          src={postData.post}
          alt="Post"
          className="w-full h-106 object-cover"
        />

        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1">{postData.title}</h3>
          <p className="text-gray-600 text-sm">{postData.content}</p>
        </div>

        <div className="flex items-center px-4 pb-4 space-x-4">
          <button className="text-gray-500 hover:text-red-500">
            <FavoriteBorderIcon />
          </button>
          <button
            className="text-gray-500 hover:text-blue-500"
            onClick={() => {
              setClickOnComments((prev) => !prev);
            }}
          >
            <ModeCommentRoundedIcon />
          </button>
          {postData.username === user.username && (
            <button
              className="text-gray-500 hover:text-red-500"
              onClick={() => {
                deletePost(postData._id);
              }}
            >
              <DeleteOutlineRoundedIcon />
            </button>
          )}
        </div>

        {ClickOnComments && (
          <Comments commentsData={commentsData} postId={postData._id} />
        )}
      </div>
    </>
  );
};

export default PostCard;
