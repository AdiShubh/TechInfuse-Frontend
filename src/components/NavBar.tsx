import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/hooks/useAuth';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import ThemeSwitcher from './ThemeSwitcher';
import { FaBlog } from "react-icons/fa6";

const Navbar = () => {
  const { user, logout } = useAuth();
  const isAdmin = user?.email === 'shubham@gmail.com';

  const commonLinks = [
    { path: '/about', label: 'About Us' },
  ];

  const userLinks = [
    ...commonLinks,
    { path: '/my-blogs', label: 'My Blogs' },
  ];

  const adminLinks = [
    ...commonLinks,
    { path: '/review-blogs', label: 'Review Blogs' },
  ];

  const linksToShow = user ? (isAdmin ? adminLinks : userLinks) : commonLinks;
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="container mx-auto navbar  py-4  z-50">
      <div className="navbar-start">
        <NavLink to="/" className="flex items-center gap-1">
          <FaBlog size={32} className="text-info" />
          <span className='text-3xl font-bold text-primary italic'>Tech</span>
          <span className='text-3xl font-bold text-info italic'>Infuse</span>
        </NavLink>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2 text-xl">
          {linksToShow.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  isActive
                    ? 'font-semibold  text-primary'
                    : 'hover:text-secondary'
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="navbar-end flex items-center gap-3">
      <ThemeSwitcher />

      <div >
        {user ? (
          <div className="flex items-center gap-2">
            <NavLink to="/profile">
              <FaUserCircle size={32} className="text-primary" />
            </NavLink>
            <button onClick={handleLogout} className="btn btn-md btn-primary">
              Logout
            </button>
          </div>
        ) : (
          <NavLink to="/login" className="btn btn-md btn-primary">
            Login
          </NavLink>
        )}
      </div>
    </div>
    </div>
  );
};

export default Navbar;
