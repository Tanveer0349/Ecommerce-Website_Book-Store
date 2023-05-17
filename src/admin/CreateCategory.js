import React, { useState } from "react";
import Layout from "../core/Layout";
import { addCategory } from "./apiAdmin";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
const CreateCategory = () => {
  const user = JSON.parse(isAuthenticated());

  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSucces] = useState(false);

  const handleChange = (e) => {
    setError(false);
    setSucces(false);
    setName(e.target.value);
  };
  async function handleSubmit(e) {
    e.preventDefault();
    setSucces(false);
    try {
      await addCategory(name, user.token);
      setSucces(true);
    } catch (err) {
      setError(err.response.data);
    }
  }

  const categoryForm = () => {
    return (
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group mt-5">
          <label className="text-muted">Name</label>
          <input
            type="text"
            onChange={(e) => handleChange(e)}
            className="form-control"
            value={name}
          />
        </div>
        <button className="btn btn-primary">Create Category</button>
      </form>
    );
  };

  const showError = () => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        Category must be unique
      </div>
    );
  };
  const showSuccess = () => {
    return (
      <div
        className="alert alert-success"
        style={{ display: success ? "" : "none" }}
      >
        New Category created successfully!
      </div>
    );
  };
  const showBackTik = () => {
    return (
      <div
        className="mt-5"
      >
        <Link className="text-warning" to='/admin/dashboard'> Get Back to Dashboard </Link>
      </div>
    );
  };

  return (
    <Layout
      title="Create Category"
      description="Good Day! Ready to create a category?"
      className="col-md-8 offset-md-2"
    >
      {showSuccess()}
      {showError()}
      {categoryForm()}
      {showBackTik()}
    </Layout>
  );
};

export default CreateCategory;
