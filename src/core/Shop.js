import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import Card from "./Card";
import { getCategories, getFilteredProducts } from "./apiCore";
import CheckBox from "./CheckBox";
import RadioBox from "./RadioBox";

import { prices } from "./fixedPrices";

const Shop = () => {
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState("");
  const [size, setSize] = useState(0);

  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(6);

  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] },
  });

  const loadFilteredProducts = async (filters) => {
    try {
      const { data } = await getFilteredProducts(skip, limit, filters);
      setFilteredProducts(data);
      setSize(data.length);
    } catch (err) {
      setError(err.response.data);
    }
  };
  const init = async () => {
    const { data } = await getCategories();
    setCategories(data);
    loadFilteredProducts(myFilters.filters);
  };
  useEffect(() => {
    init();
  }, []);

  const handlePrice = (value) => {
    const data = prices;
    let array = [];
    for (let key in data) {
      if (data[key]._id == parseInt(value)) {
        array = data[key].array;
      }
    }
    return array;
  };

  const handleFilters = (filters, filterBy) => {
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;
    if (filterBy === "price") {
      let priceRange = handlePrice(filters);
      newFilters.filters[filterBy] = priceRange;
    }
    setMyFilters(newFilters);
    loadFilteredProducts(myFilters.filters);
  };

  const loadMoreProducts = async () => {
    let toSkip = skip + limit;
    try {
      const { data } = await getFilteredProducts(
        toSkip,
        limit,
        myFilters.filters
      );
      setFilteredProducts([...filteredProducts, ...data]);
      setSize(data.length);
      setSkip(toSkip);
    } catch (err) {
      setError(err.response.data);
    }
  };

  const LoadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <button onClick={loadMoreProducts} className="btn btn-warning mb-5">
          Load More
        </button>
      )
    );
  };
  return (
    <Layout
      title="Shop Page"
      description="Search and find books of your choice"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-4">
          <h4>Filter By Categories</h4>
          <ul>
            <CheckBox
              categories={categories}
              handleFilters={(filters) => handleFilters(filters, "category")}
            />
          </ul>
          <h4>Filter By Prices</h4>

          <RadioBox
            prices={prices}
            handleFilters={(filters) => handleFilters(filters, "price")}
          />
        </div>
        <div className="col-8">
          <h4 className="mb-4">Products</h4>

          <div className="row">
            {filteredProducts.map((p, i) => {
              return (
                <div key={i} className="col-4 mb-4">
                  <Card product={p} />
                </div>
              );
            })}
          </div>
          <hr />
          {LoadMoreButton()}
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
