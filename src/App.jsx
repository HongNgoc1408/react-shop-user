import axios from "axios";
import React, { useEffect } from "react";
import { routes } from "./router";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import * as UserService from "./services/UserService";
import { updateUser } from "./redux/slides/useSlides";
import { isJsonString } from "./utils";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    let storageData = localStorage.getItem("access_token");

    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData);
      const decoded = jwtDecode(storageData);
      // console.log("decodedApp", decoded);
      if (decoded?.id) {
        handleGetUser(decoded?.id, storageData);
      }
    }
  });

  const handleGetUser = async (id, token) => {
    const res = await UserService.getUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
    // console.log("res", res);
  };

  axios.interceptors.request.use(
    async (config) => {
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  // useEffect(() => {
  //   const { storageData, decoded } = handleDecode();
  //   if (decoded?.id) {
  //     handleGetUser(decoded?.id, storageData);
  //   }
  // }, []);

  // const handleDecode = async () => {
  //   let storageData = localStorage.getItem("access_token");
  //   let decoded = {};
  //   if (storageData && isJsonString(storageData)) {
  //     storageData = JSON.parse(storageData);
  //     // console.log("storageData", storageData);
  //     decoded = jwtDecode(storageData);
  //     // console.log("decoded", decoded);
  //   }
  //   return { decoded, storageData };
  // };

  // UserService.axiosJWT.interceptors.request.use(
  //   async (config) => {
  //     // const currentTime = new Date();
  //     const currentTime = Math.floor(Date.now() / 1000);
  //     // console.log("currentTime", currentTime);
  //     const { decoded } = await handleDecode();
  //     // console.log("decoded", decoded);

  //     if (decoded?.exp < currentTime) {
  //       const data = await UserService.refreshToken();
  //       console.log("data", data);
  //       config.headers["token"] = `Bearer ${data?.access_token}`;
  //     }
  //     return config;
  //   },
  //   (err) => {
  //     Promise.reject(err);
  //   }
  // );

  return (
    <div>
      <Router>
        <NavBar />
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.page />}
            />
          ))}
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
