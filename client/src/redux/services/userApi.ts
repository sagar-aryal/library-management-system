import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { UserData } from "../../pages/Users";

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/v1" }),
  tagTypes: ["Users"], // tagTypes are for automatically fetching data from updated server
  endpoints: (builder) => ({
    getAllUsers: builder.query<UserData[] | any, void>({
      query: () => "users",
      providesTags: ["Users"],
    }),

    getUserById: builder.query<UserData | any, string>({
      query: (id) => `users/${id}`,
      providesTags: ["Users"],
    }),

    addUser: builder.mutation<{}, UserData>({
      query: (body) => ({
        url: `users`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Users"],
    }),

    updateUser: builder.mutation<void, UserData>({
      query: ({ _id, ...rest }) => ({
        url: `users/${_id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["Users"],
    }),

    deleteUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

// Export hooks for usage in functional components, which are auto-generated based on the defined endpoints
export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
