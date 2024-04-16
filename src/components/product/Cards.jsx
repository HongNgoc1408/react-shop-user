/* eslint-disable react/prop-types */
import React from "react";
import { FaEye } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

const Cards = (props) => {
  const { countInStock, description, image, name, price, type, id } = props;
  
  if (countInStock === 0) {
    return null;
  }

  return (
    <>
      <div className="flex flex-col shadow-md cursor-pointer hover:-translate-y-1 duration-300">
        <div>
          <Link to={`/product/${id}`}>
            <img
              src={image}
              alt=""
              className="mx-auto w-full h-[375px] hover:scale-105 transition-all duration-300"
            />
          </Link>

          <div className="mt-4 px-4">
            <h4 className="text-lg font-serif font-bold mb-1 hover:text-orange-500">
              {name}
            </h4>
            <div className="flex justify-between mb-1">
              <p className="text-black/50">{type}</p>
              <p className="font-semibold hover:text-orange-500">${price}</p>
            </div>
            <div className="flex justify-between mb-1">
              <p className="text-black/50 text-sm truncate">{description}</p>
            </div>
            <div className="flex justify-between mb-1">
              <p className="text-black/50 text-sm">CountInStock</p>
              <p className="text-black/50 text-sm">{countInStock}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-row flex-auto justify-end">
          <Link
            to={`/product/${id}`}
            className="flex text-xs border px-3 my-auto py-2 bg-dark-button group rounded-sm transition-all duration-200"
          >
            <FaEye className="size-4 relative z-10" />
            <div className="text-xs font-semibold ml-2 group delay-100 relative z-10">
              Live Preview
            </div>
          </Link>
          {/* <Link className="flex text-xs border px-3 my-auto py-2 mr-2 bg-dark-button group rounded-sm transition-all duration-200">
          <FaCartShopping className="size-4 relative z-10" />
        </Link> */}
        </div>
      </div>
    </>
  );
};

export default Cards;
