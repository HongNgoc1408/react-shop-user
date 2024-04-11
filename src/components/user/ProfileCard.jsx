import React, { useEffect, useRef, useState } from "react";
import { FaCheckCircle, FaEdit, FaTimesCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import * as UserService from "../../services/UserService";

const ProfileCard = () => {
  const [successNotification, setSuccessNotification] = useState(null);
  const [errorNotification, setErrorNotification] = useState(null);
  const user = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    setName(user?.name),
      setEmail(user?.email),
      setPhone(user?.phone),
      setAddress(user?.address),
      setAvatar(user?.avatar);
  }, [user]);

  const handleUpdate = async () => {
    try {
      const res = await UserService.updateUser(
        user?.id,
        {
          email,
          name,
          phone,
          address,
          avatar,
        },
        user?.access_token
      );
      //   console.log(res);
      setSuccessNotification("Update successful!");
      setTimeout(() => {
        setSuccessNotification(null);
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.error(error);
      setErrorNotification("Update failed!");
      setTimeout(() => {
        setErrorNotification(null);
      }, 3000);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      const imageURL = e.target.result;
      setAvatar(imageURL);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="border-b-2 block md:flex">
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

      <div className="w-full md:w-2/5 p-4 sm:p-6 lg:p-8 bg-white shadow-md">
        <div className="flex justify-between">
          <span className="text-xl font-semibold block">Your Profile</span>
          <a
            href="#"
            onClick={handleUpdate}
            className="bg-dark-button -mt-2 text-md font-bold rounded-full px-5 py-2"
          >
            Edit
          </a>
        </div>

        <span className="text-gray-600">
          This information is secret so be careful
        </span>
        <div className="w-full p-8 mx-2 flex justify-center">
          {avatar && (
            <img
              src={avatar}
              alt="Image Product"
              className="max-w-xs w-full items-center border"
            />
          )}
        </div>
        <div className="w-full mx-14 flex justify-center">
          <input
            onChange={handleImageChange}
            className="w-full px-5 py-0.5 text-gray-700 bg-transparent rounded"
            id="image"
            name="image"
            type="file"
            required=""
            placeholder="Image Product"
            aria-label="Image Product"
          />
        </div>
      </div>
      <div className="w-full md:w-3/5 p-8 bg-white lg:ml-4 shadow-md">
        <div className="rounded  shadow p-6">
          <div className="pb-6">
            <label
              htmlFor="name"
              className="font-semibold text-gray-700 block pb-1"
            >
              Name
            </label>
            <div className="flex">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="name"
                className="border-none rounded-r px-4 py-2 w-full"
                type="text"
              />
              <FaEdit
                className="size-6 hover:text-orange-500 my-2 mx-2"
                onClick={handleUpdate}
              />
            </div>
          </div>
          <div className="pb-4">
            <label
              htmlFor="email"
              className="font-semibold text-gray-700 block pb-1"
            >
              Email
            </label>
            <div className="flex">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                className="border-none rounded-r px-4 py-2 w-full"
                type="email"
              />
              <FaEdit
                className="size-6 hover:text-orange-500 my-2 mx-2"
                onClick={handleUpdate}
              />
            </div>
          </div>
          <div className="pb-6">
            <label
              htmlFor="phone"
              className="font-semibold text-gray-700 block pb-1"
            >
              Phone
            </label>
            <div className="flex">
              <input
                value={phone}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  const onlyNums = inputValue.replace(/[^0-9]/g, "");
                  setPhone(onlyNums);
                }}
                id="phone"
                className="border-none rounded-r px-4 py-2 w-full"
                type="tel"
                pattern="[0-9]*"
                maxLength={10}
              />
              <FaEdit
                className="size-6 hover:text-orange-500 my-2 mx-2"
                onClick={handleUpdate}
              />
            </div>
          </div>
          <div className="pb-6">
            <label
              htmlFor="address"
              className="font-semibold text-gray-700 block pb-1"
            >
              Address
            </label>
            <div className="flex">
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                id="address"
                className="border-none rounded-r px-4 py-2 w-full"
                type="text"
              />
              <FaEdit
                className="size-6 hover:text-orange-500 my-2 mx-2"
                onClick={handleUpdate}
              />
            </div>
          </div>
          <span className="text-gray-600 pt-4 block opacity-70">
            Personal login information of your account
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
