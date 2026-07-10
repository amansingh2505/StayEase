import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import HotelCard from "../HotelCard/HotelCard";
import { fetchHotels } from "../../services/api";

function SimilarHotels({ currentHotel }) {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const loadHotels = async () => {
      const data = await fetchHotels();

      const similar = data
        .filter(
          (hotel) =>
            hotel.location === currentHotel.location &&
            hotel.id !== currentHotel.id
        )
        .slice(0, 3);

      setHotels(similar);
    };

    loadHotels();
  }, [currentHotel]);

  if (hotels.length === 0) {
    return (
      <section className="mt-20 rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
        <h2 className="text-2xl font-bold text-slate-800">
          More Hotels Coming Soon
        </h2>

        <p className="mt-3 text-slate-500">
          We couldn't find similar hotels in this location yet.
        </p>
      </section>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mt-20"
    >
      <div className="mb-3 inline-flex rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-600">
        Recommended For You
      </div>

      <motion.h2
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-3xl font-bold text-slate-800"
      >
        You May Also Like
      </motion.h2>

      <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
        {hotels.map((hotel) => (
          <HotelCard
            key={hotel.id}
            hotel={hotel}
          />
        ))}
      </div>
    </motion.section>
  );
}

export default SimilarHotels;