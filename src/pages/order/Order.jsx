import React from "react";
import AccordionOrder from "../../components/order/AccordionOrder";

const Order = () => {
  return (
    <>
      <section className="bg-primaryBG py-12 xl:px-28 px-4">
        <div className="mt-28 flex flex-col">
          <AccordionOrder />
        </div>
      </section>
    </>
  );
};

export default Order;
