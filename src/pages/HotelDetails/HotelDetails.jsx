import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaLocationDot, FaStar } from "react-icons/fa6";
import { motion } from "framer-motion";
import { fetchHotels } from "../../services/api";
import BookingCard from "../../components/BookingCard/BookingCard";
import SimilarHotels from "../../components/SimilarHotels/SimilarHotels";
import RecentlyViewed from "../../components/RecentlyViewed/RecentlyViewed";

function HotelDetails() {
  const { id } = useParams();

  const [hotel, setHotel] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    const loadHotel = async () => {
      const hotels = await fetchHotels();

      const selectedHotel = hotels.find(
        (item) => item.id === Number(id)
      );

      setHotel(selectedHotel);
          if (selectedHotel) {
               const recent =
              JSON.parse(localStorage.getItem("recentHotels")) || [];

           const updated = [
           selectedHotel,
          ...recent.filter((item) => item.id !== selectedHotel.id),
          ].slice(0, 5);

         localStorage.setItem(
          "recentHotels",
           JSON.stringify(updated)
         );
        }

      if (selectedHotel) {
        setSelectedImage(
          selectedHotel.photos?.[0] || selectedHotel.thumbnail
        );
      }
    };

    loadHotel();
  }, [id]);

  if (!hotel) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <div className="text-center">
          <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-slate-300 border-t-slate-800"></div>

          <p className="mt-5 text-lg font-medium text-slate-600">
            Loading Hotel...
          </p>
        </div>
      </div>
    );
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-slate-100 py-10"
    >
      <motion.div
        initial={{ y: 35 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-7xl px-6"
      >

        <Link
          to="/"
          className="mb-8 inline-flex rounded-xl bg-white px-5 py-3 shadow hover:bg-slate-50"
        >
          ← Back to Hotels
        </Link>

        <div className="grid gap-10 lg:grid-cols-[1.7fr_1fr]">

          <motion.div
            initial={{ x: -40 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.img
              layoutId={`hotel-${hotel.id}`}
              src={selectedImage}
              alt={hotel.name}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
              className="h-[500px] w-full rounded-3xl object-cover shadow-xl"
            />

            <div className="mt-5 grid grid-cols-4 gap-4">

              {(hotel.photos?.length
                ? hotel.photos
                : [hotel.thumbnail]
              ).map((photo, index) => (
                <motion.img
                  whileHover={{ scale: 1.08 }}
                  key={index}
                  src={photo}
                  alt=""
                  onClick={() => setSelectedImage(photo)}
                  className={`h-24 w-full cursor-pointer rounded-xl object-cover ${
                    selectedImage === photo
                      ? "ring-4 ring-slate-800"
                      : ""
                  }`}
                />
              ))}

            </div>
          </motion.div>

          <motion.div
            initial={{ x: 40 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.6 }}
          >

            <div className="flex items-center gap-3">

              <span className="rounded-full bg-orange-100 px-4 py-2 text-orange-600">
                Luxury Stay
              </span>

              <div className="flex items-center gap-2">
                <FaStar className="text-yellow-400" />
                <span>{hotel.rating}</span>
              </div>

            </div>

            <h1 className="mt-6 text-5xl font-bold text-slate-800">
              {hotel.name}
            </h1>

            <div className="mt-5 flex items-center gap-2 text-slate-500">
              <FaLocationDot className="text-orange-500" />
              {hotel.location}
            </div>

            <div className="mt-8 rounded-2xl bg-orange-50 p-6">
              <h2 className="text-4xl font-bold text-slate-800">
                ₹{Math.round(hotel.price)}
              </h2>

              <p className="mt-1 text-slate-500">
                Per Night
              </p>
            </div>

            <div className="mt-10">
              <h2 className="text-2xl font-semibold">
                About this Hotel
              </h2>

              <p className="mt-4 leading-8 text-slate-600">
                {hotel.description}
              </p>
            </div>

            <div className="mt-10">
              <BookingCard hotel={hotel} />
            </div>

          </motion.div>

        </div>
      </motion.div>
      <SimilarHotels currentHotel={hotel} />
      <RecentlyViewed />
    </motion.main>
  );
}

export default HotelDetails;