import React from "react";
import Banner from "../../components/home/Banner";
import Category from "../../components/home/Category";
import Products from "../../components/home/Products";
import Collection from "../../components/home/Collection";
import BestSellers from "../../components/home/BestSellers";
import NewLetters from "../../components/home/NewLetters";

const HomePage = () => {
  return (
    <>
      <Banner
        title="WOMEN"
        description=" You can explore ans shop many differnt collection from various
        barands here."
        link="/women"
      />
      <Category />
      <Products />
      <Collection />
      <BestSellers />
      <NewLetters />
    </>
  );
};

export default HomePage;
