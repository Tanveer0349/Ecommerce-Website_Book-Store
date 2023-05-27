import React, { useEffect, useState } from "react";
import Layout from "../core/Layout";
import { getSingleProduct, getCategories,updateProduct } from "./apiAdmin";
import { isAuthenticated } from "../auth";
import { Link, useParams,useNavigate } from "react-router-dom";

const UpdateProduct = () => {
    const navigate=useNavigate();
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

  const [categories, setCategories] = useState([]);

  const {
    name,
    description,
    price,
    quantity,
    // categories,
    category,
    shipping,
    error,
    formData,
    createdProduct,
    loading,
  } = values;

  const{productId}=useParams();

  const user = JSON.parse(isAuthenticated());
  const token = user.token;

  const listCategories = async () => {
    try {
      const { data } = await getCategories();
      setCategories(data);
    } catch (err) {
      setValues({ ...values, err: err.response.data });
    }
  };
  const init = async (id) => {
    try {
      const { data } = await getSingleProduct(id);
      console.log('data',data)
      setValues({
        ...values,
        name: data.name,
        description: data.description,
        price: data.price,
        // category: data.category._id,
        shipping: data.shipping,
        quantity: data.quantity,
        formData: new FormData(),
      });
    } catch (err) {
      setValues({ ...values, error: err.response.data });
    }
  };

  useEffect(() => {
    init(productId);
    listCategories();
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, error: "", createdProduct: "", [name]: value });
  };
  const handleSubmit = async (e,id) => {
    e.preventDefault();
    setValues({ ...values, error: "", createdProduct: "", loading: true });
    try {
      const { data } = await updateProduct(id,token,formData);
      console.log('updated',data)
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
      <form onSubmit={(e)=>{handleSubmit(e,productId)}}>
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
          Update Product
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
        {createdProduct.name} UPDATED Successfully !
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
  const redirectUser = (createdProduct) => {
    if (createdProduct){
        navigate('/')
    }
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
      title="Update Product"
      description="Good Day! Ready to update your Product?"
      className="col-md-8 offset-md-2"
    >
          <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showLoading()}
                    {showSuccess()}
                    {showError()}
                    {productForm()}
                    {redirectUser(createdProduct)}
                </div>
            </div>
    </Layout>
  );
};

export default UpdateProduct;
