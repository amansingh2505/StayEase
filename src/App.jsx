import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import HotelDetails from "./pages/HotelDetails/HotelDetails";
import Wishlist from "./pages/Wishlist/Wishlist";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import Bookings from "./pages/Bookings/Bookings";
import Login from "./pages/Login/Login";

function App() {
  return (
    <BrowserRouter>

      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotel/:id" element={<HotelDetails />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/login" element={<Login />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;