// src/features/blogs/api/createBlogAction.ts
import axios from "axios";
import { BlogFormValues } from "../blogTypes"

export const createBlogAction = async (data: BlogFormValues) => {
  const response = await axios.post("http://localhost:5000/blogs/create", data, {
    withCredentials: true,
  });
  return response.data;
};
  