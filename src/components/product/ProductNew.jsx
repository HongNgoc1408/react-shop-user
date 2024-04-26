import React, { useEffect, useState } from "react";
import * as ProductService from "../../services/ProductService";
import Cards from "./Cards";

const ProductNew = () => {
  const [filteredNew, setFilteredNew] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await ProductService.getAllProduct();
        setProducts(res.data);
        setFilteredNew(res.data.filter((item) => item.status === "New"));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-28 px-4 mb-12">
      <div className="text-center">
        <h2 className="title">New</h2>
      </div>

      {/* best seller product */}

      <div className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 items-center justify-center gap-12 shadow-sm">
        {filteredNew?.map((product) => {
          return (
            <Cards
              key={product._id}
              id={product._id}
              countInStock={product.countInStock}
              description={product.description}
              image={product.image}
              name={product.name}
              price={product.price}
              type={product.type}
              discount={product.discount}
              rating={product.rating}
              seller={product.seller}
              status={product.status}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProductNew;
