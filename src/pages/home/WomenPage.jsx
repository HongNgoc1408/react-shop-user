import React from "react";
import Products from "../../components/home/Products";
import Banner from "../../components/home/Banner";

const WomenPage = () => {
  return (
    <>
      <Banner
        title="WOMEN"
        description=" You can explore ans shop many differnt collection from various
        barands here."
        link="/women"
      />
      <Products />
    </>
  );
};

export default WomenPage;
