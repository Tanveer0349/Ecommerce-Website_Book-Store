import axios from "axios";
import { API } from "../config";

export const read = (token, id) => {
  return axios.get(`${API}/users/${id}`, {
    headers: {
      'token': token,
    },
  });
};
export const update = (token,id,user) => {
    return axios.put(`${API}/users/${id}`,user, {
      headers: {
        'token': token,
      },
    });
  };

export const updateUser=(user,next)=>{
    if(typeof window!==undefined){
        let auth=JSON.parse(localStorage.getItem('jwt'));
        let token1=auth.token;
         auth=user;
         auth.token=token1;
         localStorage.setItem('jwt',JSON.stringify(auth))
    }
    next();
};
export const getPurchaseHistory = (token,id) => {
  return axios.get(`${API}/users/history/${id}`,{
    headers: {
      'token': token,
    },
  });
};