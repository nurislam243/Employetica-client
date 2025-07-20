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

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts />,
    children: [
      { path: "/", element: <Home /> },
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
      // Employee routes
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
    ]
  }
]);
