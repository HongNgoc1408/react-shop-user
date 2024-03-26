import React from "react";
import Banner from "./Banner";
import Category from "./Category";
import Products from "./Products";
import Collection from "./Collection";
import BestSellers from "./BestSellers";
import NewLetters from "./NewLetters";
const Home = () => {
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

export default Home;
