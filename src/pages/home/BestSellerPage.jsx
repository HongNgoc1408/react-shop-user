import React from "react";
import Banner from "../../components/home/Banner";
import ProductBestSellers from "../../components/product/ProductBestSellers";

const BestSellerPage = () => {
  return (
    <>
      <Banner
        title="BestSellers"
        description="BESTSELLER is an international, family-owned fashion company with a
          strong foundation. We strive to bring people, fashion and technology
          together to achieve positive results for everyone."
        link="/bestSellers"
      />
      <ProductBestSellers />
    </>
  );
};

export default BestSellerPage;
