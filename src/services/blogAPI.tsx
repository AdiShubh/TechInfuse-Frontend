import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Blog {
  _id: string;
  title: string;
  category: string;
  content: string;
  image: string;
  author: { _id: string; name: string; username: string; profileImage: string };
  status: "pending" | "approved";
  createdAt: string;
}

export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/",
  }),
  endpoints: (builder) => ({
    getBlogs: builder.query<Blog[], { page: number; limit: number }>({
      query: ({ page, limit }) => `/blogs/all?page=${page}&limit=${limit}`,
      keepUnusedDataFor: 60,
    }),
    getBlogById: builder.query<Blog, string>({
      query: (id) => `/blogs/single/${id}`,
    }),

    updateBlog: builder.mutation<Blog, { id: string; data: Partial<Blog> }>({
      query: ({ id, data }) => {
        const userData = localStorage.getItem("techinfuse_user");
        
        const token = userData ? JSON.parse(userData).token : null;
        console.log("token",token)
        return {
          url: `/blogs/update/${id}`,
          method: "PUT",
          body: data,
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        };
      },
    }),
  }),
});

export const { useGetBlogsQuery, useGetBlogByIdQuery, useUpdateBlogMutation } =
  blogApi;
