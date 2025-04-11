import { useEffect, useRef, useState } from "react";
import BlogCard from "../components/BlogCard";
import { useGetBlogsQuery } from "../services/blogAPI";
import SearchBar from "../components/SerachBar";
import CategoryFilter from "../components/CategoryList";
import { Link } from "react-router-dom";

import FlotActBtn from "../components/FloatActBtn";
import { useAuth } from "../context/hooks/useAuth";

const LIMIT = 9;

const categories = ["Pending", "Approved"];

export const MyBlogs = () => {
  const [page, setPage] = useState(1);
  const { data: blogs = [], isFetching,refetch } = useGetBlogsQuery({
    page,
    limit: LIMIT,
  });

  useEffect(() => {
    refetch(); // This ensures fresh data is pulled when the page loads
  }, []); 
  
  const [allBlogs, setAllBlogs] = useState<typeof blogs>([]);

  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const observerRef = useRef<HTMLDivElement | null>(null);

  const { user } = useAuth();

  useEffect(() => {
    if (blogs.length) {
      setAllBlogs((prev) => {
        const ids = new Set(prev.map((blog) => blog._id));
        const newBlogs = blogs.filter((blog) => !ids.has(blog._id));
        return [...prev, ...newBlogs];
      });
    }
  }, [blogs]);

  const userBlogs = allBlogs.filter((blog) => blog.author._id === user?._id);

  const filteredBlogs = userBlogs.filter((blog) => {
    const matchesSearch = blog.title
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const matchesStatus =
      selectedCategory === "" ||
      blog.status.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          !isFetching &&
          blogs.length === LIMIT
        ) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    const current = observerRef.current;
    if (current) observer.observe(current);
    return () => {
      if (current) observer.unobserve(current);
    };
  }, [isFetching]);

  return (
    <div className="bg-base-100 text-base-content min-h-screen">
      <main className="pt-10 p-4 max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-between gap-4 p-4 ">
          <div className="md:w-1/2 sm:w-full">
            <CategoryFilter
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              categories={categories}
            />
          </div>

          <div className="md:w-1/3 sm:w-full">
            <SearchBar searchText={searchText} setSearchText={setSearchText} />
          </div>
        </div>

        {user?.email ? <FlotActBtn /> : null}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-6">
          {filteredBlogs.map((post) => (
            <Link
              to={`/blogs/${post._id}`}
              key={post._id}
              className="flex justify-center"
            >
              <BlogCard post={post} />
            </Link>
          ))}
        </div>

        <div ref={observerRef} className="py-10 text-center">
          {isFetching && (
            <span className="loading loading-dots loading-md text-primary"></span>
          )}
        </div>
      </main>
    </div>
  );
};

export default MyBlogs;
