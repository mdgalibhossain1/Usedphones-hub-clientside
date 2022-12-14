import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import AdminDashboard from "../../Pages/AdminDashboard/AdminDashboard";
import Allbuyers from "../../Pages/AdminDashboard/Allbuyers";
import Allsellers from "../../Pages/AdminDashboard/Allsellers";
import Blog from "../../Pages/Blog/Blog";
import BuyerDashboard from "../../Pages/BuyerDashboard/BuyerDashboard";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import PageNotFound from "../../Pages/PageNotFound/PageNotFound";
import Payment from "../../Pages/Payment/Payment";
import Addproduct from "../../Pages/SellerDashboard/Addproduct";
import SellerDashboard from "../../Pages/SellerDashboard/SellerDashboard";
import Signup from "../../Pages/Signup/Signup";
import SingleCategory from "../../Pages/SingleCategory/SingleCategory";
import PrivateRoute from "./PrivateRoute/PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        loader: () =>
          fetch(
            " https://b612-used-products-resale-server-side-mdgalibhossain1.vercel.app/category"
          ),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <Signup></Signup>,
      },
      {
        path: "/blog",
        element: <Blog></Blog>,
      },
      {
        path: "/buyerdashboard",
        element: (
          <PrivateRoute>
            <BuyerDashboard></BuyerDashboard>
          </PrivateRoute>
        ),
      },
      {
        path: "/sellerdashboard",
        element: (
          <PrivateRoute>
            <SellerDashboard></SellerDashboard>
          </PrivateRoute>
        ),
      },
      // all sellers & admin
      {
        path: "/admindashboard",
        element: (
          <PrivateRoute>
            <AdminDashboard></AdminDashboard>
          </PrivateRoute>
        ),
        loader: () =>
          fetch(
            "https://b612-used-products-resale-server-side-mdgalibhossain1.vercel.app/sellers"
          ),
      },
      {
        path: "/allbuyers",
        element: (
          <PrivateRoute>
            <Allbuyers></Allbuyers>
          </PrivateRoute>
        ),
        loader: () =>
          fetch(
            " https://b612-used-products-resale-server-side-mdgalibhossain1.vercel.app/buyers"
          ),
      },
      {
        path: "/dashboard/payment/:id",
        element: (
          <PrivateRoute>
            <Payment></Payment>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://b612-used-products-resale-server-side-mdgalibhossain1.vercel.app/dashboard/payment/${params.id}`
          ),
      },
      {
        path: "/category/:id",
        element: (
          <PrivateRoute>
            <SingleCategory></SingleCategory>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            ` https://b612-used-products-resale-server-side-mdgalibhossain1.vercel.app/category/${params.id}`
          ),
      },
      {
        path: "/addproduct",
        element: (
          <PrivateRoute>
            <Addproduct></Addproduct>
          </PrivateRoute>
        ),
      },
    ],
  },
  { path: "*", element: <PageNotFound></PageNotFound> },
]);
