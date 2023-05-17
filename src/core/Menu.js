import React from "react";
import { Link, useLocation } from "react-router-dom";
import { isAuthenticated, signout } from "../auth";

const Menu = () => {
  const location = useLocation();
  const isActive = (location, path) => {
    if (location.pathname === path) return { color: "#ff9900" };
    else return { color: "#ffffff" };
  };
  const user = JSON.parse(isAuthenticated());
  return (
    <div>
      <ul className="nav nav-tabs bg-primary">
        <li className="nav-item">
          <Link className="nav-link" to="/" style={isActive(location, "/")}>
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/shop" style={isActive(location, "/shop")}>
            Shop
          </Link>
        </li>
        <li className="nav-item">
          {user && user.role === 1 && (
            <Link
              className="nav-link"
              to="/admin/dashboard"
              style={isActive(location, "/admin/dashboard")}
            >
              Dashboard
            </Link>
          )}
          {user && user.role === 0 && (
            <Link
              className="nav-link"
              to="/user/dashboard"
              style={isActive(location, "/user/dashboard")}
            >
              Dashboard
            </Link>
          )}
        </li>
        {!isAuthenticated() && (
          <>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/signup"
                style={isActive(location, "/signup")}
              >
                Signup
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/signin"
                style={isActive(location, "/signin")}
              >
                Signin
              </Link>
            </li>
          </>
        )}
        {isAuthenticated() && (
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/"
              onClick={() => {
                signout();
              }}
              style={{ color: "#ffffff" }}
            >
              Signout
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Menu;
