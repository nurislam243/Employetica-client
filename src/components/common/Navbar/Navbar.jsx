import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { FaBars, FaTimes } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useUserRole from "../../../hooks/useUserRole";
import Logo from "../../shared/Logo/Logo";
import UserAvatarDropdown from "../../shared/UserAvatarDropdown/UserAvatarDropdown";
import Swal from "sweetalert2";
import ThemeToggle from "../../shared/ThemeToggle/ThemeToggle";

const Navbar = ({isScrolled}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { role } = useUserRole();
  const navigate = useNavigate();

  const { user , logOut } = useAuth();

  // handle logout
  const handleLogout = async () => {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You will be logged out of your account.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, log me out',
        cancelButtonText: 'Cancel'
      });
  
      if (result.isConfirmed) {
        try {
          await logOut();
          await Swal.fire(
            'Logged out!',
            'You have been successfully logged out.',
            'success'
          );
          navigate('/');
        } catch (error) {
          console.error('Logout error:', error);
          await Swal.fire(
            'Error!',
            'Something went wrong while logging out.',
            'error'
          );
        }
      } else {
        console.log('Logout cancelled by user.');
      }
  };


  const getDashboardPath = (role) => {
    if (role === 'Employee') return '/dashboard/employee-overview';
    if (role === 'HR') return '/dashboard/hr-overview';
    if (role === 'Admin') return '/dashboard/admin-overview';
    return '/dashboard';
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: getDashboardPath(role), private: true },
    { name: "All Update", path: "/all-update"},
    { name: "Contact Us", path: "/contact-us", private: false },
  ];


  return (
    <header
      className={`fixed bg-base-200 w-full z-50 shadow transition-all duration-300 px-3 @min-[280px]:px-[14px] @min-[350px]:px-4 @min-[400px]:px-5 @min-[500px]:px-8 @min-[1580px]:px-0 ${
        isScrolled ? "py-3" : "py-4 "
      }`}
    >
      <div className="max-w-[1536px] mx-auto flex items-center justify-between">
        {/* Logo (Left) */}
        <Logo></Logo>

        {/* Nav Links (Center) */}
        <div className="hidden md:flex flex-1 justify-center">
          <nav className="flex gap-6 items-center">
            {navItems.map(({ name, path, private: isPrivate }) =>
              !isPrivate || user ? (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) =>
                    `font-medium text-lg ${
                      isActive ? "text-primary" : "hover:text-secondary"
                    }`
                  }
                >
                  {name}
                </NavLink>
              ) : null
            )}
          </nav>
        </div>

        {/* Auth Buttons or User Photo (Right) */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle></ThemeToggle>
          <div className="flex items-center">
            {
              !user ? (
                <div className="my-1 space-x-2">
                  <Link to="/login" className="btn btn-sm btn-outline btn-primary">
                    Login
                  </Link>
                  <Link to="/register" className="btn btn-sm btn-primary">
                    Register
                  </Link>
                </div>
              ) : <UserAvatarDropdown></UserAvatarDropdown>
            }
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-2xl text-primary"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMenuOpen && (
        <div className="md:hidden bg-base-100 w-full absolute top-full left-0 shadow-lg">
          <div className="flex flex-col items-center gap-4 py-4">
            {
              user && <div className="flex justify-center items-center flex-col">
                <div className="avatar">
                  <div className="w-[60px] sm:w-24 rounded-full">
                    <img src={user.photoURL} referrerPolicy="no-referrer"/>
                  </div>
                </div>
                <p className="text-base sm:text-lg font-bold text-base-content/70">{user.displayName}</p>
              </div>
            }

            {navItems.map(({ name, path, private: isPrivate }) =>
              !isPrivate || user ? (
                <NavLink
                  key={path}
                  to={path}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `text-lg font-medium ${
                      isActive ? "text-primary" : "hover:text-secondary"
                    }`
                  }
                >
                  {name}
                </NavLink>
              ) : null
            )}

            <div className="flex items-center">
              <span className="text-lg font-medium hover:text-secondary mr-2">Theme:</span> <ThemeToggle></ThemeToggle>
            </div>

            {!user && (
              <>
                <Link
                  to="/login"
                  className="btn btn-sm btn-outline btn-primary w-3/4"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn btn-sm btn-primary w-3/4"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}

            {user && (
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  handleLogout();
                }}
                className="btn btn-sm btn-primary w-3/4"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
