import React, { useState, useEffect } from "react";
import { FaSortDown, FaSortUp, FaStar } from "react-icons/fa";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as ProductService from "../../services/ProductService";
import { addOrderProduct } from "../../redux/slides/orderSlide";

const SingleProduct = () => {
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  const order = useSelector((state) => state.order);
  const navigate = useNavigate();
  const location = useLocation();
  const [product, setProduct] = useState({});
  const [numProduct, setNumProduct] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const product = await ProductService.getDetailsProduct(id);
        const data = product?.data;
        setProduct(data);
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    };
    fetchData();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  const handleChangeCount = (type) => {
    if (type === "increase") {
      setNumProduct(numProduct + 1);
    } else {
      if (numProduct > 1) {
        setNumProduct(numProduct - 1);
      }
    }
  };

  const { name, type, price, image, status, countInStock, description } =
    product;

  const handleAddOrderProduct = () => {
    if (!user?.id) {
      navigate("/login", { state: location?.pathname });
    } else {
      dispatch(
        addOrderProduct({
          orderItem: {
            name: product?.name,
            amount: numProduct,
            image: product?.image,
            price: product?.price,
            product: product?._id,
            countInStock: product?.countInStock,
          },
        })
      );
    }
  };

  return (
    <div className="mt-28 max-w-screen-2xl container mx-auto xl-px-28 px-4">
      <div className="p-3 max-w-7xl m-auto">
        <div className="mt-16">
          <Link to="/" className="text-gray-600">
            Home
          </Link>
          <Link to="/women" className="font-bold text-black">
            / Women
          </Link>
        </div>
        {product ? (
          <div className="mt-2 sm:mt-10">
            <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 gap-6 h-max">
              <div className="w-8/12 mx-auto">
                <img src={image} alt="" className="" />
              </div>

              {/* product detail */}
              <div className="w-10/12 mx-auto">
                <h1 className="title text-left text-nowrap">{name}</h1>

                <p className="mt-3 text-gray-600 text-base leading-6 text-justify sm:text-left sm:mt-4">
                  {description}
                </p>
                <span className="my-2 text-xl text-yellow-500 flex items-center gap-1 sm:my-4">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </span>
                <p className="text-xl text-red-500 font-semibold sm:text-2xl">
                  {price}
                </p>

                <div className="mt-4">
                  <div className="text-left flex flex-col gap-2 w-full">
                    <label className="font-semibold">Quantity</label>
                    <div className="flex flex-wrap">
                      <div className="flex w-8/12">
                        <input
                          type="text"
                          name="numProduct"
                          defaultValue={1}
                          max={product?.countInStock}
                          min={1}
                          value={numProduct}
                          onChange={(e) =>
                            setNumProduct(Number(e.target.value))
                          }
                          required
                          id="numProduct"
                          className="bg-white text-lg text-gray-900 text-center focus:outline-none border border-gray-800 focus:border-gray-600 rounded-l-md w-full"
                        />
                      </div>
                      <div className="flex flex-col w-4/12">
                        <button
                          onClick={() =>
                            handleChangeCount(
                              "increase",
                              numProduct === product?.countInStock
                            )
                          }
                          className="text-white rounded-tr-md px-1 bg-gray-800 focus:bg-orange-500 focus:outline-none border border-gray-800 focus:border-orange-500"
                        >
                          <FaSortUp className="text-center mx-auto size-5" />
                        </button>
                        <button
                          onClick={() =>
                            handleChangeCount("decrease", numProduct === 1)
                          }
                          className="text-white rounded-br-md px-1 bg-gray-800 focus:bg-orange-500 focus:outline-none border border-gray-800 focus:border-orange-500"
                        >
                          <FaSortDown className="text-center mx-auto size-5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="w-full text-left my-4">
                    <button
                      onClick={() => handleAddOrderProduct()}
                      className="bg-dark-button flex justify-center items-center gap-2 w-full py-3 px-4 font-bold rounded-md lg:m-0 md:px-6"
                    >
                      <span className="relative z-10">Add to cart</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>Loading ...</div>
        )}
        <div className="text-black/75 mt-12">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
            excepturi in molestias deserunt inventore illum aut expedita, amet
            voluptatem impedit, eius quos ratione culpa doloribus, sequi minus
            consequuntur neque beatae!
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
