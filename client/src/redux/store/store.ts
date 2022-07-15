import { configureStore } from "@reduxjs/toolkit";
import { bookApi } from "../services/bookApi";

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [bookApi.reducerPath]: bookApi.reducer,
  },

  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bookApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type
export type AppDispatch = typeof store.dispatch;
