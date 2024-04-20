import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as UserService from "../../services/UserService";
import * as OrderService from "../../services/OrderService";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { removeAllOrderProduct } from "../../redux/slides/orderSlide";
import { useLocation } from "react-router-dom";

const FormCheckout = () => {
  const [successNotification, setSuccessNotification] = useState(null);
  const [errorNotification, setErrorNotification] = useState(null);
  const navigate = useNavigate();
  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);
  // const location = useLocation();
  // console.log(location);
  const dispatch = useDispatch();
  const [name, setName] = useState(user?.name);
  const [phone, setPhone] = useState(user?.phone);
  const [address, setAddress] = useState(user?.address);
  const [city, setCity] = useState(user?.city);
  const [delivery, setDelivery] = useState("Standard");
  const [payment, setPayment] = useState("COD");
  const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false);

  useEffect(() => {
    setName(user?.name),
      setPhone(user?.phone),
      setAddress(user?.address),
      setCity(user?.city);
  }, [user]);

  const handleUpdate = async () => {
    try {
      const res = await UserService.updateUser(
        user?.id,
        { name, phone, address, city },
        user?.access_token
      );
      setSuccessNotification("Update successful!");
      setTimeout(() => {
        setSuccessNotification(null);
        window.location.reload();
      }, 1500);
      setIsOpenModalUpdateInfo(false);
    } catch (error) {
      console.error(error);
      setErrorNotification("Update failed!");
      setTimeout(() => {
        setErrorNotification(null);
      }, 3000);
    }
  };

  useEffect(() => {
    setName(user?.name),
      setPhone(user?.phone),
      setAddress(user?.address),
      setCity(user?.city);
  }, [user]);

  const priceMemo = useMemo(() => {
    const result = order?.orderItemsSelected?.reduce((total, cur) => {
      return total + cur.price * cur.amount;
    }, 0);
    if (Number(result)) {
      return result;
    }
    return 0;
  }, [order]);

  const deliveryPriceMemo = useMemo(() => {
    if (priceMemo > 500) {
      return 0;
    } else if (priceMemo === 0) {
      return 0;
    } else {
      return 20;
    }
  }, [priceMemo]);

  const totalPriceMemo = useMemo(() => {
    return Number(priceMemo) + Number(deliveryPriceMemo);
  }, [priceMemo, deliveryPriceMemo]);

  const handleChangeAddress = () => {
    setIsOpenModalUpdateInfo(true);
  };

  const handleAddOrder = async () => {
    try {
      const res = await OrderService.createOrder(
        {
          token: user?.access_token,
          orderItems: order?.orderItemsSelected,
          fullName: user?.name,
          phone: user?.phone,
          address: user?.address,
          city: user?.city,
          paymentDelivery: delivery,
          paymentMethod: payment,
          itemsPrice: priceMemo,
          shippingPrice: deliveryPriceMemo,
          totalPrice: totalPriceMemo,
          user: user?.id,
        }
        // user?.access_token
      );
      if (res.status === "OK") {
        const arrayOrder = [];
        // console.log( order?.orderItemsSelected);
        order?.orderItemsSelected?.forEach((element) => {
          arrayOrder.push(element.product);
        });
        dispatch(removeAllOrderProduct({ listChecked: arrayOrder }));
        setSuccessNotification("Add order successful!");

        setTimeout(() => {
          setSuccessNotification(null);
        }, 1500);
        setIsOpenModalUpdateInfo(false);
        navigate("/order", {
          state: { id: user?.id, token: user?.access_token },
        });
      }
    } catch (error) {
      // console.log(error);
      setErrorNotification("Add order failed!" + error);
      setTimeout(() => {
        setErrorNotification(null);
      }, 3000);
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

      <div className=" w-1/2 flex flex-col">
        <>
          <h1 className="title">Order</h1>
          <div className=" relative overflow-x-auto shadow-xl sm:rounded-lg">
            <table className="w-full text-left rtl:text-right text-gray-500">
              <thead className="text-xs text-white uppercase bg-Black">
                <tr>
                  <th scope="col" className="px-6 py-3 text-nowrap">
                    <span>All {order?.orderItemsSelected?.length} product</span>
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
                {order.orderItemsSelected?.map((order) => {
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
        </>
        <br />
        <div className="relative overflow-x-auto shadow-xl sm:rounded-lg">
          <div className="w-full mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 text-base">
            <div className="mb-2 flex justify-between uppercase font-semibold">
              <p className="text-Black">Subtotal</p>
              <p className="text-Black">${priceMemo}</p>
            </div>
            <div className="flex justify-between uppercase font-semibold">
              <p className="text-Black uppercase">Shipping</p>
              <p className="text-Black">${deliveryPriceMemo}</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg font-semibold uppercase">Total</p>
              <div className="text-end">
                <p className="mb-1 text-lg font-semibold text-Black">
                  ${totalPriceMemo}
                </p>
                <p className="text-sm text-Black">(including VAT)</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-1/2 flex flex-col pl-10">
        <h1 className="title">Information</h1>
        <div className="relative overflow-x-auto shadow-xl sm:rounded-lg">
          <div className="w-full mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 text-base">
            <div className="mb-2 flex justify-between font-semibold text-nowrap">
              <p className="text-Black font-bold">Name</p>
              <p className="text-Black">{name}</p>
            </div>
            <div className="mb-2 flex justify-between font-semibold text-nowrap">
              <p className="text-Black font-bold">Phone</p>
              <p className="text-Black">{phone}</p>
            </div>
            <div className="flex justify-between font-semibold">
              <p className="text-Black font-bold">Address</p>
              <p className="text-Black">{address}</p>
            </div>
            <div className="flex justify-between font-semibold">
              <p className="text-Black font-bold">City</p>
              <p className="text-Black">{city}</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between font-semibold text-nowrap">
              <p className="text-Black font-bold">Shipping Address</p>
            </div>
            <div className="flex justify-between font-semibold">
              <p className="text-Black font-bold">{`${address} - ${city}`}</p>
              <span
                onClick={handleChangeAddress}
                className="text-orange-500 cursor-pointer"
              >
                Change
              </span>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between font-semibold text-nowrap">
              <p className="text-Black font-bold">Payment Methods</p>
            </div>
            <div
              className="flex flex-row"
              onChange={(e) => {
                setDelivery(e.target.value);
              }}
              value={delivery}
            >
              <label className="inline-flex items-center mt-3">
                <input
                  value="Standard"
                  type="checkbox"
                  checked
                  className="form-checkbox h-5 w-5"
                />
                <span className="ml-2 text-Black">Standard Express</span>
              </label>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between font-semibold text-nowrap">
              <p className="text-Black font-bold">Payment Methods</p>
            </div>
            <div
              className="flex flex-row"
              onChange={(e) => {
                setPayment(e.target.value);
              }}
              value={payment}
            >
              <label className="inline-flex items-center mt-3">
                <input
                  value="COD"
                  type="checkbox"
                  checked
                  className="form-checkbox h-5 w-5"
                />
                <span className="ml-2 text-Black">Payment on delivery</span>
              </label>
            </div>
            {/* <div className="flex flex-row">
              <label className="inline-flex items-center mt-3">
                <input type="checkbox" className="form-checkbox h-5 w-5" />
                <span className="ml-2 text-Black">Payment card</span>
              </label>
            </div> */}
            <hr className="my-4" />
            <button
              onClick={() => {
                handleAddOrder();
              }}
              className="bg-dark-button text-center font-semibold mt-6 w-full rounded-md py-1.5"
            >
              <span className="relative z-10">Order</span>
            </button>
            {/* <button className="bg-dark-button text-center font-semibold mt-6 w-full rounded-md py-1.5">
                <span className="relative z-10">Edit Details</span>
              </button> */}
          </div>
        </div>
      </div>

      {isOpenModalUpdateInfo && (
        <div className="fixed inset-0 overflow-y-auto z-10">
          <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="inline-block align-bottom bg-orange-50 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-orange-50 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h1 className="text-Black text-xl font-bold font-serif text-center mb-2">
                      Information Order
                    </h1>
                    <div>
                      <label
                        htmlFor="name"
                        className="text-gray-800 text-sm font-bold"
                      >
                        Name
                      </label>
                      <input
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        id="name"
                        className="mb-2 mt-2 text-gray-600 focus:outline-none focus:border focus:border-orange-500 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                        placeholder="Name"
                        type="text"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="text-gray-800 text-sm font-bold"
                      >
                        Phone
                      </label>
                      <input
                        id="phone"
                        className="mb-2 mt-2 text-gray-600 focus:outline-none focus:border focus:border-orange-500 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                        placeholder="Phone"
                        value={phone}
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          const onlyNums = inputValue.replace(/[^0-9]/g, "");
                          setPhone(onlyNums);
                        }}
                        type="tel"
                        pattern="[0-9]*"
                        maxLength={10}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="address"
                        className="text-gray-800 text-sm font-bold"
                      >
                        Address
                      </label>
                      <input
                        id="address"
                        type="text"
                        className="mb-2 mt-2 text-gray-600 focus:outline-none focus:border focus:border-orange-500 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                        placeholder="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="city"
                        className="text-gray-800 text-sm font-bold"
                      >
                        City
                      </label>
                      <input
                        id="city"
                        type="text"
                        className="mb-2 mt-2 text-gray-600 focus:outline-none focus:border focus:border-orange-500 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                        placeholder="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </div>
                    <hr />
                    <p className="text-sm text-gray-500">
                      Are you sure you want to update ? This action cannot be
                      undone.
                    </p>
                  </div>
                </div>
              </div>
              <div className="px-4 pb-4 mr-12 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={handleUpdate}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md shadow-sm px-4 py-2 bg-Black bg-dark-button text-base font-medium text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  <span className="relative z-10">Update</span>
                </button>

                <button
                  onClick={() => setIsOpenModalUpdateInfo(false)}
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormCheckout;
