import React from "react";
import YourCart from "../../components/cart/YourCart";

const Cart = () => {
  return (
    <>
      <section className="bg-primaryBG py-12 xl:px-28 px-4">
        <div className="mt-28 flex flex-row">
          <YourCart />
        </div>
      </section>
    </>
  );
};

export default Cart;
