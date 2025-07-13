import React from 'react';
import { NavLink, Outlet } from "react-router";
import useAuth from '../../hooks/useAuth';


const DashboardLayouts = () => {
  const { role } = useAuth();

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-base-300 w-full lg:hidden">
          <div className="flex-none">
            <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost">
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
          <div className="mx-2 flex-1 px-2">Dashboard</div>
        </div>

        {/* Page content */}
        <Outlet />
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {/* Role-based navigation */}
          {role === "employee" && (
            <>
              <li><NavLink to={'work-sheet'}>WorkSheet</NavLink></li>
              <li><NavLink to={'payment-history'}>Payment History</NavLink></li>
            </>
          )}

          {role === "hr" && (
            <>
              <li><NavLink to={'employee-list'}>Employee List</NavLink></li>
              <li><NavLink to={'progress'}>Progress</NavLink></li>
            </>
          )}

          {role === "admin" && (
            <>
              <li><NavLink to={'all-employee-list'}>All Employee List</NavLink></li>
              <li><NavLink to={'payroll'}>Payroll</NavLink></li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayouts;
