import { createBrowserRouter } from "react-router";
import MainLayouts from "../layouts/MainLayouts/MainLayouts";
import Home from "../pages/Home/Home/Home";
import Registration from "../pages/Auth/Registration/Registration";
import ContactUs from "../pages/ContactUs/ContactUs";
import Login from "../pages/Auth/Login/Login";
import DashboardLayouts from "../layouts/DashboardLayouts/DashboardLayouts";
import WorkSheet from "../pages/Dashboard/WorkSheet/WorkSheet";



export const router = createBrowserRouter([
  {
    path: "/",
    Component:MainLayouts,
    children: [
      {
        path: '/',
        Component: Home
      },
      {
        path: 'contact-us',
        Component: ContactUs
      },
      {
        path: '/register',
        Component: Registration
      },
      {
        path: '/login',
        Component: Login
      }
    ]
  },
  {
    path: '/dashboard',
    Component: DashboardLayouts,
    children: [
      {
        path: 'work-sheet',
        Component: WorkSheet
      }
    ]
  }
]);