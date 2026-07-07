import {
  FaSearch,
  FaHotel,
  FaStar,
} from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { motion } from "framer-motion";

function Hero({ search, setSearch }) {
  const cities = ["Goa", "Delhi", "Mumbai", "Jaipur", "Manali"];

  return (
    <section
      className="relative overflow-hidden rounded-[32px] bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/30"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
        className="relative mx-auto flex min-h-[560px] max-w-7xl flex-col items-center justify-center px-6 text-center text-white"
      >
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="rounded-full bg-white/20 px-5 py-2 text-sm font-medium backdrop-blur-md"
        >
          Luxury Hotels • Best Prices • Trusted Stays
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mt-6 max-w-4xl text-5xl font-bold leading-tight md:text-6xl"
        >
          Discover Your Next
          <span className="block text-orange-400">
            Perfect Stay
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 max-w-2xl text-lg text-slate-200"
        >
          Explore premium hotels across India with beautiful stays,
          excellent ratings and unforgettable experiences.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="mt-10 flex w-full max-w-3xl items-center rounded-2xl bg-white p-2 shadow-2xl"
        >
          <FaSearch className="ml-4 text-slate-400" />

          <input
            type="text"
            placeholder="Search hotel or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent px-4 py-3 text-slate-700 outline-none"
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-xl bg-slate-800 px-8 py-3 font-semibold text-white"
          >
            Search
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-10 flex flex-wrap justify-center gap-3"
        >
          {cities.map((city) => (
            <motion.button
              key={city}
              whileHover={{
                scale: 1.08,
                y: -2,
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSearch(city)}
              className="rounded-full bg-white/15 px-5 py-2 text-sm backdrop-blur-md transition hover:bg-orange-500"
            >
              {city}
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-14 grid w-full max-w-4xl grid-cols-3 gap-5"
        >
          <motion.div
            whileHover={{ y: -8 }}
            className="rounded-2xl bg-white/10 p-5 backdrop-blur-md"
          >
            <FaHotel className="mx-auto text-3xl text-orange-400" />
            <h2 className="mt-3 text-3xl font-bold">499+</h2>
            <p className="mt-1 text-sm text-slate-200">
              Premium Hotels
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -8 }}
            className="rounded-2xl bg-white/10 p-5 backdrop-blur-md"
          >
            <FaLocationDot className="mx-auto text-3xl text-orange-400" />
            <h2 className="mt-3 text-3xl font-bold">20+</h2>
            <p className="mt-1 text-sm text-slate-200">
              Cities Covered
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -8 }}
            className="rounded-2xl bg-white/10 p-5 backdrop-blur-md"
          >
            <FaStar className="mx-auto text-3xl text-orange-400" />
            <h2 className="mt-3 text-3xl font-bold">4.8</h2>
            <p className="mt-1 text-sm text-slate-200">
              Average Rating
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Hero;