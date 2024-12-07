import { useSelector } from "react-redux";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { deleteComment } from "../utils/commentApi";

const Comments = ({ commentsData }) => {
  const user = useSelector((state) => state.user);

  return (
    <>
      <div>
        {commentsData.map((commentData) => (
          <div key={commentData._id}>
            <div>{commentData.CommentText}</div>
            <div>
              {commentData.username === user.username && (
                <DeleteOutlineIcon
                  onClick={() => {
                    deleteComment(commentsData._id);
                  }}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Comments;
