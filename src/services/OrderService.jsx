import { axiosJWT } from "./UserService";
import axios from "axios";

// Thiết lập base URL
axios.defaults.baseURL = "http://localhost:3000/api";

// export const createOrder = async (data, access_token) => {
//   const res = await axiosJWT.post(`/order/create/${data.user}`, data, {
//     headers: {
//       token: `Bearer ${access_token}`,
//     },
//   });
//   return res.data;
// };

export const createOrder = async (data, access_token) => {
  const res = await axios.post(`/order/create`, data, {
    headers: {
      token: `Bearer ${access_token}`,
    },
  });
  return res.data;
};

export const getOrderByUserId = async (id, access_token) => {
  const res = await axiosJWT.get(`/order/get/${id}`, {
    headers: {
      token: `Bearer ${access_token}`,
    },
  });
  return res.data;
};

export const getAllOrderByUserId = async (id, access_token) => {
  const res = await axiosJWT.get(`/order/getAll/${id}`, {
    headers: {
      token: `Bearer ${access_token}`,
    },
  });
  return res.data;
};

// export const cancelOrder = async (id, access_token, orderItems) => {
//   const res = await axiosJWT.delete(
//     `/order/cancel-order/${id}`,
//     {
//       headers: {
//         token: `Bearer ${access_token}`,
//       },
//       data: orderItems,
//     }
//   );
//   return res.data;
// };

export const cancelOrder = async (id, access_token, orderItems, userId) => {
  const data = { orderItems, orderId: id };
  const res = await axiosJWT.delete(
    `/order/cancel-order/${userId}`,
    { data },
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  console.log("res.data", res.data);
  return res.data;
};

export const getAllOrder = async (access_token) => {
  const res = await axiosJWT.get(`/order/get-all-order`, {
    headers: {
      token: `Bearer ${access_token}`,
    },
  });
  return res.data;
};

export const updateOrder = async (id, isDelivered) => {
  try {
    const res = await axiosJWT.put(`/order/update/${id}`, { isDelivered });
    return res.data;
  } catch (error) {
    console.error("Error updating order:", error);
    throw error;
  }
};
