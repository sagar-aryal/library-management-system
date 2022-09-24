import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.role));

      return {
        ...state,
        user: action.payload,
      };
    },
    logout: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      return {
        ...state,
        user: null,
      };
    },
  },
  extraReducers: {},
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
