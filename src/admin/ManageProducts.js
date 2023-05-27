import React, { useEffect, useState } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { getProducts, deleteProduct } from "./apiAdmin";
import { Link } from "react-router-dom";
const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const { token } = JSON.parse(isAuthenticated());

  const loadProducts = async () => {
    try {
      const { data } = await getProducts();
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };

  const removeProduct = async (id) => {
    try {
      await deleteProduct(id,token);
      loadProducts();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <Layout
      title="Manage Products"
      description="Perform CRUD operations on products"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-12">
          <ul className="list-group">
            {products &&
              products.map((p, i) => (
                <li
                  key={i}
                  className="row list-group-item d-flex justify-content-between align-items-center"
                >
                  <h6 className="col-4">{p.name}</h6>
                  <Link to={`/admin/product/update/${p._id}`}>
                    <span className="badge badge-warning badge-pill">
                      Update
                    </span>
                  </Link>
                  <span
                    className="badge badge-danger badge-pill"
                    style={{ cursor: "pointer" }}
                    onClick={()=>{removeProduct(p._id)}}
                  >
                    Delete Product
                  </span>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default ManageProducts;
