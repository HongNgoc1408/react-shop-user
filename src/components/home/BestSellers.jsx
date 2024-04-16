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
import Cards from "../product/Cards";

const BestSellers = () => {
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
    <div className="max-w-screen-2xl container mx-auto xl:px-28px px-4">
      <div className="text-center">
        <h2 className="title">Best sellers</h2>
        <p className="text-Black/75 capitalize md:w-2/3 mx-auto mb-8">
          BESTSELLER is an international, family-owned fashion company with a
          strong foundation. We strive to bring people, fashion and technology
          together to achieve positive results for everyone.
        </p>
      </div>

      {/* best seller product */}

      <div className="mb-16">
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          // centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 50,
            },
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {filteredBestSellers?.map((product) => {
            return (
              <SwiperSlide key={product._id}>
                <div className="pb-10">
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
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default BestSellers;
