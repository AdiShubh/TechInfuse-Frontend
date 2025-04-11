import { useState, useEffect } from "react";
import { useGetBlogsQuery } from "../services/blogAPI";
import FeaturedBlog from "../components/FeaturedBlog";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const TABS: Array<"Pending" | "Approved" | "Rejected"> = ["Pending", "Approved", "Rejected"];
const LIMIT = 9;

export default function ReviewBlogs() {
  const [selectedTab, setSelectedTab] = useState<"Pending" | "Approved" | "Rejected">("Pending");
  const [page, setPage] = useState(1);

  const location = useLocation();
  const { refresh } = location.state || {};

  // Fetch blogs with pagination
  const { data: blogs, isLoading ,refetch } = useGetBlogsQuery({
    page,
    limit: LIMIT,
  });

  // Filter blogs based on selected tab
  const filteredBlogs = blogs?.filter((blog: any) => blog.status === selectedTab.toLowerCase());

  useEffect(() => {
    if (refresh) {
      refetch(); // Refresh blogs after status change
    }
  }, [refresh, refetch]);

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Tab Navigation */}
      <div className="flex gap-4 mb-6">
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

      {/* Loading Indicator */}
      {isLoading && <p>Loading blogs...</p>}

      {/* No blogs message */}
      {!isLoading && filteredBlogs?.length === 0 && <p>No blogs in {selectedTab} state.</p>}

      {/* Blog List */}
      <div className="space-y-6">
        {filteredBlogs?.map((blog: any) => (
          <div key={blog._id} className="cursor-pointer">
            <Link to={`/blogs/${blog._id}`} state={{ refresh: true }} >
              <FeaturedBlog post={blog} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
