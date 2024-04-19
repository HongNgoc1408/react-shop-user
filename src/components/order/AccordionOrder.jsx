import React from "react";
import { orderContant } from "../../contant";
import * as OrderService from "../../services/OrderService";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";
import { useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useSelector } from "react-redux";

const AccordionOrder = () => {
  const [successNotification, setSuccessNotification] = useState(null);
  const [errorNotification, setErrorNotification] = useState(null);
  const location = useLocation();
  const { state } = location;
  const user = useSelector((state) => state.user);
  console.log(user);
  const fetchOrder = async () => {
    try {
      const res = await OrderService.getAllOrderByUserId(
        state?.id,
        state?.token
      );
      return res.data;
    } catch (error) {
      setErrorNotification("Failed to fetch orders");
      console.error("Error fetching orders:", error);
      return [];
    }
  };

  const queryOrder = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrder,
    enabled: !!state?.id && !!state?.token,
  });

  const { data: orders } = queryOrder;

  const handleCancelOrder = async (order) => {
    try {
      const res = await OrderService.cancelOrder(
        order?._id,
        state?.token,
        order?.orderItems,
        user?.id
      );
      queryOrder.refetch();
      setSuccessNotification("Order canceled successfully!");
      setTimeout(() => {
        setSuccessNotification(null);
      }, 3000);
    } catch (error) {
      setErrorNotification("Failed to cancel order");
      setTimeout(() => {
        setErrorNotification(null);
      }, 3000);
      console.log("Error canceling order:", error);
    }
  };

  return (
    <>
      {/* Thông báo thành công */}
      {successNotification && (
        <div className="absolute top-28 right-0 mt-4 mr-4 bg-green-400 text-white px-4 py-2 rounded">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <FaCheckCircle className="size-10" />
            </div>
            <div className="ml-3 pt-0.5">
              <p className="mt-1 text-md text-white">{successNotification}</p>
            </div>
          </div>
        </div>
      )}
      {/* Thông báo thất bại */}
      {errorNotification && (
        <div className="absolute top-28 right-0 mt-4 mr-4 bg-red-400 text-white px-4 py-2 rounded">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <FaTimesCircle className="size-10" />
            </div>
            <div className="ml-3 pt-0.5">
              <p className="mt-1 text-md text-white">{errorNotification}</p>
            </div>
          </div>
        </div>
      )}
      <div className=" w-full flex flex-col mx-auto">
        <h1 className="title">Bill Order</h1>
      </div>

      {orders?.map((order, index) => {
        return (
          <>
            <div
              key={order?._id}
              className="w-full flex flex-wrap justify-start overflow-hidden bg-Black text-white border border-white mx-auto "
            >
              <label className="grow px-4 py-3 font-medium" htmlFor={index}>
                <div className="flex justify-between font-semibold text-nowrap">
                  <p className="text-orange-500 font-bold">
                    Order #{index + 1}
                  </p>
                </div>
                <div className="flex justify-between font-semibold text-nowrap">
                  <p className="text-orange-500 font-bold">Order date</p>
                  <p className="text-white">
                    {format(Date(order?.createdAt), "dd/MM/yyyy HH:mm:ss")}
                  </p>
                </div>
                <div className="flex justify-between font-semibold text-nowrap">
                  <p className="text-orange-500 font-bold">Status Delivery</p>
                  <p
                    className={` ${order?.isDelivered === "Cancelled" ? "text-orange-500" : "text-white"}`}
                  >
                    {order?.isDelivered}
                  </p>
                </div>
                <div className="flex justify-between font-semibold text-nowrap">
                  <p className="text-orange-500 font-bold">Status Payment</p>

                  <p className={` ${order?.isPaid ? "text-orange-500" : "text-white"}`}>
                    {order?.isPaid
                      ? "Payment has been successful"
                      : "Payment has not been successful"}
                  </p>
                </div>
                <div className="flex justify-end font-semibold text-nowrap">
                  <button
                    onClick={() => handleCancelOrder(order)}
                    className={`bg-light-button my-4 ${order?.isDelivered !== "Wait for confirmation" ? "bg-gray-500 cursor-not-allowed" : ""}`}
                    disabled={order?.isDelivered !== "Wait for confirmation"}
                  >
                    <span className="relative z-10">Cancel Order</span>
                  </button>
                </div>
              </label>
              <input
                className="peer mx-4 my-3 h-0 w-0 appearance-none rounded border text-slate-800 accent-slate-600 opacity-0"
                type="checkbox"
                name={index}
                id={index}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="mx-4 my-3 h-6 w-6 transition-all duration-200 peer-checked:rotate-45"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v12m6-6H6"
                />
              </svg>
              <div
                className="-transparent absolute -translate-y-full scale-75 scale-y-0 mx-auto py-3 opacity-0 
                                transition-all duration-200 peer-checked:relative peer-checked:translate-y-0 peer-checked:scale-100 
                                peer-checked:scale-y-100 peer-checked:bg-transparent peer-checked:opacity-100"
              >
                <div className="w-full flex flex-row">
                  <div className="w-full flex flex-col mx-auto">
                    <div className="relative overflow-x-auto shadow-xl">
                      <table className="w-full text-left rtl:text-right text-gray-500">
                        <thead className="text-xs text-white uppercase bg-Black border border-white">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-nowrap">
                              <span>
                                All {orders?.orderItems?.length} product
                              </span>
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Product
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Quatity
                            </th>
                            <th scope="col" className="px-6 py-3">
                              SubTotal
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {order?.orderItems?.map((order) => {
                            return (
                              <>
                                <tr className="bg-white border-b hover:bg-gray-50">
                                  <td className="px-6 py-4 flex">
                                    <img
                                      src={order?.image}
                                      className="w-16 md:w-20 max-w-full max-h-full"
                                      alt=""
                                    />
                                  </td>
                                  <td className="px-6 py-4 font-semibold text-Black cursor-pointer">
                                    {order?.name}
                                  </td>

                                  <td className="px-6 py-4 font-semibold text-orange-500">
                                    ${order?.price}
                                  </td>
                                  <td className="px-6 py-4 font-semibold text-Black cursor-pointer">
                                    {order?.amount}
                                  </td>
                                  <td className="px-6 py-4 font-semibold text-orange-500">
                                    ${order?.price * order?.amount}
                                  </td>
                                </tr>
                              </>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="w-full flex flex-col ml-10">
                    <div className="relative overflow-x-auto shadow-xl">
                      <div className="w-full mt-6 h-full border bg-white p-6 shadow-md md:mt-0 text-base">
                        <div className="mb-2 flex justify-between uppercase font-semibold">
                          <p className="text-Black">Subtotal</p>
                          <p className="text-Black">${order?.itemsPrice}</p>
                        </div>
                        <div className="flex justify-between uppercase font-semibold">
                          <p className="text-Black uppercase">Shipping</p>
                          <p className="text-Black">${order?.shippingPrice}</p>
                        </div>
                        <hr className="my-4" />
                        <div className="flex justify-between">
                          <p className="text-lg font-semibold uppercase">
                            Total
                          </p>
                          <div className="text-end">
                            <p className="mb-1 text-lg font-semibold text-Black">
                              ${order?.totalPrice}
                            </p>
                            <p className="text-sm text-Black">
                              (including VAT)
                            </p>
                          </div>
                        </div>
                        <hr className="my-4" />
                        <div className="mb-2 flex justify-between font-semibold text-nowrap">
                          <p className="text-Black font-bold">Name</p>
                          <p className="text-Black">
                            {order?.shippingAddress?.fullName}
                          </p>
                        </div>
                        <div className="mb-2 flex justify-between font-semibold text-nowrap">
                          <p className="text-Black font-bold">Phone</p>
                          <p className="text-Black">
                            {order?.shippingAddress?.phone}
                          </p>
                        </div>
                        <div className="flex justify-between font-semibold">
                          <p className="text-Black font-bold">Address</p>
                          <p className="text-Black">
                            {order?.shippingAddress?.address}
                          </p>
                        </div>
                        <div className="flex justify-between font-semibold">
                          <p className="text-Black font-bold">City</p>
                          <p className="text-Black">
                            {order?.shippingAddress?.city}
                          </p>
                        </div>
                        <hr className="my-4" />
                        <div className="flex justify-between font-semibold text-nowrap">
                          <p className="text-Black font-bold">
                            Shipping Address
                          </p>
                          <p className="text-Black font-bold">{`${order?.shippingAddress?.address} - ${order?.shippingAddress?.city}`}</p>
                        </div>
                        <hr className="my-4" />
                        <div className="flex justify-between font-semibold text-nowrap">
                          <p className="text-Black font-bold">
                            Payment Delivery
                          </p>
                          <p className="text-Black">
                            {orderContant.delivery[order?.paymentDelivery]}
                          </p>
                        </div>
                        <hr className="my-4" />
                        <div className="flex justify-between font-semibold text-nowrap">
                          <p className="text-Black font-bold">
                            Payment Methods
                          </p>
                          <p className="text-Black">
                            {orderContant.payment[order?.paymentMethod]}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
};

export default AccordionOrder;
