import axios from "axios";
import { API } from "../config";

export const addCategory = (name, token) => {
  return axios.post(
    `${API}/category/create`,
    { name },
    {
      headers: {
        token: token,
      },
    }
  );
};
export const addProduct = (product, token) => {
  return axios.post(`${API}/products`, product, {
    headers: {
      token: token,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getCategories = () => {
  return axios.get(`${API}/category`);
};

export const listOrders = (token) => {
  return axios.get(`${API}/order/list`, {
    headers: {
      token: token,
    },
  });
};

export const listStatusValues = (token) => {
  return axios.get(`${API}/order/statuses`, {
    headers: {
      token: token,
    },
  });
};
export const updateStatus = (id, status, token) => {
  return axios.put(
    `${API}/order/status/${id}`,
    { status },
    {
      headers: {
        token: token,
      },
    }
  );
};

// Products Crud OPerations

export const getProducts = () => {
  return axios.get(`${API}/products?limit=100`);
};
export const getSingleProduct = (id) => {
  return axios.get(`${API}/products/${id}`);
};
export const deleteProduct = (id,token) => {
  return axios.delete(`${API}/products/${id}`,{
    headers:{
      'token':token
    }
  });
};
export const updateProduct = (id,token,product) => {
  return axios.put(`${API}/products/${id}`,product,{
    headers:{
      'token':token,
      "Content-Type": "multipart/form-data",
    }
  });
};
