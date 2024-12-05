import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
  name: "user",
  initialState: {
    username: "",
    nickname: "",
    profile: "",
    bio: "",
  },
  reducers: {
    setUser: (state, action) => {
      console.log(action.payload);

      (state.username = action.payload.username),
        (state.nickname = action.payload.nickname),
        (state.profile = action.payload.profile),
        (state.bio = action.payload.bio);
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
