import React from "react";
import { Link } from "react-router-dom";
import ShowImage from "./ShowImage";
const Card = ({ product }) => {
  return (
    <div className="col-4 mb-4">
      <div className="card">
        <div className="card-header">{product.name}</div>
        <div className="card-body">
            <ShowImage item={product} url='products'/>
          <p>{product.description.substring(0,50)}</p>
          <p>${product.price}</p>
          <Link to="/">
            <button className="btn btn-outline-primary">View Product</button>
          </Link>
          <button className="btn btn-outline-warning ml-2 mt-2">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
