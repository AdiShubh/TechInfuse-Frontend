import {
  useGetBlogByIdQuery,
  useUpdateBlogMutation,
  useUpdateBlogStatusMutation,
} from "../services/blogAPI";
import { useParams } from "react-router-dom";
import Navbar from "../components/NavBar";
import Hero from "../components/Hero";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import { useLocation } from "react-router-dom";

import RichTextEditor from "../components/RichTextEditor.tsx/RichTextEditor";
import { useAuth } from "../context/hooks/useAuth";
import toast from "react-hot-toast";

import { STATUS } from "../services/blogAPI";



const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { refresh } = location.state || {}; 
  
  

  const [updateBlog] = useUpdateBlogMutation();
  const [updateStatus] = useUpdateBlogStatusMutation();

  const { user } = useAuth();
console.log(user)


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
    return (
      <div className="text-center text-error mt-10">Blog ID not found</div>
    );
  }

  const { data: blog, isFetching, refetch } = useGetBlogByIdQuery(id);
  useEffect(() => {
    if (refresh) {
      refetch(); // Refresh blogs after status change
    }
  }, [refresh, refetch]);

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

    if (newErrors.title || newErrors.content) return;

    try {
      if (!blog?._id) return;
      await updateBlog({ id: blog._id, data: editedContent }).unwrap();
      setIsEditing(false);
      toast.success("Blog updated successfully");
      await refetch();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const isAuthor = user?._id === blog?.author?._id;

  if (isFetching) {
    return (
      <div className="container mx-auto text-center mt-10">Loading....</div>
    );
  }

  if (!blog) {
    return (
      <div className="container mx-auto text-center text-error mt-10">
        Blog not found
      </div>
    );
  }


  const handleUpdate = async (status: "approved" | "rejected") => {
    await updateStatus({ id: blog._id, status });
    
    navigate("/review-blogs" ,{ state: { refresh: true } });
    
  };


  return (
    <>
      <Navbar />
      <Hero HeroText={editedContent.title} />

      <div className="container mx-auto mt-6 space-y-6 px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <h1 className="text-center sm:text-left text-base-content">
            A blog by <strong>{blog.author.name}</strong> on{" "}
            {new Date(blog.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </h1>

          {isAuthor && !isEditing && (
            <button
              className="btn btn-outline btn-sm"
              onClick={() => setIsEditing(true)}
            >
              ✏️ Edit
            </button>
          )}

{user?.role === "admin" && blog.status === STATUS.PENDING && (
          <div className="flex gap-4 justify-end mt-2">
            <button
              className="btn btn-success btn-sm"
             
              onClick={() => handleUpdate(STATUS.APPROVED)}
              
            >
              Approve
            </button>
            <button
              className="btn btn-error btn-sm"
              onClick={() => handleUpdate(STATUS.REJECTED)}
            >
              Reject
            </button>
          </div>
        )}
        {user?.role === "admin" && blog.status === STATUS.APPROVED && (
          <div className="flex gap-4 justify-end mt-2">
            <button
              className="btn btn-success btn-sm"
             disabled
              onClick={() => handleUpdate(STATUS.APPROVED)}
              
            >
              Approve
            </button>
            <button
              className="btn btn-error btn-sm"
              onClick={() => handleUpdate(STATUS.REJECTED)}
            >
              Reject
            </button>
          </div>
        )}
        
         {user?.role === "admin" && blog.status === STATUS.REJECTED && (
          <div className="flex gap-4 justify-end mt-2">
            <button
              className="btn btn-success btn-sm"
             
              onClick={() => handleUpdate(STATUS.APPROVED)}
              
            >
              Approve
            </button>
            <button
              className="btn btn-error btn-sm"
              disabled
              onClick={() => handleUpdate(STATUS.REJECTED)}
            >
              Reject
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
              className="input input-bordered w-full input-primary"
              placeholder="Enter title"
            />
            {errors.title && (
              <div className="text-sm text-error mt-1">{errors.title}</div>
            )}
            <RichTextEditor
              value={editedContent.content}
              onChange={(html) =>
                setEditedContent({ ...editedContent, content: html })
              }
            />
            {errors.content && (
              <div className="text-sm text-error mt-1">{errors.content}</div>
            )}
            <div className="flex gap-4 justify-start">
              <button className="btn btn-primary" onClick={handleSave}>
                Save Changes
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-6">
            <div
              className="prose prose-sm md:prose-base lg:prose-lg max-w-none dark:prose-invert"
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
