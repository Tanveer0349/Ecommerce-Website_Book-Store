import React, { useState } from "react";
import { Link } from "react-router-dom";
import ShowImage from "./ShowImage";
import moment from "moment/moment";
import "../styles.css";
import { addItem,updateQuantity,removeProduct } from "./cartHelpers";

const Card = ({
  product,
  showViewProductButton = true,
  showCartButton = true,
  showUpdateOpts = false,
  removeButton=false
}) => {

const[count,setCount]=useState(product.count)

const showRemoveButton = (removeButton) => {
  return (
    removeButton && (
        <button onClick={()=>{removeProduct(product._id)}} className="btn btn-outline-danger ml-2 mt-2">Remove Product</button>
    )
  );
};

  const showViewButton = (showViewProductButton) => {
    return (
      showViewProductButton && (
        <Link to={`/products/${product._id}`}>
          <button className="btn btn-outline-primary mt-2">View Product</button>
        </Link>
      )
    );
  };
  const showAddToCartButton = (showCartButton) => {
    return (
      showCartButton && (
        <button
          onClick={addToCart}
          className="btn btn-outline-success ml-2 mt-2"
        >
          Add to Cart
        </button>
      )
    );
  };

  const addToCart = () => {
    addItem(product, () => {
      console.log("added item to cart");
    });
  };

  const showUpdateButton = (showUpdateOpts) => {
    return (
      showUpdateOpts && (
        <div>
          <div className="input group mb-3 mt-2">
            <div className="input-group-prepend">
              <span className="input-group-text">Adjust Quantity</span>
              <input type="number" className="form-control" value={count} onChange={(event)=>{handleQuantity(event,product._id)}}></input>
            </div>
          </div>
        </div>
      )
    );
  };
  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span className="badge badge-primary badge-pill">In Stock </span>
    ) : (
      <span className="badge badge-primary badge-pill">Out of Stock </span>
    );
  };

  const handleQuantity=(event,productId)=>{
    setCount(event.target.value<1 ? 1 : event.target.value);
    if(event.target.value>=1){
      updateQuantity(productId,event.target.value)
    }
  }
  return (
    <div className="card">
      <div className="card-header name">{product.name}</div>
      <div className="card-body">
        <ShowImage item={product} url="products" />
        <p className="card-p  mt-2">{product.description.substring(0, 100)} </p>
        <p className="card-p black-10">$ {product.price}</p>
        <p className="black-9">
          Category: {product.category && product.category.name}
        </p>
        <p className="black-8">
          Added on {moment(product.createdAt).fromNow()}
        </p>
        {showStock(product.quantity)}
        <br />
        {showViewButton(showViewProductButton)}
        {showRemoveButton(removeButton)}
        {showAddToCartButton(showCartButton)}
        {showUpdateButton(showUpdateOpts)}
      </div>
    </div>
  );
};

export default Card;
