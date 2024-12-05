import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useSelector, useDispatch } from "react-redux";
import { useCheckIfUserValid } from "../hooks/use-check-if-user-valid";
import { deleteCookie } from "../utils/cookie";
import { setUser } from "../store/slices/userSlicer";
import { useNavigate } from "react-router-dom";

const MyAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useCheckIfUserValid();
  const user = useSelector((state) => state.user);
  const submitCss =
    "bg-bgBtnColor text-btnColor rounded-lg my-1 p-1.5 text-[17px] leading-none w-screen ";

  function handleLogout() {
    deleteCookie();
    dispatch(setUser(false));
  }

  return (
    <div className="h-screen p-[20px] sm:mr-[70px]">
      <div className="sm:flex sm:justify-center">
        <div className="sm:flex sm:flex-col items-center">
          <p className="text-[35px] mb-[10px]">{user.username}</p>
          <AccountCircleIcon sx={{ fontSize: "130px", marginBottom: "5px" }} />
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
    </div>
  );
};

export default MyAccount;