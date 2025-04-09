import {
  useGetBlogByIdQuery,
  useUpdateBlogMutation,
} from "../services/blogAPI";
import { useParams } from "react-router-dom";
import Navbar from "../components/NavBar";
import Hero from "../components/Hero";
import { useEffect, useState } from "react";
import DOMPurify from "dompurify";

import RichTextEditor from "../components/RichTextEditor.tsx/RichTextEditor";
import { useAuth } from "../context/hooks/useAuth";
import toast from "react-hot-toast";

const BlogDetail = () => {
  const { id } = useParams();

  const [updateBlog] = useUpdateBlogMutation();

  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState({
    title: "",
    content: "",
  });
  const [errors, setErrors] = useState({
    title: "",
    content: "",
  });

  if (!id) {
    return <div>Blog ID not found</div>;
  }
  const { data: blog, isFetching, refetch } = useGetBlogByIdQuery(id);

  useEffect(() => {
    if (blog) {
      setEditedContent({ title: blog.title, content: blog.content });
    }
  }, [blog]);

  const handleSave = async () => {
    const newErrors = { title: "", content: "" };

    if (!editedContent.title.trim()) {
      newErrors.title = "Title is required.";
    } else if (editedContent.title.length > 150) {
      newErrors.title = "Title must not exceed 50 characters.";
    }

    if (!editedContent.content.trim()) {
      newErrors.content = "Content is required.";
    } else if (editedContent.content.length > 5000) {
      newErrors.content = "Content must not exceed 5000 characters.";
    }

    setErrors(newErrors);

    // Check if any errors exist
    if (newErrors.title || newErrors.content) {
      return;
    }

    try {
      if (!blog?._id) return;
      await updateBlog({ id: blog?._id, data: editedContent }).unwrap();
      setIsEditing(false);
      toast.success("Blog updated successfully");
      await refetch();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const isAuthor = user?._id === blog?.author?._id;

  if (isFetching) {
    return <div className="container mx-auto">Loading....</div>;
  }

  if (!blog) {
    return <div className="container mx-auto">Blog not found</div>;
  }

  return (
    <>
      <Navbar />
      <Hero HeroText={editedContent.title} />

      <div className="container mx-auto mt-6 space-y-6">
        <div className="flex  justify-between px-2">
          <h1 className="text-center">
            A blog by <strong>{blog.author.name}</strong> at{" "}
            {new Date(blog.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </h1>

          {isAuthor && !isEditing && (
            <div className="flex justify-end">
              <button
                className="btn btn-outline btn-sm"
                onClick={() => setIsEditing(true)}
              >
                ✏️ Edit
              </button>
            </div>
          )}
        </div>

        {isEditing ? (
          <div className="space-y-4">
            <input
              type="text"
              value={editedContent.title}
              onChange={(e) => {
                setEditedContent({ ...editedContent, title: e.target.value });
                setErrors({ ...errors, title: "" });
              }}
              className="input input-bordered w-full"
            />
            {errors.title && (
              <div className="text-sm text-red-500 mt-1">{errors.title}</div>
            )}
            <RichTextEditor
              value={editedContent.content}
              onChange={(html) =>
                setEditedContent({ ...editedContent, content: html })
              }
            />
            {errors.content && (
              <div className="text-sm text-red-500 mt-1">{errors.content}</div>
            )}
            <div className="flex gap-4">
              <button className="btn btn-primary" onClick={handleSave}>
                Save Changes
              </button>
              <button
                className="btn btn-ghost"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-6">
            <div
              className="prose px-2"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(blog.content),
              }}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default BlogDetail;
