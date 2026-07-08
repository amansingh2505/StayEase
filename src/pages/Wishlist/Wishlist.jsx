import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import HotelCard from "../../components/HotelCard/HotelCard";
import { fetchHotels } from "../../services/api";
import { useWishlist } from "../../context/WishlistContext";

function Wishlist() {
  const { wishlist } = useWishlist();

  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const loadHotels = async () => {
      const data = await fetchHotels();

      const favouriteHotels = data.filter((hotel) =>
        wishlist.includes(hotel.id)
      );

      setHotels(favouriteHotels);
    };

    loadHotels();
  }, [wishlist]);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-100">

        <section className="mx-auto max-w-7xl px-6 py-12">

          <h1 className="text-4xl font-bold text-slate-800">
            My Wishlist
          </h1>

          <p className="mt-2 text-slate-500">
            {hotels.length} favourite hotels
          </p>

          {hotels.length === 0 ? (
            <div className="mt-20 rounded-3xl bg-white py-20 text-center shadow">

              <h2 className="text-3xl font-semibold text-slate-700">
                No Favourite Hotels
              </h2>

              <p className="mt-3 text-slate-500">
                Click the ❤️ icon to save hotels.
              </p>

            </div>
          ) : (
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

              {hotels.map((hotel) => (
                <HotelCard
                  key={hotel.id}
                  hotel={hotel}
                />
              ))}

            </div>
          )}

        </section>

      </main>

      <Footer />
    </>
  );
}

export default Wishlist;