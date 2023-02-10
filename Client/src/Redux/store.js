import { configureStore } from "@reduxjs/toolkit";
import postsSlice from "./postsSlice";
import generateImageSlice from './generateImageSlice'
const store = configureStore({
    reducer: {
      post: postsSlice,
      generateImage:generateImageSlice
    },
  });

  export default store