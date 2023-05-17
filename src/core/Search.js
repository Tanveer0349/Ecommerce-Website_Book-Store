import React, { useEffect, useState } from "react";
import { getCategories, getSearchedProducts } from "./apiCore";
const Search = () => {
  const [data, setData] = useState({
    categories: [],
    category: "",
    search: "",
    searched: "",
    results: "",
  });
  const { categories, category, search, searched, results } = data;

  const loadCategories = async () => {
    try {
      const response = await getCategories();
      setData({ ...data, categories: response.data });
    } catch (err) {
      console.log(err.response.data);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const loadProducts = async () => {
    console.log(data.category,data.search)
    try {
      const params = {};
      if (data.search) {
        params.search = data.search;
      }
      if (category !== "All") {
        params.category = data.category;
      }
  console.log("params",params)
      const response = await getSearchedProducts(params);
      setData({ ...data, results: response.data, searched: true });
    } catch (err) {
      console.log(err);
    }
  };
  

  const handleChange = (name) => (event) => {
    setData({ ...data, [name]: event.target.value, searched: false });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    loadProducts({
      category: category || '',
      search: search || ''
    });
  };
  
  const searchForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <span className="input-group-text">
          <div className="input-group input-group-large">
            <div className="input-group-prepend">
              <select className="btn mr-2" onChange={handleChange("category")}>
                <option value="All">Select Category</option>
                {categories.map((c, i) => (
                  <option key={i} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <input
              type="search"
              className="form-control"
              placeholder="Search by Name"
              onChange={handleChange("search")}
            />
          </div>
          <div className="btn input-group-append" style={{ border: "none" }}>
            <button className="input-groupt-text btn btn-outline-primary">
              Search
            </button>
          </div>
        </span>
      </form>
    );
  };
  return (
    <div className="row">
      <div className="container">
        {searchForm()}
        {JSON.stringify(results)}
      </div>
    </div>
  );
};

export default Search;
