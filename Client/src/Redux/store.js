import { configureStore } from "@reduxjs/toolkit";
import postsSlice from "./postsSlice";
import generateImageSlice from "./generateImageSlice";
import registerSlice from "./registerSlice";
import loginSlice from "./loginSlice";
const store = configureStore({
  reducer: {
    post: postsSlice,
    generateImage: generateImageSlice,
    register: registerSlice,
    login:loginSlice
  },
});

export default store;
