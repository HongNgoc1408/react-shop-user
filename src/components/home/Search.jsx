import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import * as ProductService from "../../services/ProductService";
import Cards from "../product/Cards";

const Search = () => {
  const [filteredItems, setFilteredItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await ProductService.getAllProduct();
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Lọc sản phẩm dựa trên searchQuery
    const filteredProducts = products.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredItems(filteredProducts);
  }, [searchQuery, products]);

  return (
    <div className="bg-primaryBG py-12 xl:px-28 px-4 pb-5">
      <form className="mt-36 mb-12 xl:px-72">
        <h2 className="title">Search Product</h2>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
        >
          Search
        </label>
        <div className="relative">
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            type="search"
            id="default-search"
            className="p-3 pl-10 w-full text-sm rounded-lg border-2 border-orange-500 focus:border-orange-500 outline-none"
            placeholder="Search Product"
            required
          />
          <button
            type="submit"
            className="text-white absolute right-2.5 bottom-1.5 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2 bg-light-button bg-Black"
          >
            <span className="relative z-10">Search</span>
          </button>
        </div>
      </form>
      {filteredItems.length > 0 ? (
        <div className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 items-center justify-center gap-12 shadow-sm">
          {filteredItems.map((product) => (
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
          ))}
        </div>
      ) : (
        <p>Không có sản phẩm cần tìm</p>
      )}
    </div>
  );
};

export default Search;
