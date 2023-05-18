import axios from "axios";
import { API } from "../config";
import queryString from "query-string";




export const getProducts = (sortBy) => {
  return axios.get(`${API}/products?sortBy=${sortBy}&order=desc`);
};

export const getCategories = () => {
  return axios.get(`${API}/category`);
};

export const getFilteredProducts = (skip, limit, filters = {}) => {
  const data = { skip, limit, filters };
  return axios.post(`${API}/products/by/search`, data);
};

// export const getSearchedProducts = (params) => {
//   const query=queryString.stringify(params);
//   console.log(query);
//   return axios.get(`${API}/products/search?${query}`);
// };

export const getSearchedProducts = (params) => {
  const query=queryString.stringify(params);
  return axios.get(`${API}/products/search?${query}`);
};



