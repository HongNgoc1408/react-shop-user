import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useMutationHooks } from "../../hooks/useMutationHooks";
import * as UserService from "../../services/UserService";
import { createUser } from "../../services/UserService";

const FormRegister = () => {
  const navigate = useNavigate();

  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowComfirmPassword, setIsShowComfirmPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [comfirmPassword, setComfirmPassword] = useState("");

  const handleOnchangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const mutation = useMutationHooks((data) => UserService.createUser(data));

  const { data, isPending, isSuccess, isError } = mutation;

  const handleNavigateLogin = () => {
    navigate("/login");
  };

  useEffect(() => {
    if (isSuccess) {
      console.log("Registration successful!");
      navigate("/login");
    }
  }, [isSuccess, navigate]);

  const handleOnchangeName = (e) => {
    setName(e.target.value);
  };

  const handleOnchangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleOnchangeCP = (e) => {
    setComfirmPassword(e.target.value);
  };

  const data1 = {
    name,
    email,
    password,
    comfirmPassword,
  };
  const handleRegister = async () => {
    // mutation.mutate({
    await createUser(data1);
    // });
  };

  return (
    <section className="bg-primaryBG py-12 xl:px-28 px-4">
      <form className="max-w-[555px] h-auto bg-white m-auto mt-32 px-14 py-10 rounded-md">
        <h3 className="title">PERSONAL INFORMATION</h3>
        <div className="w-full flex flex-col">
          <div>
            <input
              value={name}
              onChange={handleOnchangeName}
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
              onChange={handleOnchangeEmail}
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
              onChange={handleOnchangePassword}
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
              onChange={handleOnchangeCP}
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

        {/* Error or success messages */}
        {data?.status === "ERR" && (
          <span style={{ color: "red" }}>{data?.message}</span>
        )}
        {isError && <span className="text-red-500">{data?.message}</span>}
        {isSuccess && <span className="text-green-500">{data?.message}</span>}

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
            <span
              onClick={handleNavigateLogin}
              className="text-sm font-medium cursor-pointer hover:underline hover:underline-offset-2"
            >
              Login
            </span>
          </p>
        </div>
      </form>
    </section>
  );
};

export default FormRegister;
