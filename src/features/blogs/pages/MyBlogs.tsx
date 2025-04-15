import { useState , useEffect } from "react";
import BlogCard from "../../../components/BlogCard";
import SearchBar from "../../../components/SearchBar";
import CategoryFilter from "../../../components/CategoryList";
import { Link } from "react-router-dom";
import FlotActBtn from "../../../components/FloatActBtn";
import { useAuth } from "../../../context/hooks/useAuth";
import { usePaginatedBlogs } from "../../../hooks/usePaginateBlogs";
import { useLocation } from "react-router-dom";

const location = useLocation();

const categories = ["Pending", "Approved"];

export const MyBlogs = () => {
  const { user } = useAuth();
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  console.log(user)

  const {
    blogs: filteredBlogs,
    isFetching,
    observerRef,
    refetch,
    setPage,
  } = usePaginatedBlogs({
    filterFn: (blog) => {
      if (user?._id && blog.author._id !== user._id) return false;

      const matchesSearch = blog.title
        .toLowerCase()
        .includes(searchText.toLowerCase());

      const matchesStatus =
        selectedCategory === "" ||
        blog.status.toLowerCase() === selectedCategory.toLowerCase();

      return matchesSearch && matchesStatus;
    },
    limit: 9,
    autoLoadMore: true,
  });

  useEffect(() => {
    if (user?._id) {
      refetch();
      setPage(1); // reset to first page if needed
    }
  }, [location.pathname, user?._id]);
 

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

        {user?.email && <FlotActBtn />}

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
