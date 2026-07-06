import { FaSearch } from "react-icons/fa";

function Hero({ search, setSearch }) {
  return (
    <section
      className="relative overflow-hidden rounded-3xl bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      <div className="bg-linear-to-r from-black/75 via-black/50 to-black/30">
        <div className="mx-auto flex min-h-120 max-w-7xl flex-col items-center justify-center px-6 text-center text-white">
          <span className="mb-4 rounded-full bg-white/20 px-4 py-2 text-sm backdrop-blur-md">
            Luxury • Comfort • Experience
          </span>

          <h1 className="max-w-4xl text-5xl font-bold leading-tight md:text-6xl">
            Find Your Perfect Stay Anywhere in India
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-slate-200">
            Discover premium hotels, compare prices and enjoy unforgettable stays.
          </p>

          <div className="mt-10 flex w-full max-w-2xl items-center rounded-2xl bg-white p-2 shadow-2xl">
            <FaSearch className="ml-4 text-gray-400" />

            <input
              type="text"
              placeholder="Search hotels..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent px-4 py-3 text-slate-700 outline-none"
            />

            <button className="rounded-xl bg-blue-600 px-8 py-3 font-medium text-white hover:bg-blue-700">
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;