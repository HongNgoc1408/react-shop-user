import Cart from "../pages/cart/Cart";
import HomePage from "../pages/home/HomePage";
import ProductDetails from "../pages/product/ProductDetails";
import login from "../pages/auth/FormLogin";
import register from "../pages/auth/FormRegister";
import ProfilePage from "../pages/user/ProfilePage";
import NotFound from "../pages/NotFound/NotFound";
import WomenPage from "../pages/home/WomenPage";
import Checkout from "../pages/order/Checkout";
import BestSellerPage from "../pages/home/BestSellerPage";
import Order from "../pages/order/Order";

const routes = [
  {
    path: "/",
    name: "home",
    page: HomePage,
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
    path: "/women",
    name: "women",
    page: WomenPage,
  },
  {
    path: "/bestSellers",
    name: "bestSellers",
    page: BestSellerPage,
  },
  {
    path: "/profile",
    name: "profile",
    page: ProfilePage,
  },
  {
    path: "/product/:id",
    name: "detailsProduct",
    page: ProductDetails,
  },
  {
    path: "/cart",
    name: "cart",
    page: Cart,
  },
  {
    path: "/checkout",
    name: "checkout",
    page: Checkout,
  },
  {
    path: "/order",
    name: "order",
    page: Order,
  },
  {
    path: "*",
    name: "notFound",
    page: NotFound,
  },
];

export { routes };
