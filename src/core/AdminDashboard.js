import React from "react";
import Layout from "./Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
const AdminDashboard = () => {
  const { name, email, role } = JSON.parse(isAuthenticated());

  const adminLinks = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">User Links</h3>
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/create/category"> Create Category </Link>
          </li>
          <li className="list-group-item">
            <Link to="/create/product"> Create Product </Link>
          </li>
        </ul>
      </div>
    );
  };

  const adminInfo = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">Admin Information</h3>
        <ul className="list-group">
          <li className="list-group-item">{name}</li>
          <li className="list-group-item">{email}</li>

          <li className="list-group-item">
            {role === 1 ? "Admin" : "Registered User"}
          </li>
        </ul>
      </div>
    );
  };


  return (
    <Layout
      title="Dashboard"
      description="Admin Dashboard"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-md-3">{adminLinks()}</div>
        <div className="col-md-9">
          {adminInfo()}
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
