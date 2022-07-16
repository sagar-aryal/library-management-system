import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BookData } from "../../pages/Books";

// Define a service using a base URL and expected endpoints
export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  tagTypes: ["Books"], // tagTypes are for automatically fetching data from updated server
  endpoints: (builder) => ({
    getAllBooks: builder.query<BookData[] | any, void>({
      query: () => "books",
      providesTags: ["Books"],
    }),

    getBookById: builder.query<BookData | any, string>({
      query: (id) => `books/${id}`,
      providesTags: ["Books"],
    }),

    addBook: builder.mutation<{}, BookData>({
      query: (body) => ({
        url: `books`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Books"],
    }),

    updateBook: builder.mutation<void, BookData>({
      query: ({ id, ...rest }) => ({
        url: `books/${id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["Books"],
    }),

    deleteBook: builder.mutation<void, string>({
      query: (id) => ({
        url: `books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books"],
    }),
  }),
});

// Export hooks for usage in functional components, which are auto-generated based on the defined endpoints
export const {
  useGetAllBooksQuery,
  useGetBookByIdQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = bookApi;
