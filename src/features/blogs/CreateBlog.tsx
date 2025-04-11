// Add at the top

import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createBlogSchema } from "./createBlogSchema";
import { BlogFormValues } from "./blogTypes";
import { useState, ChangeEvent } from "react";


import RichTextEditor from "../../components/RichTextEditor.tsx/RichTextEditor";
import { createBlogAction } from "./actions/createBlogAction";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Hero from "../../components/Hero";
import Navbar from "../../components/NavBar";

import { useAuth } from "../../context/hooks/useAuth";

export const CreateBlog = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<BlogFormValues>({
    resolver: yupResolver(createBlogSchema),
  });

  

  // Image upload handler
  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/blogs/uploadBlogImage`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload image");
    }

    const data = await response.json();
    console.log("DATA",data)
    setImagePreview(data.imageUrl);
    return data.imageUrl; // Image URL returned from backend
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      try {
        const imageUrl:string = await uploadImage(file);
        setValue("image", imageUrl); // Set the image URL in the form data
      } catch (error) {
        toast.error("Image upload failed");
        console.error(error);
      }
    }
  };

  const onSubmit: SubmitHandler<BlogFormValues> = async (data) => {
    if (!user) {
      toast.error("You must be logged in to create a blog");
      return;
    }

    const formData = new FormData();

    
    // Loop through all fields from form data
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });

    // Add user ID
    formData.append("author", user._id);

    

   
    try {
      const response = await createBlogAction(formData);
       
      if (!response || !response.blogId) {
        throw new Error('Invalid response from server');
      }
      const blogId = response.blogId;
      toast.success("Blog created successfully!");
      reset();
      navigate(`/blogs/${blogId}`);
    } catch (err: any) {
      toast.error("Failed to create blog");
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />
      <Hero HeroText="Create New Blog" />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 mt-10 max-w-4xl mx-auto bg-base-200 p-8 rounded-2xl shadow-xl"
      >
        <div>
          <label className="label text-base-content font-semibold">
            Blog Title
          </label>
          <input
            type="text"
            placeholder="Enter title"
            {...register("title")}
            className="input input-bordered w-full"
          />
          {errors.title && (
            <p className="text-sm text-error mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="label text-base-content font-semibold">
            Category
          </label>
          <select
            {...register("category")}
            defaultValue="Web Development" 
            className="select select-bordered w-full"
          >
            <option value="React JS">React JS</option>
            <option value="Mongo DB">Mongo DB</option>
            <option value="Express JS">Express JS</option>
            <option value="Node JS">Node JS</option>
            <option value="Web Development">Web Development</option>
          </select>
          {errors.category && (
            <p className="text-sm text-error mt-1">{errors.category.message}</p>
          )}
        </div>
        <div>
          <label className="label text-base-content font-semibold">
            Content
          </label>
          <RichTextEditor
            value={""}
            onChange={(html) => setValue("content", html)}
          />
          {errors.content && (
            <p className="text-sm text-error mt-1">{errors.content.message}</p>
          )}
        </div>

        {/* <div>
          <label className="label text-base-content font-semibold">
            Image
          </label>
          <input
            type="text"
            {...register("image")}
            className="input input-bordered w-full"
          />
          {errors.image && (
            <p className="text-sm text-error mt-1">{errors.image.message}</p>
          )}
        </div> */}

        <div>
          <label className="label text-base-content font-semibold">Image</label>
          <input
            type="file"
           
            className="input input-bordered w-full"
            onChange={handleImageUpload}
          />
          {errors.image && (
            <p className="text-sm text-error mt-1">{errors.image.message}</p>
          )}
            {imagePreview && <img src={imagePreview} alt="Preview" style={{ width: 100, height: 100 }} />}
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating..." : "Create Blog"}
        </button>
      </form>
    </>
  );
};
