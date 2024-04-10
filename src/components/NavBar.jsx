import React, { useEffect, useState } from "react";
import { FaBars, FaSearch, FaTimes } from "react-icons/fa";
import logo from "/images/zara-logo-2019.png";
import { FaUser } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import * as UserService from "../services/UserService";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useSelector((state) => state.user);
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { title: "BESTSELLERS", path: "#" },
    { title: "WOMEN", path: "#" },
    { title: "MEN", path: "#" },
    { title: "CHILDREN", path: "#" },
    { title: "PERFUME", path: "#" },
    { title: "CONTACT US", path: "#" },
    { title: "CAREERS", path: "#" },
  ];

  const handleLogout = async () => {
    const res = await UserService.logoutUser();
    if (res.status === "OK") {
      localStorage.removeItem(
        "access_token",
        JSON.stringify(res?.access_token)
      );
      navigate("/");
    } else {
      alert("Error: " + res.message);
    }
  };

  useEffect(() => {
    setUserName(user?.name);
  }, [user?.name]);

  return (
    <header className="max-w-screen-2xl xl:px-28 px-4 absolute top-0 right-0 left-0">
      <nav className="flex justify-between items-center container md:py-4 pt-6 pb-3">
        <div className="text-lg text-Black sm:flex items-center gap-4 hidden">
          <div className="relative w-full items-center mx-auto max-w-screen-sm">
            <div className="relative group/bouton w-full py-2">
              <div className="flex items-center gap-2 hover:text-orange-500 cursor-pointer">
                <a
                  href="#"
                  className="text-Black w-5 h-5 cursor-pointer hidden md:block  hover:text-orange-500"
                >
                  <FaSearch />
                </a>
              </div>
              <div className="absolute bg-transparent top-full origine-top opacity-0 hidden flex-col group-hover/bouton:flex group-hover/bouton:opacity-100 transition-all">
                <div className="relative flex justify-between items-center w-full border-b border-stone-200 py-2 px-2">
                  <div className="flex items-center gap-3">
                    <input
                      className="border-2 border-orange-500 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                      type="search"
                      name="search"
                      placeholder="Search"
                    />
                    <button
                      type="submit"
                      className="absolute right-0 top-0 mt-5 mr-4"
                    >
                      <FaSearch className="text-orange-500 h-4 w-4 fill-current" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <a href="/">
          {/* {logo} */}
          <img src={logo} alt="" width={150} />
        </a>
        {/* {Login and cart btn} */}

        <div className="text-lg text-Black sm:flex items-center gap-4 hidden">
          {user?.access_token ? (
            <div className="relative w-full items-center mx-auto max-w-screen-sm">
              <div className="relative group/bouton w-full py-2">
                <div className="flex items-center gap-2 hover:text-orange-500 cursor-pointer text-nowrap">
                  <FaUser />
                  <span className="hover:border-b-2 hover:border-b-orange-500">
                    {userName || user?.email || "User"}
                  </span>
                </div>
                <div className="absolute bg-orange-500 top-full origine-top opacity-0 hidden flex-col group-hover/bouton:flex group-hover/bouton:opacity-100 transition-all">
                  <div className="relative flex justify-between items-center w-full border-b border-stone-200 py-2 px-2">
                    <div className="flex items-center gap-3">
                      <a
                        href="/profile"
                        className="block text-white text-base hover:border-b-2 hover:border-b-white"
                      >
                        Profile
                      </a>
                    </div>
                  </div>
                  <div className="relative flex justify-between items-center w-full border-b border-stone-200 py-2 px-2">
                    <div className="flex items-center gap-3">
                      <a
                        onClick={handleLogout}
                        href=""
                        className="block text-white text-base hover:border-b-2 hover:border-b-white"
                      >
                        Logout
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <a
              href="/login"
              className="flex items-center gap-2 hover:text-orange-500 cursor-pointer"
            >
              <FaUser />
              <span className="hover:border-b-2 hover:border-b-orange-500">
                Login
              </span>
            </a>
          )}

          <div className="relative w-full items-center mx-auto max-w-screen-sm">
            <div className="relative group/bouton w-full py-2">
              <div className="flex items-center gap-2 hover:text-orange-500 cursor-pointer">
                <a
                  href="/cart"
                  className="flex items-center gap-2  hover:text-orange-500"
                >
                  <FaCartShopping />
                  <span className="hover:border-b-2 hover:border-b-orange-500">
                    Cart
                  </span>
                </a>
              </div>
              <div className="absolute bg-orange-500 top-full origine-top opacity-0 hidden flex-col group-hover/bouton:flex group-hover/bouton:opacity-100 transition-all">
                <div className="relative flex justify-between items-center w-full border-b border-stone-200 py-2 px-2">
                  <div className="flex items-center gap-3">
                    <a
                      href=""
                      className="block text-white text-base hover:border-b-2 hover:border-b-white"
                    >
                      Orders
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
