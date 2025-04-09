// pages/Home.tsx
import { useEffect, useRef, useState } from "react";
import BlogCard from "../components/BlogCard";
import { useGetBlogsQuery } from "../services/blogAPI";
import SearchBar from "../components/SerachBar";
import CategoryFilter from "../components/CategoryList";
import FeaturedBlog from "../components/FeaturedBlog";

import FlotActBtn from "../components/FloatActBtn";
import { useAuth } from "../context/hooks/useAuth";
import { Link } from "react-router-dom";

const LIMIT = 9;

const categories = ["Technology", "React", "MongoDB", "Education"];

export const Home = () => {
  const [page, setPage] = useState(1);
  const { data: blogs = [], isFetching } = useGetBlogsQuery({
    page,
    limit: LIMIT,
  });
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

  const filteredBlogs = allBlogs.filter((blog) => {
    const matchesSearch = blog.title
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const matchesCategory =
      selectedCategory === "" || blog.category === selectedCategory;

    return matchesSearch && matchesCategory;
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

  console.log(filteredBlogs);

  return (
    <div>
      <main className="pt-10 p-4 max-w-7xl mx-auto ">
        <div className="flex flex-wrap justify-between  gap-4  p-4">
          <div className=" md:w1/2 sm:w-auto ">
            <CategoryFilter
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              categories={categories}
            />
          </div>

          <div className="  md:w-1/3  sm:w-auto">
            <SearchBar searchText={searchText} setSearchText={setSearchText} />
          </div>
        </div>

        {user?.email ? <FlotActBtn /> : null}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((post, index) =>
            index === 0 ? (
              <div
                key={post._id}
                className="col-span-1 sm:col-span-2 lg:col-span-3"
              >
                <Link to={`/blogs/${post._id}`}>
                  <FeaturedBlog post={post} />
                </Link>
              </div>
            ) : (
              <Link
                to={`/blogs/${post._id}`}
                key={post._id}
                className="flex justify-center"
              >
                <BlogCard post={post} />
              </Link>
            )
          )}
        </div>

        <div ref={observerRef} className="py-10 text-center">
          {isFetching && (
            <span className="loading loading-dots loading-md"></span>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
