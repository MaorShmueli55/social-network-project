import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useSelector, useDispatch } from "react-redux";
import { useCheckIfUserValid } from "../hooks/use-check-if-user-valid";
import { deleteCookie } from "../utils/cookie";
import { setUser } from "../store/slices/userSlicer";
import { useNavigate } from "react-router-dom";
import { getAllPostsByUser } from "../utils/postApi";
import { useEffect, useState } from "react";
import PostCard from "./PostCard";

const outline = "outline outline-outlineDivs outline-1"
const bottomBorder = 'border-b border-outlineDivs'

const MyAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [PostsData, setPostsData] = useState([]);

  useCheckIfUserValid();
  const user = useSelector((state) => state.user);
  const submitCss =
    "bg-bgBtnColor text-btnColor rounded-lg my-1 p-1.5 text-[17px] leading-none w-screen ";

  const getMyPosts = async () => {
    const data = await getAllPostsByUser();
    setPostsData(data);
  };

  useEffect(() => {
    getMyPosts();
  }, []);

  function handleLogout() {
    deleteCookie();
    dispatch(setUser(false));
  }

  return (
    <div className="w-screen h-screen p-[20px] sm:mr-[70px] ">
         <div className={` self-center bg-searchBody w-full sm:w-[40%] h-auto rounded-t-3xl flex flex-col p-7 ${outline} m-auto mt-12`}>
      <div className="sm:flex sm:justify-center">
        <div className="sm:flex sm:flex-col items-center">
          <p className="text-[35px] mb-[10px]">{user.username}</p>
          <div>
            {user.profile ? (
              <img
                src={user.profile}
                alt="Profile"
                className="w-[130px] h-[130px]  rounded-full mb-2 border border-gray-300 object-cover "
              />
            ) : (
              <AccountCircleIcon
                sx={{ fontSize: "130px", marginBottom: "5px" }}
              />
            )}
          </div>
          <p className="text-[17px]">{user.nickname}</p>
          <p className="text-[25px] mb-[10px]">{user.bio}</p>
          <div className="flex p-[17px] max-w-[600px]">
            <button
              onClick={() => navigate("/EditProfile")}
              className={`${submitCss} mr-[10px]`}
            >
              Edit profile
            </button>
            <button onClick={handleLogout} className={submitCss}>
              LogOut
            </button>
          </div>
        </div>
      </div>
      <div className={` ${bottomBorder} flex flex-col items-center`}>
        <span className={` ${bottomBorder} w-full text-center py-5`}><h1 className={`text-[30px] font-bold`}>Your posts</h1></span>
        <div className="mb-[70px]">
          {PostsData.map((postData) => {
            return <PostCard key={postData._id} postData={postData} />;
          })}
        </div>
      </div>
      </div>
    </div>
  );
};

export default MyAccount;
