import { useState } from "react";
import { Link, NavLink } from "react-router";
import { FaBars, FaTimes } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";

const Navbar = ({isScrolled}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { user, logOut } = useAuth();


  const handleLogout = () => {
    logOut();
    console.log("Logging out...");
    // TODO: Add your logout logic here
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dashboard", private: true },
    { name: "Contact Us", path: "/contact-us", private: false },
  ];


  return (
    <header
      className={`bg-base-100 fixed w-full z-50 shadow-md transition-all duration-300 ${
        isScrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="max-w-[1536px] mx-auto px-4 flex items-center justify-between">
        {/* Logo (Left) */}
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-primary">
          <img src="/logo.png" alt="logo" className="w-8 h-8" />
          <span>
            Employetica
          </span>
        </Link>

        {/* Nav Links (Center) */}
        <div className="hidden md:flex flex-1 justify-center">
          <nav className="flex gap-6 items-center">
            {navItems.map(({ name, path, private: isPrivate }) =>
              !isPrivate || user ? (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) =>
                    `text-base font-medium ${
                      isActive ? "text-secondary underline" : "hover:text-primary"
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
          {!user ? (
            <>
              <Link to="/login" className="btn btn-sm btn-outline btn-primary">
                Login
              </Link>
              <Link to="/register" className="btn btn-sm btn-primary">
                Register
              </Link>
            </>
          ) : (
            <div className="dropdown dropdown-end">
              <label tabIndex={0}>
                <img
                  src={user.photoURL}
                  className="w-10 h-10 rounded-full cursor-pointer"
                  alt="User Avatar"
                  referrerPolicy='no-referrer'
                />
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-40"
              >
                <li>
                  <button onClick={handleLogout} className="text-red-600 font-semibold">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
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
            {navItems.map(({ name, path, private: isPrivate }) =>
              !isPrivate || user ? (
                <NavLink
                  key={path}
                  to={path}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `text-lg font-medium ${
                      isActive ? "text-secondary underline" : "hover:text-primary"
                    }`
                  }
                >
                  {name}
                </NavLink>
              ) : null
            )}

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
                className="btn btn-sm btn-error w-3/4"
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
