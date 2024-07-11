import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Main from "../layouts/Main";
import ErrorPage from "../pages/ErrorPage";
import Biodatas from "../pages/Biodatas/Biodatas";
import Contact from "../pages/Contact/Contact";
import About from "../pages/About/About";

import DashBoardLayout from "../layouts/DashBoardLayout";
import EditBiodata from "../pages/Dashboard/EditBiodata/EditBiodata";
import PrivateRoute from "./PrivateRoute";
import MyBiodata from "../pages/Dashboard/MyBiodata/MyBiodata";
import BiodataDetails from "../pages/BiodataDetails/BiodataDetails";
import Favourites from "../pages/Favourites/Favourites";
import ManageUser from "../pages/Dashboard/ManageUser/ManageUser";
import MyContactRequest from "../pages/MyContactRequest/MyContactRequest";
import AdminRoute from "./AdminRoute";
import ApproveContactRequest from "../pages/ApproveContactRequest.jsx/ApproveContactRequest";
import PremiumRequest from "../pages/PremiumRequest/PremiumRequest";
import AdminHome from "../pages/AdminHome/AdminHome";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "biodatas",
        element: <Biodatas />,
      },
      {
        path: "biodatas/:id",
        element: (
          <PrivateRoute>
            <BiodataDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashBoardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "edit-biodata",
        element: (
          <PrivateRoute>
            <EditBiodata />,
          </PrivateRoute>
        ),
      },
      {
        path: "my-biodata",
        element: (
          <PrivateRoute>
            <MyBiodata />
          </PrivateRoute>
        ),
      },
      {
        path: "favourites/:email",
        element: (
          <PrivateRoute>
            <Favourites />
          </PrivateRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUser />
          </AdminRoute>
        ),
      },
      {
        path: "approve-contact-request",
        element: (
          <AdminRoute>
            <ApproveContactRequest />
          </AdminRoute>
        ),
      },
      {
        path: "premium-request",
        element: (
          <AdminRoute>
            <PremiumRequest />
          </AdminRoute>
        ),
      },
      {
        path: "admin-home",
        element: (
          <AdminRoute>
            <AdminHome />
          </AdminRoute>
        ),
      },
      {
        path: "my-contact-request/:email",
        element: <MyContactRequest />,
      },
    ],
  },
]);
