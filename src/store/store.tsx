import { configureStore } from "@reduxjs/toolkit";
import { blogApi } from "../services/blogAPI"; 

export const store = configureStore({
  reducer: {
    [blogApi.reducerPath]: blogApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(blogApi.middleware),
});

// Optional for types (especially in TS projects)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
