import React, { useEffect, useState } from "react";
import { FaBars, FaSearch, FaTimes } from "react-icons/fa";
import logo from "/images/zara-logo-2019.png";
import { FaUser } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from "../services/UserService";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [userName, setUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [search, setSearch] = useState("");
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const order = useSelector((state) => state.order);
  const [loading, setLoading] = useState(false);

  console.log(user);

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
    setLoading(true);
    await UserService.logoutUser();
    dispatch(); //resetUser()
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    setUserName(user?.name);
    setUserAvatar(user?.avatar);
    setLoading(false);
  }, [user?.name, user?.avatar]);

  return (
    <header className="max-w-screen-2xl xl:px-28 px-4 absolute top-0 right-0 left-0">
      <nav className="flex justify-between items-center container md:py-4 pt-6 pb-3">
        <a
          href="#"
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
          {user?.access_token ? (
            <div>
              <div className="flex items-center gap-2 hover:text-orange-500 cursor-pointer">
                <FaUser />
                <span className="hover:border-b-2 hover:border-b-orange-500">
                  {user.name}
                </span>
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
