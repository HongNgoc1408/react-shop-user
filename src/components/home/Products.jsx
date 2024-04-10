import React, { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";
import Cards from "../product/Cards";
import { useQuery } from "@tanstack/react-query";
import * as ProductService from "../../services/ProductService";

const Products = () => {
  const [filteredItems, setFilteredItems] = useState([]);
  const [setSelectedCategory] = useState("all");
  const [setSortOption] = useState("default");

  const fetchProductAll = async () => {
    const res = await ProductService.getAllProduct();
    setFilteredItems(res.data);
    return res;
  };

  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProductAll,
    retry: 3,
    retryDelay: 100,
  });

  // Filter function
  const filterItems = (type) => {
    const filtered =
      type === "all"
        ? products.data // Lấy tất cả sản phẩm từ data
        : products.data.filter((item) => item.type === type);
    setFilteredItems(filtered);
    setSelectedCategory(type);
  };

  // Show all products
  const showAll = () => {
    setFilteredItems(products.data);
    setSelectedCategory("all");
  };
  // Sort function
  const handleSortChange = (option) => {
    setSortOption(option);
    if (filteredItems && filteredItems.length > 0) {
      let sortedItems = [...filteredItems];
      switch (option) {
        case "A-Z":
          sortedItems.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "Z-A":
          sortedItems.sort((a, b) => b.name.localeCompare(a.name));
          break;
        case "low-to-high":
          sortedItems.sort((a, b) => a.price - b.price);
          break;
        case "high-to-low":
          sortedItems.sort((a, b) => b.price - a.price);
          break;
        default:
          break;
      }
      setFilteredItems(sortedItems);
    }
  };

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-28 px-4 mb-12">
      <h2 className="title">Or subscribe to the newsletter</h2>

      {/* products card */}
      <div>
        <div className="flex flex-col md:flex-row flex-wrap md:justify-between items-center space-y-3 mb-8">
          {/* All */}
          <div className="flex flex-row justify-start md:items-center md:gap-8 gap-4 flex-wrap">
            <button onClick={() => showAll()}>All Products</button>
            <button onClick={() => filterItems("Dress")}>Dress</button>
            <button onClick={() => filterItems("Suit")}>Suit</button>
            <button onClick={() => filterItems("T-shirt")}>T-shirt </button>
          </div>

          {/* Sort option */}
          <div className="flex justify-end mb-4 rounded-sm">
            <div className="bg-black p-2">
              <FaFilter className="text-white h-4 w-4" />
            </div>

            <select
              id="sort"
              className="bg-black text-white px-2 py-1 rounded-sm"
              onChange={(e) => handleSortChange(e.target.value)}
            >
              <option value="default">Default</option>
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
              <option value="low-to-high">Low to High</option>
              <option value="high-to-low">High to Low</option>
            </select>
          </div>
        </div>

        {/* products card */}
        <div className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 items-center justify-center gap-12 shadow-sm">
          {/* {products?.data?.map((product) => { */}
          {filteredItems?.map((product) => {
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
    </div>
  );
};

export default Products;
