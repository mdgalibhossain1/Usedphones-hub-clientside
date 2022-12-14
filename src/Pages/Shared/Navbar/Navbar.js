import { async } from "@firebase/util";
import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";

const Navbar = () => {
  const { user, logOut, loading, loadedUser } = useContext(AuthContext);

  const loadedUserType = loadedUser?.usertype;

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((err) => console.log(err));
  };
  return (
    <div className="navbar bg-base-100 ">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            {loadedUserType == "Buyer" && (
              <li>
                <Link to={"/buyerdashboard"} className="">
                  Dashboard
                </Link>
              </li>
            )}
            {loadedUserType == "Seller" && (
              <li>
                <Link to={"/sellerdashboard"} className="">
                  Dashboard
                </Link>
              </li>
            )}
            {loadedUserType == "Admin" && (
              <li>
                <Link to={"/admindashboard"} className="">
                  Dashboard
                </Link>
              </li>
            )}
            <li>
              <Link to="/blog">Blog</Link>
            </li>
            {user?.uid ? (
              <>
                <li>
                  <Link onClick={handleLogOut} className="btn btn-outline">
                    Signout
                  </Link>
                </li>
                <span className="userName">{loadedUser?.name}</span>
              </>
            ) : (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          UsedPhones Hub
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-0 gap-2">
          <li>
            <Link to="/" className="btn btn-ghost rounded-lg ">
              Home
            </Link>
          </li>
          {loadedUserType == "Buyer" && (
            <li>
              <Link to={"/buyerdashboard"} className="btn btn-ghost rounded-lg">
                Dashboard
              </Link>
            </li>
          )}
          {loadedUserType == "Seller" && (
            <li>
              <Link
                to={"/sellerdashboard"}
                className="btn btn-ghost rounded-lg"
              >
                Dashboard
              </Link>
            </li>
          )}
          {loadedUserType == "Admin" && (
            <li>
              <Link to={"/admindashboard"} className="btn btn-ghost rounded-lg">
                Dashboard
              </Link>
            </li>
          )}

          <li>
            <Link className="btn btn-ghost" to="/blog">
              Blog
            </Link>
          </li>
          {user?.uid ? (
            <>
              <li>
                <Link
                  onClick={handleLogOut}
                  className="btn btn-outline btn-error rounded-lg"
                >
                  Signout
                </Link>
              </li>
              {loadedUser?.name ? (
                <li>
                  <p className="btn-disabled rounded-lg">{loadedUser?.name}</p>
                </li>
              ) : (
                <li>
                  <p className="btn-disabled rounded-lg">Unknown</p>
                </li>
              )}
            </>
          ) : (
            <li>
              <Link
                className="btn btn-outline btn-error rounded-lg"
                to="/login"
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
      {/* <div className="navbar-end">
        <Link to="" className="btn">
          Get started
        </Link>
      </div> */}
    </div>
  );
};

export default Navbar;
