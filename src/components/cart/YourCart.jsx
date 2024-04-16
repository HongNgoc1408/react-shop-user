import React, { useEffect, useMemo, useState } from "react";
import {
  FaCheck,
  FaCheckCircle,
  FaMinus,
  FaPlus,
  FaTimesCircle,
  FaTrashAlt,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  addOrderProduct,
  decreaseAmount,
  increaseAmount,
  removeAllOrderProduct,
  removeOrderProduct,
  selectedOrder,
} from "../../redux/slides/orderSlide";
import { useNavigate } from "react-router-dom";
import * as UserService from "../../services/UserService";

const YourCart = () => {
  const [successNotification, setSuccessNotification] = useState(null);
  const [errorNotification, setErrorNotification] = useState(null);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);
  const [listChecked, setListChecked] = useState([]);
  const dispatch = useDispatch();
  const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false);

  const [name, setName] = useState(user?.name);
  const [phone, setPhone] = useState(user?.phone);
  const [address, setAddress] = useState(user?.address);
  const [city, setCity] = useState(user?.city);

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
      }, 3000);
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
    dispatch(selectedOrder({ listChecked }));
  }, [listChecked]);

  const priceMemo = useMemo(() => {
    const result = order?.orderItemsSelected?.reduce((total, cur) => {
      return total + cur.price * cur.amount;
    }, 0);
    if (Number(result)) {
      return result;
    }
    return 0;
  }, [order]);

  const diliveryPriceMemo = useMemo(() => {
    if (priceMemo > 500) {
      return 0;
    } else if (priceMemo === 0) {
      return 0;
    } else {
      return 20;
    }
  }, [priceMemo]);

  const totalPriceMemo = useMemo(() => {
    return Number(priceMemo) + Number(diliveryPriceMemo);
  }, [priceMemo, diliveryPriceMemo]);

  const handleChangeCount = (
    type,
    idProduct,
    amountProduct,
    countInStockProduct
  ) => {
    if (type === "increase") {
      if (amountProduct < countInStockProduct) {
        dispatch(increaseAmount({ idProduct }));
      } else {
        setErrorNotification("Quantity exceeds countInStock");
        setTimeout(() => {
          setErrorNotification(null);
        }, 3000);
      }
    } else {
      if (amountProduct > 1) {
        dispatch(decreaseAmount({ idProduct }));
      } else {
        setErrorNotification("Quantity must be less than 1");
        setTimeout(() => {
          setErrorNotification(null);
        }, 3000);
      }
    }
  };

  const handleDeleteOrder = async (idProduct) => {
    dispatch(removeOrderProduct({ idProduct }));
    setSuccessNotification("Delete successful!");
    setTimeout(() => {
      setSuccessNotification(null);
      window.location.reload();
    }, 3000);
  };

  const onChange = (e) => {
    if (listChecked.includes(e.target.value)) {
      const newListChecked = listChecked.filter(
        (item) => item !== e.target.value
      );
      setListChecked(newListChecked);
    } else {
      setListChecked([...listChecked, e.target.value]);
    }
  };

  const handleOnChangeCheckAll = (e) => {
    if (e.target.checked) {
      const newListChecked = [];
      order?.orderItems?.forEach((item) => {
        newListChecked.push(item?.product);
      });
      setListChecked(newListChecked);
    } else {
      setListChecked([]);
    }
  };

  const handleRemoveAllOrder = () => {
    if (listChecked?.length > 0) {
      dispatch(removeAllOrderProduct({ listChecked }));
      setSuccessNotification("Delete successful!");
      setTimeout(() => {
        setSuccessNotification(null);
        window.location.reload();
      }, 3000);
    }
  };

  const handleCheckoutOrder = () => {
    if (!order?.orderItemsSelected?.length) {
      setErrorNotification("Please select product");
      setTimeout(() => {
        setErrorNotification(null);
      }, 3000);
    } else if (!user?.phone || !user.address || !user?.name || !user?.city) {
      setIsOpenModalUpdateInfo(true);
    } else {
      navigate("/checkout");
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

      <div className="w-2/3 flex flex-col">
        <h1 className="title">Cart</h1>
        <div className=" relative overflow-x-auto shadow-xl sm:rounded-lg">
          <table className="w-full text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-white uppercase bg-Black">
              <tr>
                <th scope="col" className="px-6 py-3 text-nowrap">
                  <input
                    onChange={handleOnChangeCheckAll}
                    checked={listChecked?.length === order?.orderItems.length}
                    value={order?.product}
                    className="mr-1"
                    type="checkbox"
                    name=""
                    id=""
                  />
                  <span>All {order?.orderItems?.length} product</span>
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
                <th scope="col" className="px-6 py-3">
                  <FaTrashAlt
                    // handleRemoveAllOrder,
                    onClick={() => setShowModal(true)}
                    className="size-5 mx-2 text-red-500 font-medium hover:text-red-600"
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              {order.orderItems?.map((order) => {
                return (
                  <>
                    <tr className="bg-white border-b hover:bg-gray-50">
                      <td className="px-6 py-4 flex">
                        <input
                          onChange={onChange}
                          value={order?.product}
                          checked={listChecked.includes(order?.product)}
                          className="mr-1"
                          type="checkbox"
                          name=""
                          id=""
                        />
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
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <>
                            <input
                              type="number"
                              id="amount"
                              className="bg-white w-14 border border-gray-100 text-Black text-sm rounded-md px-2.5 py-1"
                              placeholder="1"
                              required
                              min={1}
                              defaultValue={order?.amount}
                              value={order?.amount}
                            />
                            <div className="flex flex-col w-4/12">
                              <FaPlus
                                onClick={() =>
                                  handleChangeCount(
                                    "increase",
                                    order?.product,
                                    order?.amount,
                                    order?.countInStock
                                  )
                                }
                                className="text-center mx-auto"
                              />
                              <FaMinus
                                onClick={() =>
                                  handleChangeCount(
                                    "decrease",
                                    order?.product,
                                    order?.amount
                                  )
                                }
                                className="text-center mx-auto"
                              />
                            </div>
                          </>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-orange-500">
                        ${order?.price * order?.amount}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          onClick={() => {
                            handleDeleteOrder(order?.product);
                          }}
                          className="text-red-500 font-medium hover:text-red-600"
                        >
                          <FaTrashAlt className="size-5 mx-2" />
                        </span>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className=" w-1/3 flex flex-col">
        <h1 className="title">Total</h1>
        <div className="relative overflow-x-auto shadow-xl sm:rounded-lg mx-5">
          <div className="w-full mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 text-base">
            <div className="mb-2 flex justify-between uppercase font-semibold">
              <p className="text-Black">Subtotal</p>
              <p className="text-Black">${priceMemo}</p>
            </div>
            <div className="flex justify-between uppercase font-semibold">
              <p className="text-Black uppercase">Shipping</p>
              <p className="text-Black">${diliveryPriceMemo}</p>
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

            <button
              onClick={() => {
                handleCheckoutOrder();
              }}
              className="bg-dark-button text-center font-semibold mt-6 w-full rounded-md py-1.5"
            >
              <span className="relative z-10">Checkout</span>
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 overflow-y-auto z-10">
          <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <FaTimesCircle className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Delete Item
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete
                        <span className="font-bold">Sample Item</span>? This
                        action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={() => {
                    handleRemoveAllOrder, setShowModal(true);
                  }}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Delete
                </button>

                <button
                  onClick={() => setShowModal(false)}
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

export default YourCart;
