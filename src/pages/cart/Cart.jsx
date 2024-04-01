import React from "react";
import YourCart from "../../components/cart/YourCart";
import Information from "../../components/cart/Information";
const Cart = () => {
  return (
    <div>
      <section className="bg-primaryBG py-12 xl:px-28 px-4">
        <div className="mt-40 flex flex-row">
          <YourCart />
          <Information />
        </div>
      </section>
    </div>
  );
};

export default Cart;
