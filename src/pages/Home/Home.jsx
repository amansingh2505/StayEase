import { useEffect, useMemo, useState } from "react";
import { fetchHotels } from "../../services/api";

import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import FilterBar from "../../components/FilterBar/FilterBar";
import HotelCard from "../../components/HotelCard/HotelCard";
import Loader from "../../components/Loader/Loader";
import Footer from "../../components/Footer/Footer";

function Home() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    const loadHotels = async () => {
      const data = await fetchHotels();
      setHotels(data);
      setLoading(false);
    };

    loadHotels();
  }, []);

  const locations = useMemo(() => {
    return [...new Set(hotels.map((hotel) => hotel.location))].sort();
  }, [hotels]);

  const filteredHotels = useMemo(() => {
    let filtered = hotels.filter((hotel) => {
      const matchesSearch =
        hotel.name.toLowerCase().includes(search.toLowerCase()) ||
        hotel.location.toLowerCase().includes(search.toLowerCase());

      const matchesLocation =
        !selectedLocation || hotel.location === selectedLocation;

      const matchesRating =
        !selectedRating || hotel.rating >= Number(selectedRating);

      return matchesSearch && matchesLocation && matchesRating;
    });

    if (sortBy === "low-high") {
      filtered.sort((a, b) => Number(a.price) - Number(b.price));
    }

    if (sortBy === "high-low") {
      filtered.sort((a, b) => Number(b.price) - Number(a.price));
    }

    if (sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    return filtered;
  }, [
    hotels,
    search,
    selectedLocation,
    selectedRating,
    sortBy,
  ]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />

      <main className="bg-slate-100">

        <section className="mx-auto max-w-7xl px-6 pt-8">
          <Hero
            search={search}
            setSearch={setSearch}
          />
        </section>

        <section
          id="hotels"
          className="mx-auto max-w-7xl px-6 py-14"
        >
          <div className="mb-8">
            <FilterBar
              locations={locations}
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
              selectedRating={selectedRating}
              setSelectedRating={setSelectedRating}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
          </div>

          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-500">
                Explore
              </p>

              <h2 className="mt-2 text-4xl font-bold text-slate-800">
                Popular Hotels
              </h2>

              <p className="mt-3 text-slate-500">
                Discover premium stays across India with top ratings,
                luxury amenities and unforgettable experiences.
              </p>
            </div>

            <div className="rounded-2xl bg-white px-6 py-4 shadow">
              <p className="text-sm text-slate-500">
                Hotels Found
              </p>

              <h3 className="text-3xl font-bold text-slate-800">
                {filteredHotels.length}
              </h3>
            </div>

          </div>

          {filteredHotels.length === 0 ? (
            <div className="rounded-3xl bg-white py-20 text-center shadow">

              <h2 className="text-3xl font-semibold text-slate-700">
                No Hotels Found
              </h2>

              <p className="mt-4 text-slate-500">
                Try searching another city or changing your filters.
              </p>

            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredHotels.map((hotel) => (
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

export default Home;