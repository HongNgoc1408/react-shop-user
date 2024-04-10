import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  name: "",
  email: "",
  isAdmin: "",
  phone: "",
  address: "",
  avatar: "",
  city: "",
  access_token: "",
  refresh_token: "",
};

export const userSlide = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const {
        _id = "",
        name = "",
        email = "",
        isAdmin = "",
        phone = "",
        address = "",
        avatar = "",
        city = "",
        access_token = "",
        refresh_token = "",
      } = action.payload;
      state.name = name;
      state.email = email;
      state.isAdmin = isAdmin;
      state.phone = phone;
      state.address = address;
      state.avatar = avatar;
      state.id = _id;
      state.city = city;
      state.access_token = access_token;
      state.refresh_token = refresh_token;
    },
    resetUser: (state) => {
      state.name = "";
      state.email = "";
      state.isAdmin = "";
      state.phone = "";
      state.address = "";
      state.avatar = "";
      state.city = "";
      state.access_token = "";
      state.refresh_token = "";
    },
  },
});

export const { updateUser } = userSlide.actions;

export default userSlide.reducer;
