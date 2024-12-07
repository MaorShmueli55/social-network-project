import { useSelector } from "react-redux";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { deleteComment } from "../utils/commentApi.js";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";

const Comments = ({ commentsData }) => {
  const user = useSelector((state) => state.user);

  return (
    <>
      <div className="max-w-2xl px-4 py-7">
        {commentsData.map((commentData) => (
          <div
            key={commentData._id}
            className="flex gap-4 mb-6 border-b border-bgBtnColor-200 pb-3"
          >
            <div className="w-12 h-12 ">
              {commentData.profileImg ? (
                <img
                  src={commentData.profileImg}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <Person2OutlinedIcon
                  sx={{
                    border: "solid 2px gray",
                    borderRadius: "50%",
                    padding: "2px",
                    width: "100%",
                    height: "100%",
                  }}
                />
              )}
            </div>
            <div className="flex-1">
              <div className="text-sm flex flex-col gap-0.5">
                <span className="mr-2 font-bold text-red-300">
                  {commentData.username}
                </span>
                {commentData.CommentText}
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
