import React from "react";
import bannerImg from "/images/banner.png";

const Banner = () => {
  return (
    <div className="bg-primaryBG py-12 xl:px-28 px-4">
      <div className="py-28 flex flex-col md:flex-row-reverse justify-between items-center gap-14">
        {/* img */}
        <div className="md:w-1/2">
          <img src={bannerImg} alt="" />
        </div>
        <div className="md:w-1/2">
          <h1 className="text-5xl font-light mb-5">WOMEN</h1>
          <p className="text-xl mb-7">
            You can explore ans shop many differnt collection from various
            barands here.
          </p>
          <button className="bg-dark-button">Shop now</button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
