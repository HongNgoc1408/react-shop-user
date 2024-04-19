import React, { useEffect, useState } from "react";
import { FaBars, FaSearch, FaTimes } from "react-icons/fa";
import logo from "/images/zara-logo-2019.png";
import { FaUser } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from "../services/UserService";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useSelector((state) => state.user);
  const order = useSelector((state) => state.order);
  const [userName, setUserName] = useState("");
  const [avatar, setAvatar] = useState("");
  // const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { title: "BESTSELLERS", path: "/bestSellers" },
    { title: "WOMEN", path: "/women" },
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
      window.location.reload();
    } else {
      alert("Error: " + res.message);
    }
  };

  useEffect(() => {
    setUserName(user?.name);
    setAvatar(user?.avatar);
  }, [user?.name, user?.avatar]);

  // const onSearch = (e) => {
  //   setSearch(e.target.value);
  //   dispatch(searchProduct(e.target.value));
  // };

  return (
    <header className="max-w-screen-2xl xl:px-28 px-4 absolute top-0 right-0 left-0">
      <nav className="flex justify-between items-center container md:py-4 pt-6 pb-3">
        <div className="text-lg text-Black sm:flex items-center gap-4 hidden">
          <div className="relative w-full items-center mx-auto max-w-screen-sm">
            <div className="relative group/bouton w-full py-2">
              <div className="flex items-center gap-2 hover:text-orange-500 cursor-pointer">
                <span className="text-Black w-5 h-5 cursor-pointer hidden md:block  hover:text-orange-500">
                  <FaSearch />
                </span>
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

        <Link
          to={"/"}
          // href="/"
        >
          {/* {logo} */}
          <img src={logo} alt="" width={150} />
        </Link>
        {/* {Login and cart btn} */}

        <div className="text-lg text-Black sm:flex items-center gap-4 hidden">
          {user?.access_token ? (
            <div className="relative w-full items-center mx-auto max-w-screen-sm">
              <div className="relative group/bouton w-full py-2">
                <div className="flex items-center gap-2 hover:text-orange-500 cursor-pointer text-nowrap">
                  {/* <FaUser /> */}
                  <button className="realtive z-10 w-10 h-10 rounded-full overflow-hidden border-4 border-gray-400 hover:border-gray-300 focus:border-gray-300 focus:outline-none">
                    <img src={avatar} alt="Avatar" />
                  </button>
                </div>
                <div className="absolute bg-orange-500 top-full origine-top opacity-0 hidden flex-col group-hover/bouton:flex group-hover/bouton:opacity-100 transition-all">
                  <div className="relative flex justify-between items-center w-full border-b border-stone-200 py-2 px-2">
                    <div className="flex items-center gap-3">
                      <Link
                        to={"/profile"}
                        // href="/profile"
                        className="block text-white text-sm hover:border-b-2 hover:border-b-white text-nowrap"
                      >
                        <span className="text-sm hover:border-b-2 hover:border-b-orange-500">
                          {userName || user?.email}
                        </span>
                      </Link>
                    </div>
                  </div>
                  <div className="relative flex justify-between items-center w-full border-b border-stone-200 py-2 px-2">
                    <div className="flex items-center gap-3">
                      <Link
                        onClick={handleLogout}
                        className="block text-white text-sm hover:border-b-2 hover:border-b-white"
                      >
                        Logout
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Link
              to={"/login"}
              // href="/login"
              className="flex items-center gap-2 hover:text-orange-500 cursor-pointer"
            >
              <FaUser />
              <span className="hover:border-b-2 hover:border-b-orange-500">
                Login
              </span>
            </Link>
          )}

          <div className="relative w-full items-center mx-auto max-w-screen-sm">
            <div className="relative group/bouton w-full py-2">
              <div className="flex items-center gap-2 hover:text-orange-500 cursor-pointer">
                <Link
                  to={"/cart"}
                  // href="/cart"
                  className="flex items-center gap-2  hover:text-orange-500"
                >
                  <div className="relative scale-75">
                    <FaCartShopping className="size-8" />
                    <span className="absolute -top-3 left-4 rounded-full bg-red-500 p-0.5 px-2 text-sm text-red-50">
                      {order?.orderItems?.length}
                    </span>
                  </div>

                  {/* <span className="hover:border-b-2 hover:border-b-orange-500">
                    Cart
                  </span> */}
                </Link>
              </div>
              <div className="absolute bg-orange-500 top-full origine-top opacity-0 hidden flex-col group-hover/bouton:flex group-hover/bouton:opacity-100 transition-all">
                <div className="relative flex justify-between items-center w-full border-b border-stone-200 py-2 px-2">
                  <div className="flex items-center gap-3">
                    <Link
                      to={"/order"}
                      state={{ id: user?.id, token: user?.access_token }}
                      className="block text-white text-base hover:border-b-2 hover:border-b-white"
                    >
                      Orders
                    </Link>
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
        <ul className="lg:flex items-center font-serif justify-between text-Black hidden">
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
          className={`bg-Black text-white font-serif px-4 py-2 rounded ${isMenuOpen ? "" : "hidden"}`}
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
