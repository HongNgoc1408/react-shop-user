/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";

const Cards = () => {
  return (
    <div className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 items-center justify-center gap-12 shadow-sm">
      <div>
        <Link to="/">
          <img
            src=""
            alt=""
            className="mx-auto w-full h-[375px] hover:scale-105 transition-all duration-300"
          />
        </Link>

        <div className="mt-4 px-4">
          <h4 className="text-base font-semibold mb-2"></h4>
          <div className="flex justify-between">
            <p className="text-black/50"></p>
            <p className="font-semibold"></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
