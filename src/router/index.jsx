import Cart from "../pages/cart/Cart";
import HomePage from "../pages/home/HomePage";
import ProductDetails from "../pages/product/ProductDetails";
import login from "../pages/auth/FormLogin";
import register from "../pages/auth/FormRegister";
import ProfilePage from "../pages/user/ProfilePage";
import NotFound from "../pages/NotFound/NotFound";

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
    path: "/profile",
    name: "profile",
    page: ProfilePage,
  },
  {
    path: "/cart",
    name: "cart",
    page: Cart,
  },
  {
    path: "/product/:id",
    name: "detailsProduct",
    page: ProductDetails,
  },
  {
    path: "*",
    name: "notFound",
    page: NotFound,
  },
];

export { routes };
