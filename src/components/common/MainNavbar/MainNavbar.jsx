import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
const MainNavbar = () => {
  const { user, logOut } = useAuth();

  return (
    <Navbar fluid className="fixed z-50 w-full shadow-md bg-white dark:bg-gray-900">
      <NavbarBrand href="/">
        <img src="/favicon.svg" className="mr-2 h-6 sm:h-9" alt="Employetica Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Employetica
        </span>
      </NavbarBrand>

      <div className="flex md:order-2 items-center gap-2">
        {user ? (
          <>
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  alt="User avatar"
                  img={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                  rounded
                />
              }
            >
              <DropdownHeader>
                <span className="block text-sm">{user?.displayName || "User"}</span>
                <span className="block truncate text-sm font-medium">
                  {user?.email}
                </span>
              </DropdownHeader>
              <DropdownItem>
                <Link to="/dashboard">Dashboard</Link>
              </DropdownItem>
              <DropdownItem>
                <Link to="/profile">Profile</Link>
              </DropdownItem>
              <DropdownDivider />
              <DropdownItem onClick={logOut}>Logout</DropdownItem>
            </Dropdown>
          </>
        ) : (
          <>
            <Link to="/login">
              <button className="btn btn-sm bg-cyan-600 text-white px-4 py-1 rounded hover:bg-cyan-700 transition">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="btn btn-sm border px-4 py-1 rounded hover:bg-gray-200 transition">
                Register
              </button>
            </Link>
          </>
        )}
        <NavbarToggle />
      </div>

      <NavbarCollapse>
        <NavbarLink as={NavLink} to="/" end>
          Home
        </NavbarLink>
        <NavbarLink as={NavLink} to="/about">
          About
        </NavbarLink>
        <NavbarLink as={NavLink} to="/services">
          Services
        </NavbarLink>
        <NavbarLink as={NavLink} to="/contact">
          Contact
        </NavbarLink>
        {user && (
          <NavbarLink as={NavLink} to="/dashboard">
            Dashboard
          </NavbarLink>
        )}
      </NavbarCollapse>
    </Navbar>
  );
};

export default MainNavbar;
