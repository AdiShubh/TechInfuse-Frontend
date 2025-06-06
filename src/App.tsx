import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginUser from "./features/auth/pages/LoginUser";
import RegisterUser from "./features/auth/pages/RegisterUser";
import BlogDetail from "./features/blogs/pages/BlogDetail";
import Layout from "./pages/Layout";
import MyBlogs from "./features/blogs/pages/MyBlogs";
import About from "./pages/About";
import { Toaster } from "react-hot-toast";
import { CreateBlog } from "./features/blogs/pages/CreateBlog";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import ReviewBlogs from "./features/blogs/pages/ReviewBlogs";



function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<LoginUser />} />
            <Route path="/register" element={<RegisterUser />} />
            
            <Route path="/my-blogs" element={<MyBlogs />} />
            <Route path="/review-blogs" element={<ReviewBlogs />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/blogs/:id" element={<BlogDetail />} />
          <Route path="/add-blog" element={<CreateBlog />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
