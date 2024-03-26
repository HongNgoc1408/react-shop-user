import React from "react";
import { Link } from "react-router-dom";

const register = () => {
  return (
    <section className="bg-primaryBG py-12 xl:px-28 px-4">
      <div className="max-w-[555px] h-auto bg-white m-auto mt-32 px-14 py-10 rounded-md">
        <h3 className="title">PERSONAL INFORMATION</h3>
        <div className="w-full flex flex-col">
          <input
            type="text"
            placeholder="Username"
            className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
          />
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

        <div className="w-full flex items-center">
          <input type="checkbox" className="w-4 h-4 mr-2" />
          <p className="text-sm">
            I want to receive Zara&apos;s newsletter via email
          </p>
        </div>

        <div className="w-full flex items-center">
          <input type="checkbox" className="w-4 h-4 mr-2" />
          <p className="text-sm">I accept Privacy statement</p>
        </div>

        <div className="w-full flex flex-col my-4">
          <button className="bg-dark-button">Create account</button>
        </div>
      </div>
    </section>
  );
};

export default register;
