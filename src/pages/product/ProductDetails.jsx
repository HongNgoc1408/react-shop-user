import React from "react";
import SingleProduct from "../../components/product/SingleProduct";
import { useNavigate, useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <>
      <SingleProduct idProduct={id} />
    </>
  );
};

export default ProductDetails;
