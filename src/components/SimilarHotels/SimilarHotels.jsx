import { useEffect, useState } from "react";
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

  if (hotels.length === 0) return null;

  return (
    <section className="mt-20">

      <h2 className="mb-8 text-3xl font-bold text-slate-800">
        You May Also Like
      </h2>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

        {hotels.map((hotel) => (
          <HotelCard
            key={hotel.id}
            hotel={hotel}
          />
        ))}

      </div>

    </section>
  );
}

export default SimilarHotels;