import { Link, NavLink } from "react-router-dom";
import { FaHotel, FaPhoneAlt, FaBars } from "react-icons/fa";

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-3"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 shadow-sm">
            <FaHotel size={22} className="text-orange-500" />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-800">
              StayEase
            </h1>

            <p className="text-xs text-slate-500">
              Luxury Hotel Booking
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-10 lg:flex">

          <NavLink
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className={({ isActive }) =>
              `font-medium transition ${
                isActive
                  ? "text-slate-900"
                  : "text-slate-500 hover:text-slate-900"
              }`
            }
          >
            Home
          </NavLink>

          <a
            href="#hotels"
            className="font-medium text-slate-500 transition hover:text-slate-900"
          >
            Hotels
          </a>

          <a
            href="#footer"
            className="font-medium text-slate-500 transition hover:text-slate-900"
          >
            Contact
          </a>

        </nav>

        <div className="hidden items-center gap-4 lg:flex">

          <button
            onClick={() => alert("Login feature coming soon.")}
            className="rounded-xl border border-slate-200 px-5 py-2.5 font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Login
          </button>

          <a
            href="#footer"
            className="flex items-center gap-2 rounded-xl bg-slate-800 px-5 py-2.5 font-medium text-white transition hover:bg-black"
          >
            <FaPhoneAlt size={12} />
            Contact
          </a>

        </div>

        <button className="rounded-xl border border-slate-200 p-3 transition hover:bg-slate-100 lg:hidden">
          <FaBars />
        </button>

      </div>
    </header>
  );
}

export default Navbar;