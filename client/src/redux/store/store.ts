import { configureStore } from "@reduxjs/toolkit";

import { bookApi } from "../services/bookApi";
import { userApi } from "../services/userApi";
import { authorApi } from "../services/authorApi";
import authSlice from "../features/authSlice";

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [bookApi.reducerPath]: bookApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [authorApi.reducerPath]: authorApi.reducer,
    auth: authSlice,
  },

  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      bookApi.middleware,
      authorApi.middleware,
      userApi.middleware
    ),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type
export type AppDispatch = typeof store.dispatch;
