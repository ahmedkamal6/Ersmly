import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getImage = createAsyncThunk(
  "generateImages/getImage",
  async (args, thunkApi) => {
    try {
      const res = await fetch("http://localhost:8080/api/v1/ersmly", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: args }),
      });
      const data = await res.json();
      return data.photo;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
export const submit = createAsyncThunk(
  "generateImages/submit",
  async (args, thunkApi) => {
    try {
      const { name, prompt, photo, userid } = args;
      console.log(args);
      await fetch("http://localhost:8080/api/v1/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, prompt, photo, userid }),
      });
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
const initialState = {
  generatingImg: false,
  loading: false,
  name: "",
  prompt: "",
  photo: "",
  error: null,
};

const generateImage = createSlice({
  name: "generateImages",
  initialState,
  reducers: {
    changeName: (state, action) => {
      state.name = action.payload;
    },
    changePrompt: (state, action) => {
      state.prompt = action.payload;
    },
  },
  extraReducers: {
    // generating the image
    [getImage.pending]: (state, action) => {
      state.generatingImg = true;
      state.error = null;
    },
    [getImage.fulfilled]: (state, action) => {
      state.generatingImg = false;
      state.photo = `data:image/jpeg;base64,${action.payload}`;
    },
    [getImage.rejected]: (state, action) => {
      state.generatingImg = false;
      state.error = action.payload;
    },
    //submitting the form
    [submit.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [submit.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [submit.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export const { changeName, changePrompt } = generateImage.actions;
export default generateImage.reducer;
