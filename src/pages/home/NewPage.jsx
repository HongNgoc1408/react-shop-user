import React from "react";
import Banner from "../../components/home/Banner";
import ProductNew from "../../components/product/ProductNew";

const NewPage = () => {
  return (
    <>
      <Banner
        title="New"
        description="NEW is an international, family-owned fashion company with a
          strong foundation. We strive to bring people, fashion and technology
          together to achieve positive results for everyone."
        link="/new"
      />
      <ProductNew />
    </>
  );
};

export default NewPage;
