import React from 'react';
import { NavLink, Outlet } from "react-router";
import useUserRole from '../../hooks/useUserRole';
import Logo from '../../components/shared/Logo/Logo';
import UserAvatarDropdown from '../../components/shared/UserAvatarDropdown/UserAvatarDropdown';
import { FaClipboardList, FaMoneyBillAlt, FaUsers, FaChartLine, FaUserCog, FaMoneyCheckAlt, FaEnvelopeOpenText, FaChartPie } from 'react-icons/fa';
import Clock from '../../components/dashboard/Clock';

const getDashboardTitle = (role) => {
  if (role === 'Admin') return "Admin Dashboard";
  if (role === 'HR') return "HR Dashboard";
  if (role === 'Employee') return "Employee Dashboard";
  return "Dashboard";
};

const DashboardLayouts = () => {
  const { role } = useUserRole();

  return (
    <div className="drawer lg:drawer-open @container">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-base-300 w-full lg:w-[calc(100vw-280px)] fixed z-50">
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
          <div className="w-full flex justify-between items-center px-1.5 @min-[320px]:px-2 xl:px-[14px] 2xl:px-4  @min-[1600px]:px-5">
            <h1 className="text-lg md:text-xl hidden @min-[308px]:flex font-semibold">{getDashboardTitle(role)}</h1>
            <h1 className="@min-[350px]:text-lg md:text-xl @min-[308px]:hidden font-semibold">Dashboard</h1>
            <div className="flex items-center gap-3">
              <div className="hidden @min-[500px]:flex">
                <Clock></Clock>
              </div>
              <UserAvatarDropdown />
            </div>
          </div>
        </div>

        {/* Page content */}
        <div className="pt-[64px] px-1.5 @min-[320px]:px-2 xl:px-[14px] 2xl:px-4 @min-[1600px]:px-5">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side bg-base-200 pt-[64px] lg:pt-0">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 text-base-content space-y-1.5 min-h-full w-[280px] p-5">
          <div className="mb-[20px] mt-[10px] ml-[8px]">
            <Logo />
          </div>


          {/* Role-based navigation */}
          {role === "Employee" && (
            <>
              <li>
                <NavLink 
                  to={'employee-overview'} 
                  className={({ isActive }) =>
                    isActive
                      ? "bg-primary/90 text-primary-content text-base sm:text-lg px-3 py-1 rounded"
                      : "text-base sm:text-lg px-3 py-1"
                  }
                >
                   <FaChartPie /> Overview
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to={'work-sheet'} 
                  className={({ isActive }) =>
                    isActive
                      ? "bg-primary/90 text-primary-content text-base sm:text-lg px-3 py-1 rounded"
                      : "text-base sm:text-lg px-3 py-1"
                  }
                >
                  <FaClipboardList /> WorkSheet
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to={'payment-history'} 
                  className={({ isActive }) =>
                    isActive
                      ? "bg-primary/90 text-primary-content text-base sm:text-lg px-3 py-1 rounded"
                      : "text-base sm:text-lg px-3 py-1"
                  }
                >
                  <FaMoneyBillAlt /> Payment History
                </NavLink>
              </li>
            </>
          )}

          {role === "HR" && (
            <>
              <li>
                <NavLink 
                  to={'hr-overview'} 
                  className={({ isActive }) =>
                    isActive
                      ? "bg-primary/90 text-primary-content text-base sm:text-lg px-3 py-1 rounded"
                      : "text-base sm:text-lg px-3 py-1"
                  }
                >
                   <FaChartPie /> Overview
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to={'employee-list'} 
                  className={({ isActive }) =>
                    isActive
                      ? "bg-primary/90 text-primary-content text-base sm:text-lg px-3 py-1 rounded"
                      : "text-base sm:text-lg px-3 py-1"
                  }
                >
                  <FaUsers /> Employee List
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to={'progress'}
                  className={({ isActive }) =>
                    isActive
                      ? "bg-primary/90 text-primary-content text-base sm:text-lg px-3 py-1 rounded"
                      : "text-base sm:text-lg px-3 py-1"
                  }
                >
                  <FaChartLine /> Progress
                </NavLink>
              </li>
            </>
          )}

          {role === "Admin" && (
            <>
              <li>
                <NavLink 
                  to={'admin-overview'} 
                  className={({ isActive }) =>
                    isActive
                      ? "bg-primary/90 text-primary-content text-base sm:text-lg px-3 py-1 rounded"
                      : "text-base sm:text-lg px-3 py-1"
                  }
                >
                   <FaChartPie /> Overview
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to={'all-employee-list'} 
                  className={({ isActive }) =>
                    isActive
                      ? "bg-primary/90 text-primary-content text-base sm:text-lg px-3 py-1 rounded"
                      : "text-base sm:text-lg px-3 py-1"
                  }
                >
                  <FaUserCog /> All Employee List
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to={'payroll'} 
                  className={({ isActive }) =>
                    isActive
                      ? "bg-primary/90 text-primary-content text-base sm:text-lg px-3 py-1 rounded"
                      : "text-base sm:text-lg px-3 py-1"
                  }
                >
                  <FaMoneyCheckAlt /> Payroll
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to={'contact-messages'} 
                  className={({ isActive }) =>
                    isActive
                      ? "bg-primary/90 text-primary-content text-base sm:text-lg px-3 py-1 rounded"
                      : "text-base sm:text-lg px-3 py-1"
                  }
                >
                  <FaEnvelopeOpenText /> Contact Messages
                </NavLink>
              </li>
            </>
          )}

        </ul>
      </div>
    </div>
  );
};

export default DashboardLayouts;
