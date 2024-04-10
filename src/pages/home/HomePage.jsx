import React from "react";
import Banner from "../../components/home/Banner";
import Category from "../../components/home/Category";
import Products from "../../components/home/Products";
import Collection from "../../components/home/Collection";
import BestSellers from "../../components/home/BestSellers";
import NewLetters from "../../components/home/NewLetters";

const HomePage = () => {
 
  return (
    <div>
      <Banner />
      <Category />
      <Products />
      <Collection />
      <BestSellers />
      <NewLetters />
    </div>
  );
};

export default HomePage;
