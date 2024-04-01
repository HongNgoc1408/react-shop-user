import axios from "axios";
import React from "react";
import { routes } from "./router";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

function App() {
  const fetchApi = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/product/getAll`
      );
      return res.data;
    } catch (error) {
      console.error("Error fetching api:", error);
    }
  };

  const query = useQuery({ queryKey: ["todos"], queryFn: fetchApi });
  console.log("query", query);

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
