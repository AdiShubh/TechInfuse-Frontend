import axios from "axios";

export const createBlogAction = async (formData: FormData) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/blogs/create",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
   console.log("createActionBlogResponse" , response)
    return { blogId: response.data._id };
  } catch (error) {
    console.log(error);
  }
};
