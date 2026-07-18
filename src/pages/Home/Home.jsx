import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { fetchHotels } from "../../services/api";

import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import FilterBar from "../../components/FilterBar/FilterBar";
import HotelCard from "../../components/HotelCard/HotelCard";
import Loader from "../../components/Loader/Loader";
import HotelSkeleton from "../../components/Loader/HotelSkeleton";
import Footer from "../../components/Footer/Footer";

function Home() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    const loadHotels = async () => {
      const data = await fetchHotels();

      // Small delay so the skeleton is visible
      setTimeout(() => {
        setHotels(data);
        setLoading(false);
      }, 1200);
    };

    loadHotels();
  }, []);

  useEffect(() => {
    const trimmedSearch = search.trim();
    
    const hasResults = hotels.some(
      (hotel) =>
        hotel.name.toLowerCase().includes(trimmedSearch.toLowerCase()) ||
        hotel.location.toLowerCase().includes(trimmedSearch.toLowerCase())
    );
    
    if (!trimmedSearch || !hasResults) return;

    const timeout = setTimeout(() => {
      const recentSearches =
        JSON.parse(localStorage.getItem("recentSearches")) || [];

      const updatedSearches = [
        trimmedSearch,
        ...recentSearches.filter(
          (item) =>
            item.toLowerCase() !== trimmedSearch.toLowerCase()
        ),
      ].slice(0, 5);

      localStorage.setItem(
        "recentSearches",
        JSON.stringify(updatedSearches)
      );
      
      setRecentSearches(updatedSearches);
    }, 500);

    return () => clearTimeout(timeout);
  }, [search, hotels]);

  useEffect(() => {
    const searches =
      JSON.parse(localStorage.getItem("recentSearches")) || [];

    setRecentSearches(searches);
  }, []);

  const clearRecentSearches = () => {
    localStorage.removeItem("recentSearches");
    setRecentSearches([]);
  };

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
    return (
      <>
        <Navbar />
        <HotelSkeleton />
      </>
    );
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
          
          {recentSearches.length > 0 && (
            <div className="mt-6 rounded-2xl bg-white p-5 shadow">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-semibold text-slate-700">
                  Recent Searches
                </h3>

                <button
                  onClick={clearRecentSearches}
                  className="text-sm font-medium text-red-500 hover:text-red-600"
                >
                  Clear History
                </button>
              </div>

              <div className="flex flex-wrap gap-3">
                {recentSearches.map((item) => (
                  <button
                    key={item}
                    onClick={() => setSearch(item)}
                    className="rounded-full bg-slate-100 px-4 py-2 text-sm transition hover:bg-orange-100 hover:text-orange-600"
                  >
                    🔍 {item}
                  </button>
                ))}
              </div>
            </div>
          )}
        </section>

        <section
          id="hotels"
          className="mx-auto max-w-7xl px-6 py-14"
        >

          <FilterBar
            locations={locations}
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
            selectedRating={selectedRating}
            setSelectedRating={setSelectedRating}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />

          <div className="mb-10 mt-10 flex items-end justify-between">

            <div>

              <p className="font-medium uppercase tracking-widest text-orange-500">
                Explore
              </p>

              <h2 className="mt-2 text-4xl font-bold text-slate-800">
                Popular Hotels
              </h2>

              <p className="mt-2 text-slate-500">
                Showing {filteredHotels.length} premium hotels
              </p>

            </div>

          </div>

          {filteredHotels.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-3xl bg-white py-20 text-center shadow"
            >
              <h2 className="text-3xl font-semibold text-slate-700">
                No Hotels Found
              </h2>

              <p className="mt-3 text-slate-500">
                Try another search or clear filters.
              </p>
            </motion.div>
          ) : (
            <motion.div
              variants={{
                hidden: {},
                show: {
                  transition: {
                    staggerChildren: 0.08,
                  },
                },
              }}
              initial="hidden"
              animate="show"
              className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {filteredHotels.map((hotel) => (
                <HotelCard
                  key={hotel.id}
                  hotel={hotel}
                />
              ))}
            </motion.div>
          )}

        </section>

      </main>

      <Footer />
    </>
  );
}

export default Home;