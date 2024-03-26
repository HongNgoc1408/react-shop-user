import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <section className="bg-primaryBG py-12 xl:px-28 px-4">
      <div className="max-w-[555px] h-auto bg-white m-auto mt-32 px-14 py-10 rounded-md">
        <h3 className="title">ACCESS YOUR ACCOUNT</h3>
        <div className="w-full flex flex-col">
          <input
            type="email"
            placeholder="Email Address"
            className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
          />
        </div>

        <div className="w-full flex items-center justify-between">
          <div className="w-full flex items-center">
            <input type="checkbox" className="w-4 h-4 mr-2" />
            <p className="text-sm">Remember me</p>
          </div>
          <p className="text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2">
            Forgot Password ?
          </p>
        </div>

        <div className="w-full flex flex-col my-4">
          <button className="bg-dark-button">
            Login
          </button>
        </div>

        <div className="w-full flex items-center justify-center relative py-2">
          <div className="w-full h-[1px] bg-black"></div>
        </div>
        <div className="w-full flex items-center justify-center">
          <p className="text-sm font-normal text-[#060606]">
            Dont have a account ?
            <a
              href="/register"
              className="text-secondary underline cursor-pointer font-bold"
            >
              Register
            </a>
            {/* <Link
              to="register"
              className="text-secondary underline cursor-pointer font-bold"
            >
              Register
            </Link> */}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
