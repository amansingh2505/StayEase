import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Toaster } from "react-hot-toast";
import App from "./App";
import { WishlistProvider } from "./context/WishlistContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
  <WishlistProvider>

    <Toaster
      position="top-right"
      reverseOrder={false}
    />

    <App />

  </WishlistProvider>
</React.StrictMode>
);