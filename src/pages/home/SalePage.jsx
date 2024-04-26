import React from "react";
import Banner from "../../components/home/Banner";
import ProductSale from "../../components/product/ProductSale";

const SalePage = () => {
  return (
    <>
      <Banner
        title="Sale"
        description="SALE is an international, family-owned fashion company with a
              strong foundation. We strive to bring people, fashion and technology
              together to achieve positive results for everyone."
        link="/sale"
      />
      <ProductSale />
    </>
  );
};

export default SalePage;
