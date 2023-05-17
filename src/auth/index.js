import axios from "axios";
import { API } from "../config";
export const signUp = (user) => {
  return axios.post(`${API}/signup`, user);
};

export const signin = (user) => {
  return axios.post(`${API}/signin`, user);
};

export const authenticate = (token, next) => {
  if (typeof window !== undefined) {
    localStorage.setItem("jwt", token);
    next();
  }
};
export const signout = () => {
  if (typeof window !== undefined) {
    localStorage.removeItem("jwt");
  }
};

export const isAuthenticated = () => {
  if (typeof window == undefined) {
    return false;
  } else if (localStorage.getItem("jwt")) {
  return localStorage.getItem('jwt');
  ;
  } else {
    return false;
  }
};

export const isAdmin = () => {
  if (typeof window == undefined) {
    return false;
  } else if (localStorage.getItem("jwt")) {
    let role= JSON.parse(localStorage.getItem('jwt')).role;
    if(role===1)  return true;
    return false;
  } else {
    return false;
  }
};
