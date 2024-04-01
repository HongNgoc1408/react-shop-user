import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

/* </QueryClientProvider>/ ReactDOM.createRoot(document.getElementById("root")).render(); */
const root = ReactDOM.createRoot(document.getElementById("root"));
// Create a client
const queryClient = new QueryClient();
root.render(
  <QueryClientProvider client={queryClient}>
    <App />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
