import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { AuthorData } from "../../pages/Authors";

// Define a service using a base URL and expected endpoints
export const authorApi = createApi({
  reducerPath: "authorApi",
  baseQuery: fetchBaseQuery({
    /* baseUrl: "https://fs10-fullstack-api.herokuapp.com/api/v1", */
    baseUrl: "http://localhost:5000/api/v1",
  }),
  tagTypes: ["Authors"], // tagTypes are for automatically fetching data from updated server
  endpoints: (builder) => ({
    getAllAuthors: builder.query<AuthorData[] | any, void>({
      query: () => "authors",
      providesTags: ["Authors"],
    }),

    getAuthorById: builder.query<AuthorData | any, string>({
      query: (id) => `authors/${id}`,
      providesTags: ["Authors"],
    }),

    addAuthor: builder.mutation<{}, AuthorData>({
      query: (body) => ({
        url: `authors`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Authors"],
    }),

    updateAuthor: builder.mutation<void, AuthorData>({
      query: ({ _id, ...rest }) => ({
        url: `authors/${_id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["Authors"],
    }),

    deleteAuthor: builder.mutation<void, string>({
      query: (id) => ({
        url: `authors/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Authors"],
    }),
  }),
});

// Export hooks for usage in functional components, which are auto-generated based on the defined endpoints
export const {
  useGetAllAuthorsQuery,
  useGetAuthorByIdQuery,
  useAddAuthorMutation,
  useUpdateAuthorMutation,
  useDeleteAuthorMutation,
} = authorApi;
