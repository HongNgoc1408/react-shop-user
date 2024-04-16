import React, { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import * as ProductService from "../../services/ProductService";
import Cards from "./Cards";

const ProductBestSellers = () => {
  const [filteredBestSellers, setFilteredBestSellers] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await ProductService.getAllProduct();
        setProducts(res.data);
        setFilteredBestSellers(
          res.data.filter((item) => item.status === "Best Sellers")
        );
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-28 px-4 mb-12">
      <div className="text-center">
        <h2 className="title">Best sellers</h2>
      </div>

      {/* best seller product */}

      <div className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 items-center justify-center gap-12 shadow-sm">
        {filteredBestSellers?.map((product) => {
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
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProductBestSellers;
