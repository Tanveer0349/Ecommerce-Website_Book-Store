import React, { useEffect, useState } from "react";
import Layout from "../core/Layout";
import { addProduct, getCategories } from "./apiAdmin";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";

const CreateProduct = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    categories: [],
    category: "",
    shipping: "",
    photo: "",
    formData: "",
    error: "",
    createdProduct: "",
    loading: false,
  });
  const {
    name,
    description,
    price,
    quantity,
    categories,
    category,
    shipping,
    error,
    formData,
    createdProduct,
    loading,
  } = values;

  const user = JSON.parse(isAuthenticated());
  const token = user.token;

  const init = async () => {
    try {
      const { data } = await getCategories();
      setValues({ ...values, categories: data, formData: new FormData() });
    } catch (err) {
      setValues({ ...values, err: err.response.data });
    }
  };

  useEffect(() => {
    init();
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, error: "", createdProduct: "", [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setValues({ ...values, error: "", createdProduct: "", loading: true });
    try {
      const { data } = await addProduct(formData, token);
      setValues({
        ...values,
        name: "",
        description: "",
        price: "",
        quantity: "",
        loading: false,
        error: "",
        createdProduct: data,
      });
    } catch (err) {
      setValues({ ...values, error: err.response.data, loading: false });
    }
  };

  const productForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <h4>Post Photo</h4>
        <div className="form-group mt-3">
          <label className="btn btn-outline-primary">
            <input
              onChange={handleChange("photo")}
              type="file"
              accept="image/*"
              name="photo"
            ></input>
          </label>
        </div>
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input
            type="text"
            onChange={handleChange("name")}
            className="form-control"
            value={name}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Description</label>
          <input
            type="text"
            onChange={handleChange("description")}
            className="form-control"
            value={description}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Price</label>
          <input
            type="number"
            onChange={handleChange("price")}
            className="form-control"
            value={price}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Quantity</label>
          <input
            type="number"
            onChange={handleChange("quantity")}
            className="form-control"
            value={quantity}
          />
        </div>

        <div className="form-group">
          <label className="text-muted">Category</label>
          <select onChange={handleChange("category")} className="form-control">
            <option>--select--</option>
            {categories &&
              categories.map((c, i) => (
                <option key={i} value={c._id}>
                  {c.name}
                </option>
              ))}
          </select>
        </div>
        <div className="form-group">
          <label className="text-muted">Shipping</label>
          <select onChange={handleChange("shipping")} className="form-control">
            <option className="text-muted">--select--</option>
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>
        </div>
        <button className="btn btn-outline-primary mb-3">
          {" "}
          Create Product
        </button>
      </form>
    );
  };

  const showSuccess = () => {
    return (
      <div
        className="alert alert-success"
        style={{ display: createdProduct ? "" : "none" }}
      >
        {createdProduct.name} created Successfully !
      </div>
    );
  };
  const showError = () => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    );
  };
  const showLoading = () => {
    return (
      <div
        className="alert alert-info"
        style={{ display: loading ? "" : "none" }}
      >
        Loading . . .
      </div>
    );
  };

  return (
    <Layout
      title="Create Category"
      description="Good Day! Ready to add a new Product?"
      className="col-md-8 offset-md-2"
    >
      {showError()}
      {showSuccess()}
      {showLoading()}
      {productForm()}
    </Layout>
  );
};

export default CreateProduct;
