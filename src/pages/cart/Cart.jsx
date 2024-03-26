import React from "react";
// import { Checkbox, Table } from "flowbite-react";
import { TbTrash } from "react-icons/tb";
const Cart = () => {
  return (
    <section className="bg-primaryBG py-12 xl:px-28 px-4">
      <div className="mt-40 flex flex-row">
        <div className="w-2/3  flex flex-col">
          <h1 className="title">Your Cart</h1>
          <div className=" relative overflow-x-auto shadow-xl sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xs text-white uppercase bg-Black">
                <tr>
                  <th scope="col" className="px-16 py-3">
                    <span className="sr-only">Image</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Quatity
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b hover:bg-gray-50">
                  <td className="p-4">
                    <img
                      src="/images/products/image1.png"
                      className="w-16 md:w-32 max-w-full max-h-full"
                      alt=""
                    />
                  </td>
                  <td className="px-6 py-4 font-semibold text-Black  cursor-pointer">
                    Sản phẩm 1
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div>
                        <input
                          type="number"
                          id="first_product"
                          className="bg-white w-14 border border-gray-100 text-Black text-sm rounded-md px-2.5 py-1"
                          placeholder="1"
                          required
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-Black">$599</td>
                  <td className="px-6 py-4">
                    <a
                      href="#"
                      className="font-medium text-orange-500 hover:underline"
                    >
                      Remove
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="w-1/3 flex flex-col">
          <h1 className="title">Information Cart</h1>
          <div className=" relative overflow-x-auto shadow-xl sm:rounded-lg mx-5">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xs text-white uppercase bg-Black">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Quatity
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold text-Black  cursor-pointer">
                    Sản phẩm 1
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div>
                        <input
                          type="number"
                          id="first_product"
                          className="bg-white w-14 border border-gray-100 text-Black text-sm rounded-md px-2.5 py-1"
                          placeholder="1"
                          required
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-Black">$599</td>
                </tr>
              </tbody>
            </table>
          </div>
          <a href="/checkout" className="bg-dark-button m-5 text-center">
            Checkout
          </a>
        </div>
      </div>
    </section>
  );
};

export default Cart;
