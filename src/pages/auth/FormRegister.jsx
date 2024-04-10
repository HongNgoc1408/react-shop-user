import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { createUser } from "../../services/UserService";
import { FaX } from "react-icons/fa6";

const FormRegister = () => {
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowComfirmPassword, setIsShowComfirmPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [comfirmPassword, setComfirmPassword] = useState("");

  const data = {
    name,
    email,
    password,
    comfirmPassword,
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const res = await createUser(data);
    console.log(res.message);
    if (res.status === "OK") {
      navigate("/login");
    } else {
      console.error(res.message);
      setNotification("Register failed!");
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    }
  };

  return (
    <section className="bg-primaryBG py-12 xl:px-28 px-4">
      {/* Thông báo */}
      {notification && (
        <div className="absolute top-28 right-0 mt-4 mr-4 bg-red-400 text-white px-4 py-2 rounded">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <FaX className="size-10" />
            </div>
            <div className="ml-3 pt-0.5">
              <p className="mt-1 text-md text-white">{notification}</p>
            </div>
          </div>
        </div>
      )}
      
      <form className="max-w-[555px] h-auto bg-white m-auto mt-32 px-14 py-10 rounded-md">
        <h3 className="title">PERSONAL INFORMATION</h3>
        <div className="w-full flex flex-col">
          <div>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Name"
              autoComplete="name"
              autoFocus
              className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
            />
          </div>

          <div>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email Address"
              className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
            />
          </div>

          <div className="relative">
            <span
              className="z-10 absolute top-4 right-8"
              onClick={() => setIsShowPassword(!isShowPassword)}
            >
              {isShowPassword ? <FaEye /> : <FaEyeSlash />}
            </span>

            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={isShowPassword ? "text" : "password"}
              placeholder="Password"
              autoComplete="password"
              className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
            />
          </div>

          <div className="relative">
            <span
              className="z-10 absolute top-4 right-8"
              onClick={() => setIsShowComfirmPassword(!isShowComfirmPassword)}
            >
              {isShowComfirmPassword ? <FaEye /> : <FaEyeSlash />}
            </span>

            <input
              value={comfirmPassword}
              onChange={(e) => setComfirmPassword(e.target.value)}
              type={isShowComfirmPassword ? "text" : "password"}
              placeholder="Comfirm Password"
              autoComplete="password"
              className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
            />
          </div>
        </div>

        <div className="w-full flex items-center">
          <input type="checkbox" className="w-4 h-4 mr-2" />
          <p className="text-sm">
            I want to receive Zara&apos;s newsletter via email
          </p>
        </div>

        <div className="w-full flex items-center">
          <input type="checkbox" className="w-4 h-4 mr-2" />
          <p className="text-sm">I accept the privacy statement</p>
        </div>

        <div className="w-full flex flex-col my-4">
          <button
            disabled={
              !name.length ||
              !email.length ||
              !password.length ||
              !comfirmPassword.length
            }
            onClick={handleRegister}
            className="bg-dark-button disabled:bg-gray-400 disabled:cursor-no-drop"
          >
            Create account
          </button>
        </div>

        <div className="w-full flex items-center justify-center relative py-2">
          <div className="w-full h-[1px] bg-black"></div>
        </div>

        <div className="w-full flex items-center justify-center">
          <p className="text-sm cursor-pointer">
            Do you already have an account?
            <a
              href="/login"
              className="text-sm font-medium cursor-pointer hover:underline hover:underline-offset-2"
            >
              Login
            </a>
          </p>
        </div>
      </form>
    </section>
  );
};

export default FormRegister;
