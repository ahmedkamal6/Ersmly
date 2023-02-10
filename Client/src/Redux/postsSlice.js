import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const getAllPosts = createAsyncThunk(
  "posts/getAllPosts",
  async (args, thunkApi) => {
    try {
      const response = await fetch("http://127.0.0.1:8080/api/v1/post", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const result = await response.json();
        return result.data.reverse();
      }
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
const initialState = {
  loading: false,
  allPosts: null,
  searchText: "",
  searchResult: null,
  error:null
};
const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    handleSearch: (state, action) => {
      state.searchText = action.payload;
      const searchResults = state.allPosts.filter((item) => {
        return (
          item.name.toLowerCase().includes(state.searchText.toLowerCase()) ||
          item.prompt.toLowerCase().includes(state.searchText.toLowerCase())
        );
      });
      state.searchResult = searchResults;
    },
  },
  extraReducers: {
    [getAllPosts.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [getAllPosts.fulfilled]: (state, action) => {
      state.loading = false;

      state.allPosts = action.payload;
    },
    [getAllPosts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export const { handleSearch } = postsSlice.actions;
export default postsSlice.reducer;
