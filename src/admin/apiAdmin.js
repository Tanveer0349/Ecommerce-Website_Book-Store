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