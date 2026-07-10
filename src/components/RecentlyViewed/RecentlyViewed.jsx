import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import HotelCard from "../HotelCard/HotelCard";

function RecentlyViewed() {
  const [recentHotels, setRecentHotels] = useState([]);

  useEffect(() => {
    const hotels =
      JSON.parse(localStorage.getItem("recentHotels")) || [];

    setRecentHotels(hotels);
  }, []);

  if (recentHotels.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mt-20"
    >
      <div className="mb-3 inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
        Your Activity
      </div>

      <h2 className="mb-8 text-3xl font-bold text-slate-800">
        Recently Viewed
      </h2>

      <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
        {recentHotels.map((hotel) => (
          <HotelCard
            key={hotel.id}
            hotel={hotel}
          />
        ))}
      </div>
    </motion.section>
  );
}

export default RecentlyViewed;