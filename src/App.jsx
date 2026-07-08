import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import HotelDetails from "./pages/HotelDetails/HotelDetails";
import Wishlist from "./pages/Wishlist/Wishlist";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotel/:id" element={<HotelDetails />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;