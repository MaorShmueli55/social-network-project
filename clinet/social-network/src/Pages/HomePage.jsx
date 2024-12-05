import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../store/slices/userSlicer";
import { isUserValid } from "../utils/userApi.js";
import { useCheckIfUserValid } from "../hooks/use-check-if-user-valid.js";

const divChoice =
  "bg-bgBtnColor text-center my-10 w-40 mx-auto border-1 rounded-md -mt-2 text-2xl";

const HomePage = () => {
  useCheckIfUserValid();
  const user = useSelector((state) => state.user);
  return (
    <>
      <div>
        <h1>welcome {user.username}</h1>
      </div>
    </>
  );
};

export default HomePage;
