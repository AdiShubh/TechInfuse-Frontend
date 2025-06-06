import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryList";
import FeaturedBlog from "../components/FeaturedBlog";
import FlotActBtn from "../components/FloatActBtn";
import { useAuth } from "../context/hooks/useAuth";
import { usePaginatedBlogs } from "../hooks/usePaginateBlogs";
import BlogType from "../features/blogs/blogTypes"; // adjust the path

const categories = [
  "Web Development",
  "React JS",
  "Mongo DB",
  "Express JS",
  "Node JS",
];

const Home = () => {
  const { user } = useAuth();
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  

  const { blogs, isFetching, observerRef,refetch, setPage } = usePaginatedBlogs({
    filterFn: (blog: BlogType) => {
      const matchesStatus = blog.status === "approved";
      const matchesSearch = blog.title
        .toLowerCase()
        .includes(searchText.toLowerCase());
      const matchesCategory =
        selectedCategory === "" || blog.category === selectedCategory;
      return matchesStatus && matchesSearch && matchesCategory;
    },
  });
  const location = useLocation();

  useEffect(() => {
    
      refetch();
      setPage(1); // reset to first page if needed
    
  }, [location.pathname ]); 

  return (
    <div className="bg-base-100 text-base-content min-h-screen">
      <main className="pt-10 p-4 max-w-7xl mx-auto">
        {/* Filters Section */}
        <div className="flex flex-wrap justify-between gap-6  ">
          {/* Category Filter */}
          <div className="w-full md:w-2/3 lg:w-1/2 ">
            <CategoryFilter
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              categories={categories}
            />
          </div>

          {/* Search Bar */}
          <div className="w-full md:w-1/3">
            <SearchBar searchText={searchText} setSearchText={setSearchText} />
          </div>
        </div>

        {/* Floating button for authenticated users */}
        {user?.role !== "admin" && user?.email && <FlotActBtn />}

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-6">
          {blogs.map((post, index) =>
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

        {/* Loading indicator with infinite scroll */}
        {isFetching && (
          <div ref={observerRef} className="py-10 text-center">
            <span className="loading loading-dots loading-md text-primary"></span>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
