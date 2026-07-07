import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { motion } from "framer-motion";

function HotelCard({ hotel }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
      whileHover={{
        y: -10,
      }}
      className="group overflow-hidden rounded-3xl bg-white shadow-md"
    >
      <div className="relative overflow-hidden">

        <motion.img
          src={hotel.thumbnail}
          alt={hotel.name}
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.5 }}
          className="h-64 w-full object-cover"
        />

        <div className="absolute left-4 top-4 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-slate-800 shadow-lg backdrop-blur-sm">
          ₹{Math.round(hotel.price)}
        </div>

        <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-white px-3 py-2 shadow-lg">
          <FaStar className="text-yellow-400" />

          <span className="font-semibold text-slate-700">
            {hotel.rating}
          </span>
        </div>

      </div>

      <div className="space-y-4 p-5">

        <h2 className="line-clamp-1 text-xl font-bold text-slate-800">
          {hotel.name}
        </h2>

        <div className="flex items-center gap-2 text-slate-500">
          <FaLocationDot className="text-orange-400" />
          <span>{hotel.location}</span>
        </div>

        <p className="line-clamp-2 text-sm leading-6 text-slate-500">
          {hotel.description}
        </p>

        <div className="flex items-center justify-between border-t border-slate-200 pt-4">

          <div>
            <h3 className="text-2xl font-bold text-slate-800">
              ₹{Math.round(hotel.price)}
            </h3>

            <p className="text-sm text-slate-500">
              / night
            </p>
          </div>

          <motion.div
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
          >
            <Link
              to={`/hotel/${hotel.id}`}
              className="rounded-xl bg-slate-800 px-5 py-3 font-medium text-white transition hover:bg-black"
            >
              View Details
            </Link>
          </motion.div>

        </div>

      </div>

    </motion.article>
  );
}

export default HotelCard;