import { useSelector } from "react-redux";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { deleteComment } from "../utils/commentApi.js";

const Comments = ({ commentsData }) => {
  const user = useSelector((state) => state.user);

  return (
    <>
      <div className="max-w-2xl mx-auto px-4 py-4">
        {commentsData.map((commentData) => (
          <div
            key={commentData._id}
            className="flex gap-4 mb-6 border-b border-bgBtnColor-200 pb-3"
          >
            {/* <div className="w-12 h-12 rounded-full bg-gray-300 flex-shrink-0">
              <img
                src={commentData.userProfile || "/default-avatar.png"}
                alt={`${commentData.username}'s profile`}
                className="w-full h-full rounded-full object-cover"
              />
            </div> */}
            <div className="flex-1">
              <div className="text-sm">
                {commentData.CommentText}
                <span className="font-semibold ml-2">
                  {commentData.username}
                </span>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {new Date(commentData.createdAt).toLocaleString()}
              </div>
            </div>
            <div>
              {commentData.username === user.username && (
                <div className="text-red-500 hover:text-red-700 cursor-pointer">
                  <DeleteOutlineIcon
                    onClick={() => {
                      deleteComment(commentData._id);
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Comments;
