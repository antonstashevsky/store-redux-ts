import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import itemsSlice from "./itemsSlice";

export const store = configureStore({
  reducer: { user: userSlice, items: itemsSlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
