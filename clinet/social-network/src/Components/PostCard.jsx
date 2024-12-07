import { getAllCommentsByPostId } from "../utils/commentApi.js";
import React, { useEffect, useState } from "react";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ModeCommentRoundedIcon from "@mui/icons-material/ModeCommentRounded";
import Comments from "./Comments.jsx";

const PostCard = ({ postData }) => {
  const [commentsData, setCommentsData] = useState([]);
  const [ClickOnComments, setClickOnComments] = useState(false);

  const getAllComments = async (postId) => {
    const data = await getAllCommentsByPostId(postId);
    setCommentsData(data);
  };

  useEffect(() => {
    getAllComments(postData._id);
  }, []);
  return (
    <>
      <div>
        <div className="flex">
          {postData.profileImg ? (
            <img src={postData.profileImg} />
          ) : (
            <Person2OutlinedIcon sx={{ fontSize: 40, padding: "1px" }} />
          )}
          <h2>{postData.username}</h2>
        </div>
        <img src={postData.post} />
        <div>
          <h3>{postData.title}</h3>
          <p>{postData.content}</p>
        </div>
      </div>
      <div className="flex">
        <FavoriteBorderIcon />
        <ModeCommentRoundedIcon
          onClick={() => {
            setClickOnComments((prev) => !prev);
          }}
        />
        {ClickOnComments && <Comments commentsData={commentsData} />}
      </div>
    </>
  );
};

export default PostCard;
