import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";

import { toast } from "react-toastify";
import { useAppDispatch } from "../hooks/hooks";
import { User } from "../interfaces/user";

interface userState {
  // name: string | null;
  email: string | null;
  token: string | null;
  id: string | null;
  isLoggedIn: boolean;
}

const initialState: userState = {
  // name: null,
  email: null,
  token: null,
  id: null,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    onRegisterUser(state, action) {
      // state.name = action.payload.name;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
      state.isLoggedIn = true;
      toast.success(
        <p className="text-center mt-3">Welcome, {state.email} !</p>,
        {
          position: toast.POSITION.TOP_CENTER,
        }
      );
    },
    onLogoutUser(state) {
      // state.name = null;
      state.email = null;
      state.token = null;
      state.id = null;
      state.isLoggedIn = false;
      toast.info(<p className="text-center mt-3">You've been logged out.</p>, {
        position: toast.POSITION.TOP_CENTER,
      });
    },
    onError(state, action) {
      toast.error(action.payload, { position: toast.POSITION.TOP_CENTER });
    },
    setIsLoggedIn(state) {
      state.isLoggedIn = true;
    },
  },
});

export const { onRegisterUser, onLogoutUser, onError, setIsLoggedIn } =
  userSlice.actions;

export default userSlice.reducer;
