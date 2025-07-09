import { createBrowserRouter } from "react-router";
import MainLayouts from "../layouts/MainLayouts/MainLayouts";
import Home from "../pages/Home/Home/Home";



export const router = createBrowserRouter([
  {
    path: "/",
    Component:MainLayouts,
    children: [
      {
        path: '/',
        Component: Home
      }
    ]
  },
]);