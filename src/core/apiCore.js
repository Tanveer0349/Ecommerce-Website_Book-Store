import axios from "axios";
import { API } from "../config";
import queryString from "query-string";


export const getCategories = () => {
  return axios.get(`${API}/category`);
};

export const getProducts = (sortBy) => {
  return axios.get(`${API}/products?sortBy=${sortBy}&order=desc`);
};

export const getSingleProduct = (productId) => {
  return axios.get(`${API}/products/${productId}`);
};
export const getRelatedProducts = (productId) => {
  return axios.get(`${API}/products/related/${productId}`);
};
export const getSearchedProducts = (params) => {
  const query=queryString.stringify(params);
  return axios.get(`${API}/products/search?${query}`);
};
export const getClientToken = (token) => {
  return axios.get(`${API}/braintree/getToken`,{
    headers:{
      'token':token
    }
  });
};
export const processPayment = (token,paymentData) => {
  return axios.post(`${API}/braintree/payment`,paymentData,{
    headers:{
      'token':token
    }
  });
};
export const getFilteredProducts = (skip, limit, filters = {}) => {
  const data = { skip, limit, filters };
  return axios.post(`${API}/products/by/search`, data);
};




