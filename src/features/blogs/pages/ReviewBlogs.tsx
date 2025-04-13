import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import FeaturedBlog from "../../../components/FeaturedBlog";
import SearchBar from "../../../components/SearchBar";
import { usePaginatedBlogs } from "../../../hooks/usePaginateBlogs";

const TABS: Array<"Pending" | "Approved" | "Rejected"> = [
  "Pending",
  "Approved",
  "Rejected",
];

export default function ReviewBlogs() {
  const [selectedTab, setSelectedTab] = useState<"Pending" | "Approved" | "Rejected">("Pending");
  const [searchText, setSearchText] = useState(""); // <-- search text state
  const location = useLocation();
  const { refresh } = location.state || {};

  const {
    blogs: filteredBlogs,
    isFetching,
    observerRef,
    refetch,
  } = usePaginatedBlogs({
    filterFn: (blog) => {
      const matchesStatus = blog.status === selectedTab.toLowerCase();
      const matchesSearch = blog.title
        .toLowerCase()
        .includes(searchText.toLowerCase());
      return matchesStatus && matchesSearch;
    },
    limit: 9,
    autoLoadMore: true,
  });

  if (refresh) {
    refetch(); // Refresh blogs after status change
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-4 mb-6 items-center justify-between">
        <div className="flex gap-2">
          {TABS.map((tab) => (
            <button
              key={tab}
              className={`btn ${selectedTab === tab ? "btn-primary" : "btn-outline"} capitalize`}
              onClick={() => setSelectedTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="w-full sm:w-auto mt-4 sm:mt-0">
          <SearchBar searchText={searchText} setSearchText={setSearchText} />
        </div>
      </div>

      {/* Loading Indicator */}
      {isFetching && <p>Loading blogs...</p>}

      {/* No blogs message */}
      {!isFetching && filteredBlogs.length === 0 && (
        <p>No blogs in {selectedTab} state.</p>
      )}

      {/* Blog List */}
      <div className="space-y-6">
        {filteredBlogs.map((blog) => (
          <div key={blog._id} className="cursor-pointer">
            <Link to={`/blogs/${blog._id}`} state={{ refresh: true }}>
              <FeaturedBlog post={blog} />
            </Link>
          </div>
        ))}
      </div>

      {/* Infinite Scroll Loader */}
      <div ref={observerRef} className="py-10 text-center">
        {isFetching && (
          <span className="loading loading-dots loading-md text-primary"></span>
        )}
      </div>
    </div>
  );
}
