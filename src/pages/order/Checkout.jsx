import React from "react";
import FormCheckout from "../../components/order/FormCheckout";

const Checkout = () => {
  return (
    <>
      <section className="bg-primaryBG py-12 xl:px-28 px-4">
        <div className="mt-28 flex flex-row">
          <FormCheckout />
        </div>
      </section>
    </>
  );
};

export default Checkout;
