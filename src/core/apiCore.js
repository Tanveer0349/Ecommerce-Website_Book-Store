import axios from "axios";
import { API } from "../config";
import queryString from "query-string";




export const getProducts = (sortBy) => {
  return axios.get(`${API}/products?sortBy=${sortBy}&order=desc`);
};

export const getCategories = () => {
  return axios.get(`${API}/category`);
};
export const getSingleProduct = (productId) => {
  return axios.get(`${API}/products/${productId}`);
};
export const getRelatedProducts = (productId) => {
  return axios.get(`${API}/products/related/${productId}`);
};
export const getSearchedProducts = (params) => {
  const query=queryString.stringify(params);
  console.log(query,"apicore")
  return axios.get(`${API}/products/search?${query}`);
};
export const getFilteredProducts = (skip, limit, filters = {}) => {
  const data = { skip, limit, filters };
  return axios.post(`${API}/products/by/search`, data);
};




