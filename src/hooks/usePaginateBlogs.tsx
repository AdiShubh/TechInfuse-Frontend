// hooks/usePaginatedBlogs.ts
import { useEffect, useRef, useState } from "react";
import { useGetBlogsQuery } from "../services/blogAPI";

interface UsePaginatedBlogsOptions {
  filterFn?: (blog: any) => boolean;
  limit?: number;
  autoLoadMore?: boolean;
}

export const usePaginatedBlogs = ({
  filterFn,
  limit = 9,
  autoLoadMore = true,
}: UsePaginatedBlogsOptions) => {
  const [page, setPage] = useState(1);
  const { data: blogs = [], isFetching, refetch } = useGetBlogsQuery({ page, limit });
  const [allBlogs, setAllBlogs] = useState<any[]>([]);
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (blogs.length) {
      setAllBlogs((prev) => {
        const ids = new Set(prev.map((blog) => blog._id));
        const newBlogs = blogs.filter((blog) => !ids.has(blog._id));
        return [...prev, ...newBlogs];
      });
    }
  }, [blogs]);

  useEffect(() => {
    if (!autoLoadMore) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          !isFetching &&
          blogs.length === limit &&
          allBlogs.length % limit === 0
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
  }, [isFetching, blogs]);

  const filteredBlogs = filterFn ? allBlogs.filter(filterFn) : allBlogs;

  return {
    blogs: filteredBlogs,
    isFetching,
    observerRef,
    refetch,
    setPage,
  };
};
