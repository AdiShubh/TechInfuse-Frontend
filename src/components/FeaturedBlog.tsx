


import DefaultUserImage from "../assets/defailtuser.svg";

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

export default function FeaturedBlog({ post }: BlogProps) {
  return (
    <div className="container mx-auto h-58 rounded-xl shadow-sm bg-base-100 text-base-content flex flex-col md:flex-row gap-6 items-start">
    {/* Left: Image */}
    <div className="md:w-2/5 w-full rounded-xl flex justify-center items-center">
      <img
        src={post.image}
        alt="Blog Banner"
        className="object-cover rounded-xl w-full h-58 overflow-hidden"
      />
    </div>

    {/* Right: Content */}
    <div className="md:w-3/5 w-full space-y-4 p-2">
      <span className="text-primary font-semibold text-sm">
        {post.category}
      </span>

      <h2 className="text-2xl font-bold text-base-content">
        {post.title}
      </h2>

      <p className="text-sm line-clamp-3">{post.content}</p>

      {/* Author Info */}
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
  );
}


