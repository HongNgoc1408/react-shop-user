import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slides/useSlides";

export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    user: userReducer,
  },
});
