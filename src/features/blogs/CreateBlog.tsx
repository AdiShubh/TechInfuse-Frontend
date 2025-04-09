// src/features/blogs/CreateBlog.tsx
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createBlogSchema } from "./createBlogSchema";
import { BlogFormValues } from "./blogTypes";

import RichTextEditor from "../../components/RichTextEditor.tsx/RichTextEditor";
import { createBlogAction } from "./actions/createBlogAction";
import { useAuth } from "../../context/hooks/useAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Hero from "../../components/Hero";
import Navbar from "../../components/NavBar";

export const CreateBlog = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<BlogFormValues>({
    resolver: yupResolver(createBlogSchema),
  });

  const onSubmit: SubmitHandler<BlogFormValues> = async (
    data: BlogFormValues
  ) => {
    if (!user) {
      toast.error("You must be logged in to create a blog");
      return;
    }

    try {
      const payload = { ...data, author: user._id };
      await createBlogAction(payload);
      toast.success("Blog created successfully!");
      reset();
      navigate("/");
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
        className="space-y-4 mt-5 max-w-4xl mx-auto bg-base-100 p-6 rounded-lg shadow-md"
      >
        {/* <h2 className="text-xl font-bold">Create New Blog</h2> */}

        <div>
          <label className="label">Blog Title</label>
          <input
            type="text"
            placeholder="Enter title"
            {...register("title")}
            className="input input-bordered w-full"
          />
          {errors.title && <p className="text-error">{errors.title.message}</p>}
        </div>

        <div>
          <label className="label">Category</label>
          <input
            type="text"
            placeholder="e.g. Tech, Lifestyle"
            {...register("category")}
            className="input input-bordered w-full"
          />
          {errors.category && (
            <p className="text-error">{errors.category.message}</p>
          )}
        </div>

        <div className="">
          <label className="label">Content</label>
          <RichTextEditor
            value={""}
            onChange={(html) => setValue("content", html)}
          />
          {errors.content && (
            <p className="text-error">{errors.content.message}</p>
          )}
        </div>

        <div>
          <label className="label">Image URL</label>
          <input
            type="text"
            placeholder="Enter image URL"
            {...register("image")}
            className="input input-bordered w-full"
          />
          {errors.image && <p className="text-error">{errors.image.message}</p>}
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating..." : "Create Blog"}
        </button>
      </form>
    </>
  );
};
