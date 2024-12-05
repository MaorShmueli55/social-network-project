import { useCheckIfUserValid } from "../hooks/use-check-if-user-valid";
import { useState } from "react";
import { deleteUser } from "../utils/userApi";
import { deleteCookie } from "../utils/cookie";
import { useNavigate } from "react-router-dom";
import ImageUpload from "../Components/uploadImg";

const divChoice = "w-[470px] mx-auto text-m";
const inputCss =
  "bg-bgBtnColor text-btnColor rounded-lg my-4 mx-3 h-10 p-3 text-base w-full";
const submitCss =
  "bg-bgBtnColor text-btnColor rounded-lg my-1 p-1.5 text-[17px] leading-none hover:bg-btnHover transition-all duration-300";
const deleteCss =
  "bg-red-900 text-btnColor rounded-lg my-14 p-1.5 text-[17px] leading-none w-full hover:bg-red-700 transition-all duration-300";
const titleCss = `text-center mb-4 font-bold`;

const EditProfile = () => {
  const [btnText, setBtnText] = useState("Submit");
  const [msgText, setMsgText] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    profile: "",
    nickname: "",
    bio: "",
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  useCheckIfUserValid();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    setIsSubmitted(true);
    setBtnText("Submitting...");
    setTimeout(() => {
      setBtnText("Submit");
      setMsgText("Profile updated successfully!");
      setIsSubmitted(false);
    }, 2000);
  };

  const handleDelete = () => {
    deleteUser(), deleteCookie(), navigate("/");
  };

  return (
    <div className="h-screen p-[20px] sm:mr-[70px}">
      <h1 className={titleCss}>Edit Your Profile Details</h1>
      <div className={titleCss}>{msgText}gh</div>
      <div className={`${divChoice}`}>
        <ImageUpload setFormData={setFormData} img={"profile"} />
        <form
          onSubmit={handleFormSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div>
            <label htmlFor="nickname">Change NickName:</label>
            <input
              className={inputCss}
              placeholder="NickName"
              value={formData.nickname}
              type="text"
              id="nickname"
              name="nickname"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="bio">Change Bio:</label>
            <input
              className={inputCss}
              placeholder="Bio"
              value={formData.bio}
              type="text"
              id="bio"
              name="bio"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="username">Change UserName:</label>
            <input
              className={inputCss}
              placeholder="UserName"
              value={formData.username}
              type="text"
              id="username"
              name="username"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="email">Change Email:</label>
            <input
              className={inputCss}
              placeholder="Email"
              value={formData.email}
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password">Change Password:</label>
            <input
              className={inputCss}
              placeholder="Password"
              value={formData.password}
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
            />
          </div>
          <button
            className={`${submitCss} ${isSubmitted ? "animate-pulse" : ""}`}
            type="submit"
          >
            {btnText}
          </button>
        </form>
        <button className={deleteCss} onClick={handleDelete}>
          DELETE USER
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
