import { Outlet } from "react-router-dom";
import Navbar from "../components/NavBar";
import { Footer } from "../components/Footer";
import Hero from "../components/Hero";


const Layout = () => {
  return (
    <>
      <Navbar />
      <Hero HeroText ={"Code smarter. Build faster. Stay updated."}/>
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer/>
    </>
  );
};

export default Layout;
