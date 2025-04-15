import DefaultUserImage from "../assets/defailtuser.svg";
import DOMPurify from "dompurify";

interface SinglePost {
  title: string;
  category: string;
  content: string;
  image: string;
  author: { name: string; username: string; profileImage: string };
  createdAt: string;
}

interface BlogProps {
  post: SinglePost;
}

export default function BlogCard({ post }: BlogProps) {

 
  
  return (
    <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="card text-base-content w-96 ">
        <figure className="h-56 rounded-4xl shadow-sm">
          <img
            src={`${post.image}`} 
            alt={post.title}
            className="object-fill w-full h-full rounded-4xl"
            crossOrigin="anonymous"
          />
        </figure>

        <div className="card-body">
          <div>
            <p className="text-md text-primary font-semibold mb-2">
              {post.category}
            </p>
            <h2 className="card-title text-lg line-clamp-2 h-14">
              {post.title}
            </h2>
          </div>

          <div
              className="prose prose-sm md:prose-base line-clamp-5 lg:prose-lg max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.content),
              }}
            />


          <div className="flex items-center gap-2 mt-4">
            <img
              src={post.author.profileImage || DefaultUserImage}
              alt={post.author?.name}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div>
              <p className="text-sm text-base-content">{post.author.name}</p>
              <p className="text-xs text-base-content opacity-60">
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
