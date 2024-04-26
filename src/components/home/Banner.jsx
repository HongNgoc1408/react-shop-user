import React from "react";
import PropTypes from "prop-types";
import bannerImg from "/images/banner.png";
import { Link } from "react-router-dom";

const Banner = ({ title, description, link }) => {
  return (
    <div className="bg-primaryBG py-12 xl:px-28 px-4 pb-5">
      <div className="py-28 pb-5 flex flex-col md:flex-row-reverse justify-between items-center gap-14">
        {/* img */}
        <div className="md:w-1/3">
          <img src={bannerImg} alt="" className="w-96 mt-5" />
        </div>
        <div className="md:w-2/3">
          <h1 className="text-5xl font-light mb-5 uppercase">{title}</h1>
          <p className="text-xl mb-7">{description}</p>
          <button className="bg-dark-button">
            <Link to={link} className="relative z-10">
              Shop now
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

Banner.propTypes = {
  title: PropTypes.string.isRequired, // Validate title as a required string
  description: PropTypes.string.isRequired, // Validate description as a required string
  link: PropTypes.string.isRequired, // Validate link as a required string
};
export default Banner;
