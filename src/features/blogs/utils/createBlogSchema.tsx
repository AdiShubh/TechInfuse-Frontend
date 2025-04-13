
import * as yup from "yup";

export const createBlogSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  category: yup.string().required("Category is required"),
  content: yup.string().required().min(10, "Content should be at least 10 characters"),
  image: yup.string().required("Image  is required"),
  status :yup.string().default("pending")
});
