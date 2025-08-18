import { createBrowserRouter } from "react-router";
import MainLayouts from "../layouts/MainLayouts/MainLayouts";
import DashboardLayouts from "../layouts/DashboardLayouts/DashboardLayouts";

import Home from "../pages/Home/Home/Home";
import Registration from "../pages/Auth/Registration/Registration";
import Login from "../pages/Auth/Login/Login";
import ContactUs from "../pages/ContactUs/ContactUs";

// Employee Pages
import WorkSheet from "../pages/Dashboard/Employee/WorkSheet/WorkSheet";
import PaymentHistory from "../pages/Dashboard/Employee/PaymentHistory/PaymentHistory";

// HR Pages
import EmployeeList from "../pages/Dashboard/HR/EmployeeList/EmployeeList";
import EmployeeDetails from "../pages/Dashboard/HR/EmployeeDetails/EmployeeDetails";
import Progress from "../pages/Dashboard/HR/Progress/Progress";

// Admin Pages
import AllEmployeeList from "../pages/Dashboard/Admin/AllEmployeeList/AllEmployeeList";
import Payroll from "../pages/Dashboard/Admin/Payroll/Payroll";
import PrivateRoute from "../routes/PrivateRoute";
import ContactMessagesAdmin from "../pages/Dashboard/Admin/ContactMessagesAdmin/ContactMessagesAdmin";
import Forbidden from "../pages/Error/Forbidden/Forbidden";
import DashboardHome from "../pages/Dashboard/DashboardHome";
import AdminOverview from "../pages/Dashboard/Admin/AdminOverview/AdminOverview";
import EmployeeOverview from "../pages/Dashboard/Employee/EmployeeOverview/EmployeeOverview";
import HrOverview from "../pages/Dashboard/HR/HROverview/HrOverview";
import ErrorPage from "../pages/Error/ErrorPage/ErrorPage";
import Profile from "../components/dashboard/Profile";
import AllUpdate from "../pages/AllUpdate/AllUpdate";
import Blogs from "../pages/Blogs/Blogs";
import AllServices from "../pages/AllServices/AllServices";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts />,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      { path: "/", element: <Home /> },
      { path: "all-services", element: <AllServices /> },
      { path: "all-update", element: <AllUpdate /> },
      { path: "blogs", element: <Blogs /> },
      { path: "contact-us", element: <ContactUs /> },
      { path: "register", element: <Registration /> },
      { path: "login", element: <Login /> },
      { path: "forbidden", element: <Forbidden /> }
    ]
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute allowedRoles={["Employee", "HR", "Admin"]}>
        <DashboardLayouts />
      </PrivateRoute>
    ),
    children: [
      { 
        index: true, 
        element: <DashboardHome /> 
      },

      // Employee routes
      {
        path: "employee-overview",
        element: (
          <PrivateRoute allowedRoles={["Employee"]}>
            <EmployeeOverview />
          </PrivateRoute>
        )
      },
      {
        path: "work-sheet",
        element: (
          <PrivateRoute allowedRoles={["Employee"]}>
            <WorkSheet />
          </PrivateRoute>
        )
      },
      {
        path: "payment-history",
        element: (
          <PrivateRoute allowedRoles={["Employee"]}>
            <PaymentHistory />
          </PrivateRoute>
        )
      },

      // HR routes
      {
        path: "hr-overview",
        element: (
          <PrivateRoute allowedRoles={["HR"]}>
            <HrOverview />
          </PrivateRoute>
        )
      },
      {
        path: "employee-list",
        element: (
          <PrivateRoute allowedRoles={["HR"]}>
            <EmployeeList />
          </PrivateRoute>
        )
      },
      {
        path: "details/:slug",
        element: (
          <PrivateRoute allowedRoles={["HR"]}>
            <EmployeeDetails />
          </PrivateRoute>
        )
      },
      {
        path: "progress",
        element: (
          <PrivateRoute allowedRoles={["HR"]}>
            <Progress />
          </PrivateRoute>
        )
      },

      // Admin routes
      {
        path: "admin-overview",
        element: (
          <PrivateRoute allowedRoles={["Admin"]}>
            <AdminOverview />
          </PrivateRoute>
        )
      },
      {
        path: "all-employee-list",
        element: (
          <PrivateRoute allowedRoles={["Admin"]}>
            <AllEmployeeList />
          </PrivateRoute>
        )
      },
      {
        path: "payroll",
        element: (
          <PrivateRoute allowedRoles={["Admin"]}>
            <Payroll />
          </PrivateRoute>
        )
      },
      {
        path: "contact-messages",
        element: (
          <PrivateRoute allowedRoles={["Admin"]}>
            <ContactMessagesAdmin />
          </PrivateRoute>
        )
      },

      {
        path: "profile",
        element: (
          <PrivateRoute allowedRoles={["Employee", "HR", "Admin"]}>
            <Profile></Profile>
          </PrivateRoute>
        )
      }
    ]
  }
]);
