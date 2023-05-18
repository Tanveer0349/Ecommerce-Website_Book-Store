import React, { useEffect, useState } from "react";
import Card from "./Card";
import Layout from "./Layout";
import { getSingleProduct } from "./apiCore";
import { getRelatedProducts } from "./apiCore";

import { useParams } from "react-router-dom";

const Product = () => {
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState({});

  const [error, setError] = useState(false);
  const { productId } = useParams();
  async function loadSingleProduct(productId) {
    try {
      const { data } = await getSingleProduct(productId);
      setProduct(data);
      const response = await getRelatedProducts(data._id);
      setRelatedProducts(response.data);
    } catch (err) {
      setError(err.response.data);
    }
  }

  useEffect(() => {
    loadSingleProduct(productId);
  }, [productId]);
  return (
    <Layout
      title={product.name}
      description={product.description}
      className="container-fluid"
    >
      <div className="row mb-4">
        <div className="col-7">
          {product && product.description && (
            <Card product={product} showViewProductButton={false} />
          )}
        </div>
        <div className="col-5 mb-3">
          <h4>Related Products</h4>
          {relatedProducts && relatedProducts.length>0 && relatedProducts.map((p, i) => (
                        <div className="mb-3 mt-4" key={i}>
                            <Card product={p} />
                        </div>
                    ))}
        </div>
      </div>
    </Layout>
  );
};

export default Product;
