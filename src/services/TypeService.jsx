import axios from "axios";

// Thiết lập base URL
axios.defaults.baseURL = "http://localhost:3000/api";

import { axiosJWT } from "./UserService";

// export const getAllType = async (search, limit) => {
//   let res = {};
//   if (search?.length > 0) {
//     res = await axios.get(
//       `/type/getAll?filter=name&filter=${search}&limit=${limit}`
//     );
//   } else {
//     res = await axios.get(`/type/getAll?limit=${limit}`);
//   }
//   return res.data;
// };

// export const getTypeType = async (type, page, limit) => {
//   if (type) {
//     const res = await axios.get(
//       `/type/getAll?filter=type&filter=${type}&limit=${limit}&page=${page}`
//     );
//     return res.data;
//   }
// };

export const createType = async (data) => {
  const res = await axios.post(`/type/create`, data);
  return res.data;
};

export const getDetailsType = async (id) => {
  const res = await axios.get(`/type/get/${id}`);
  console.log("res.data", res.data);
  return res.data;
};

export const updateType = async (id, access_token, data) => {
  const res = await axiosJWT.put(`/type/update/${id}`, data, {
    headers: {
      token: `Bearer ${access_token}`,
    },
  });
  return res.data;
};

export const deleteType = async (id, access_token) => {
  const res = await axiosJWT.delete(`/type/delete/${id}`, {
    headers: {
      token: `Bearer ${access_token}`,
    },
  });
  return res.data;
};

export const deleteManyType = async (data, access_token) => {
  const res = await axiosJWT.post(`/type/deleteAll`, data, {
    headers: {
      token: `Bearer ${access_token}`,
    },
  });
  return res.data;
};

export const getAllType = async () => {
  const res = await axios.get(`/type/getAll`);
  return res.data;
};
