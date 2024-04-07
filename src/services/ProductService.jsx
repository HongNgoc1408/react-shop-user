import axios from "axios";

// Thiết lập base URL
axios.defaults.baseURL = "http://localhost:3000/api";
import { axiosJWT } from "./UserService";

export const getAllProduct = async (search, limit) => {
  let res = {};
  if (search?.length > 0) {
    res = await axios.get(
      `/product/getAll?filter=name&filter=${search}&limit=${limit}`
    );
  } else {
    res = await axios.get(`/product/getAll?limit=${limit}`);
  }
  return res.data;
};

export const getProductType = async (type, page, limit) => {
  if (type) {
    const res = await axios.get(
      `/product/getAll?filter=type&filter=${type}&limit=${limit}&page=${page}`
    );
    return res.data;
  }
};

export const createProduct = async (data) => {
  const res = await axios.post(`/product/create`, data);
  return res.data;
};

export const getDetailsProduct = async (id) => {
  const res = await axios.get(`/product/get/${id}`);
  return res.data;
};

export const updateProduct = async (id, access_token, data) => {
  const res = await axiosJWT.put(`/product/update/${id}`, data, {
    headers: {
      token: `Bearer ${access_token}`,
    },
  });
  return res.data;
};

export const deleteProduct = async (id, access_token) => {
  const res = await axiosJWT.delete(`/product/delete/${id}`, {
    headers: {
      token: `Bearer ${access_token}`,
    },
  });
  return res.data;
};

export const deleteManyProduct = async (data, access_token) => {
  const res = await axiosJWT.post(`/product/deleteAll`, data, {
    headers: {
      token: `Bearer ${access_token}`,
    },
  });
  return res.data;
};

export const getAllTypeProduct = async () => {
  const res = await axios.get(`/product/getAllType`);
  return res.data;
};
