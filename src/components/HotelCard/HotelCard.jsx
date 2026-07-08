import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { motion } from "framer-motion";
import { useWishlist } from "../../context/WishlistContext";

function HotelCard({ hotel }) {
  const { toggleWishlist, isWishlisted } = useWishlist();

  const wishlisted = isWishlisted(hotel.id);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 25 },
        show: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.45 }}
      whileHover={{ y: -8 }}
      className="group overflow-hidden rounded-3xl bg-white shadow-sm transition-all duration-300 hover:shadow-2xl"
    >
      <div className="relative overflow-hidden">

        <img
          src={hotel.thumbnail}
          alt={hotel.name}
          className="h-64 w-full object-cover transition duration-500 group-hover:scale-110"
        />

        <div className="absolute left-4 top-4 rounded-full bg-orange-500 px-4 py-2 font-semibold text-white shadow-lg">
          ₹{Math.round(hotel.price)}
        </div>

        <div className="absolute right-4 top-4 flex gap-3">

          <div className="flex items-center gap-1 rounded-full bg-white px-3 py-2 shadow-lg">
            <FaStar className="text-yellow-400" />
            <span>{hotel.rating}</span>
          </div>

          <button
            onClick={() => toggleWishlist(hotel.id)}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-lg transition hover:scale-110"
          >
            {wishlisted ? (
              <FaHeart className="text-red-500" />
            ) : (
              <FaRegHeart className="text-slate-600" />
            )}
          </button>

        </div>

      </div>

      <div className="space-y-4 p-5">

        <h2 className="line-clamp-1 text-xl font-semibold text-slate-800">
          {hotel.name}
        </h2>

        <div className="flex items-center gap-2 text-slate-500">
          <FaLocationDot className="text-orange-500" />
          {hotel.location}
        </div>

        <p className="line-clamp-2 text-sm leading-7 text-slate-500">
          {hotel.description}
        </p>

        <div className="flex items-center justify-between border-t pt-4">

          <div>
            <h3 className="text-3xl font-bold text-slate-800">
              ₹{Math.round(hotel.price)}
            </h3>

            <p className="text-slate-500">
              / night
            </p>
          </div>

          <Link
            to={`/hotel/${hotel.id}`}
            className="rounded-xl bg-slate-800 px-5 py-3 font-medium text-white transition hover:bg-black"
          >
            View Details
          </Link>

        </div>

      </div>

    </motion.div>
  );
}

export default HotelCard;