import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";

const BestSellers = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const bestSellers = products.filter((item) => item.status === "Best Selers");
  // console.log(bestSellers);

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
          {bestSellers.map((products) => (
            <SwiperSlide key={products.id}>
              <Link to={`/shop/${products.id}`}>
                <img
                  src={products.image}
                  alt=""
                  className="mx-auto w-full h-[375px] hover:scale-105 transition-all duration-300"
                />
              </Link>
              <div className="mt-4 px-4">
                <h4 className="text-base font-semibold mb-2">
                  {products.title}
                </h4>
                <div className="flex justify-between">
                  <p className="text-black/50">{products.category}</p>
                  <p className="font-semibold">{products.price}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default BestSellers;
