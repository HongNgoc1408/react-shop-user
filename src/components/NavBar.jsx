import React, { useState } from "react";
import { FaBars, FaSearch, FaTimes } from "react-icons/fa";
import logo from "/images/zara-logo-2019.png";
import { FaUser } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const navItems = [
    { title: "BESTSELLERS", path: "/bestsellers" },
    { title: "WOMEN", path: "/woman" },
    { title: "MEN", path: "/men" },
    { title: "CHILDREN", path: "/children" },
    { title: "PERFUME", path: "/perfume" },
    { title: "CONTACT US", path: "/contact" },
    { title: "CAREERS", path: "/careers" },
  ];
  return (
    <header className="max-w-screen-2xl xl:px-28 px-4 absolute top-0 right-0 left-0">
      <nav className="flex justify-between items-center container md:py-4 pt-6 pb-3">
        <a
          href="/search"
          className="text-Black w-5 h-5 cursor-pointer hidden md:block  hover:text-orange-500"
        >
          <FaSearch />
        </a>

        <a href="/">
          {/* {logo} */}
          <img src={logo} alt="" width={150} />
        </a>
        {/* {Login and cart btn} */}
        <div className="text-lg text-Black sm:flex items-center gap-4 hidden">
          <a
            href="/login"
            className="flex items-center gap-2 hover:text-orange-500"
          >
            <FaUser />
            <span className="hover:border-b-2 hover:border-b-orange-500">
              Login
            </span>
          </a>
          <a
            href="/cart"
            className="flex items-center gap-2  hover:text-orange-500"
          >
            <FaCartShopping />{" "}
            <span className="hover:border-b-2 hover:border-b-orange-500">
              Cart
            </span>
          </a>
        </div>

        {/* {navbar sm devices} */}

        <div className="sm:hidden">
          <button onClick={toggleMenu}>
            {isMenuOpen ? (
              <FaTimes />
            ) : (
              <FaBars className="w-5 h-5 text-Black" />
            )}
          </button>
        </div>
      </nav>

      <hr />

      {/* {Category items} */}
      <div className="py-4">
        <ul className="lg:flex items-center  justify-between text-Black hidden">
          {navItems.map(({ title, path }) => (
            <li
              key={title}
              className="hover:text-orange-500 hover:border-b-2 hover:border-b-orange-500"
            >
              <Link to={path}>{title}</Link>
            </li>
          ))}
        </ul>
      </div>
      {/* only moblie more items */}
      <div>
        <ul
          className={`bg-Black text-white px-4 py-2 rounded ${isMenuOpen ? "" : "hidden"}`}
        >
          {navItems.map(({ title, path }) => (
            <li
              key={title}
              className="hover:text-orange-500 my-3 cursor-pointer"
            >
              <Link to={path}>{title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default NavBar;
