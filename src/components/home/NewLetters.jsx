import React from "react";
import { Link } from "react-router-dom";

const NewLetters = () => {
  return (
    <div className="bg-[#1E2832] bg-opacity-5 xl:px-28 px-4 py-16">
      <h2 className="title mb-8">Follow products and discounts on Instagram</h2>
      {/* insta grid*/}
      <div className="flex gap-4 items-center justify-center mb-20">
        <Link to="/">
          <img src="/images/instagram/img1.jpg" alt="" />
        </Link>
        <Link to="/">
          <img src="/images/instagram/img2.jpg" alt="" />
        </Link>
        <Link to="/">
          <img src="/images/instagram/img3.jpg" alt="" />
        </Link>
        <Link to="/">
          <img src="/images/instagram/img4.jpg" alt="" />
        </Link>
        <Link to="/">
          <img src="/images/instagram/img5.jpg" alt="" />
        </Link>
        <Link to="/">
          <img src="/images/instagram/img6.jpg" alt="" />
        </Link>
      </div>

      {/* newsletters */}
      <div>
        <h2 className="title">Or subscribe to the newsletter</h2>
        <form className="md:w-1/2 mx-auto text-center flex">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email address..."
            className="h-8 bg-transparent outline-none border-b-2 pl-2 border-black 
            md:w-2/3 w-full mb-5 placeholder:text-black/50 mr-4"
          />
          <button
            type="submit"
            value={"Submit"}
            className="bg-black text-white bg-dark-button rounded-none mb-10"
          >
            <span className=" relative z-10">Submit</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewLetters;
