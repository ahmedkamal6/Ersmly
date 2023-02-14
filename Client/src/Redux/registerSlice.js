import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const registerNew = createAsyncThunk(
  "register/new",
  async (args, thunkApi) => {
    try {
      const user = args;
      if (user.name == "" || user.email == "" || user.password == "") {
        alert("please fill all the fields");
        return;
      }
      if (user.password.length < 6) {
        alert("password must be at least 6 characters");
        return;
      }
      console.log(user);
      fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }).then((res) => {
        if (res.status === 400) {
          alert("user already exist");
        }
      });
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  noMatch: false,
  error: "",
};
const registerSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    changeName: (state, action) => {
      state.fullName = action.payload;
    },
    changeEmail: (state, action) => {
      state.email = action.payload;
    },
    changePassword: (state, action) => {
      state.password = action.payload;
      state.confirmPassword = "";
    },
    changeConfirmPassword: (state, action) => {
      state.confirmPassword = action.payload;
      state.password === state.confirmPassword
        ? (state.noMatch = false)
        : (state.noMatch = true);
    },
  },
  extraReducers: {
    [registerNew.pending]: (state, action) => {
      state.error = null;
      state.loading = true;
    },
    [registerNew.fulfilled]: (state, action) => {
      state.error = null;
      state.loading = false;
    },
    [registerNew.rejected]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});
export const {
  changeName,
  changeEmail,
  changePassword,
  changeConfirmPassword,
} = registerSlice.actions;
export default registerSlice.reducer;
