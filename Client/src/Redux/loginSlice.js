import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
  "login/user",
  async (args, thunkApi) => {
    try {
      const user = args;

      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 404) {
        alert("user doesn't exist");
        throw new Error();
      }
      if (res.status === 400) {
        alert("wrong password");
        throw new Error();
      } else {
        const data = res.json();
        return data;
      }
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  loading: false,
  error: "",
  userid: JSON.parse(localStorage.getItem("loggedUserID"))
    ? JSON.parse(localStorage.getItem("loggedUserID"))
    : "",
  name: JSON.parse(localStorage.getItem("loggedUserName"))
    ? JSON.parse(localStorage.getItem("loggedUserName"))
    : "",
  password: "",
};
export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    changeName: (state, action) => {
      state.name = action.payload;
    },
    changePassword: (state, action) => {
      state.password = action.payload;
    },
  },
  extraReducers: {
    [loginUser.pending]: (state, action) => {
      state.loading = true;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.loading = false;
      localStorage.setItem("loggedUserName", JSON.stringify(state.name));
      localStorage.setItem("loggedUserID", JSON.stringify(action.payload));
      state.userid = action.payload;
    },
    [loginUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { changeName, changePassword } = loginSlice.actions;
export default loginSlice.reducer;
