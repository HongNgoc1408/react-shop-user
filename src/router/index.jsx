import Cart from "../pages/cart/Cart";
import HomePage from "../pages/home/HomePage";
import ProductDetails from "../pages/product/ProductDetails";
import login from "../pages/auth/FormLogin";
import register from "../pages/auth/FormRegister";

const routes = [
  {
    path: "/",
    name: "home",
    page: HomePage, 
  },
  {
    path: "/shop/:id",
    name: "detailsProduct",
    page: ProductDetails,
  },
  {
    path: "/login",
    name: "login",
    page: login,
  },
  {
    path: "/register",
    name: "register",
    page: register,
  },
  {
    path: "/cart",
    name: "cart",
    page: Cart,
  },
];

export { routes };
