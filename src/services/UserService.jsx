import axios from "axios";

// Thiết lập base URL
axios.defaults.baseURL = "http://localhost:3000/api";

export const axiosJWT = axios.create();

export const createUser = async (data) => {
  try {
    const res = await axios.post(`/user/register`, data);
    return res.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const loginUser = async (data) => {
  try {
    const res = await axios.post(`/user/login`, data);
    return res.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const getUser = async (id, access_token) => {
  try {
    const res = await axios.get(`/user/get/${id}`, {
      headers: {
        token: `Bearer ${access_token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log("Error get user:", error);
  }
};

export const getAllUser = async (access_token) => {
  const res = await axios.get(`/user/getAll`, {
    headers: {
      token: `Bearer ${access_token}`,
    },
  });
  return res.data;
};

// export const refreshToken = async () => {
//   const res = await axios.post(`/user/refresh-token`, {
//     withCredentials: true,
//   });
//   return res.data;
// };

export const updateUser = async (id, data, access_token) => {
  const res = await axiosJWT.put(`/user/update/${id}`, data, {
    headers: {
      token: `Bearer ${access_token}`,
    },
  });

  return res.data;
};

export const logoutUser = async () => {
  const res = await axios.post(`/user/logout`);
  return res.data;
};
