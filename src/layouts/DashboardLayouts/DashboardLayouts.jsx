import React from 'react';
import { NavLink, Outlet } from "react-router";
import useAuth from '../../hooks/useAuth';
import useUserRole from '../../hooks/useUserRole';
import Logo from '../../components/shared/Logo/Logo';
import UserAvatarDropdown from '../../components/shared/UserAvatarDropdown/UserAvatarDropdown';


const DashboardLayouts = () => {
  const {role} = useUserRole();

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-base-300 w-full lg:w-[calc(100vw-320px)] fixed z-50">
          <div className="flex-none">
            <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 w-full flex justify-between items-center">
            Dashboard 
            <div className="">
              <UserAvatarDropdown />
            </div>
          </div>
        </div>

        {/* Page content */}
        <div className="pt-[64px]">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side bg-base-200 pt-[64px] lg:pt-0">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          <div className="">
            <Logo></Logo>
          </div>

          {/* Role-based navigation */}
          {role === "Employee" && (
            <>
              <li><NavLink to={'work-sheet'}>WorkSheet</NavLink></li>
              <li><NavLink to={'payment-history'}>Payment History</NavLink></li>
            </>
          )}

          {role === "HR" && (
            <>
              <li><NavLink to={'employee-list'}>Employee List</NavLink></li>
              <li><NavLink to={'progress'}>Progress</NavLink></li>
            </>
          )}

          {role === "Admin" && (
            <>
              <li><NavLink to={'all-employee-list'}>All Employee List</NavLink></li>
              <li><NavLink to={'payroll'}>Payroll</NavLink></li>
              <li><NavLink to={'contact-messages'}>Contact Messages</NavLink></li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayouts;
