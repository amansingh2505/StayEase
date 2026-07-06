import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

function HotelCard({ hotel }) {
  return (
    <article className="group overflow-hidden rounded-3xl bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

      <div className="relative overflow-hidden">

        <img
          src={hotel.thumbnail}
          alt={hotel.name}
          className="h-64 w-full object-cover transition duration-500 group-hover:scale-110"
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

          <Link
            to={`/hotel/${hotel.id}`}
            className="rounded-xl bg-slate-800 px-5 py-3 font-medium text-white transition duration-300 hover:bg-black"
          >
            View Details
          </Link>

        </div>

      </div>

    </article>
  );
}

export default HotelCard;