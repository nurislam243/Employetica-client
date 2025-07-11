import { createBrowserRouter } from "react-router";
import MainLayouts from "../layouts/MainLayouts/MainLayouts";
import Home from "../pages/Home/Home/Home";
import Registration from "../pages/Auth/Registration/Registration";
import ContactUs from "../pages/ContactUs/ContactUs";
import Login from "../pages/Auth/Login/Login";



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
]);