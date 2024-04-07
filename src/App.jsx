import React, { useEffect } from "react";
import { routes } from "./router";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { getUser } from "./services/UserService";
import { updateUser } from "./redux/slides/useSlides";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      let storageData = localStorage.getItem("access_token");
      if (storageData && JSON.parse(storageData)) {
        storageData = JSON.parse(storageData);
        const decoded = jwtDecode(storageData);
        if (decoded?.id) {
          try {
            const data = await getUser(decoded.id, storageData);
            dispatch(updateUser({ ...data?.data, access_token: storageData }));
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        }
      }
    };

    fetchData();
  }, [dispatch]);

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
