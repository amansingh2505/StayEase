function FilterBar({
  locations,
  selectedLocation,
  setSelectedLocation,
  selectedRating,
  setSelectedRating,
  sortBy,
  setSortBy,
}) {
  return (
    <div className="mb-10 rounded-3xl bg-white p-6 shadow-md">

      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        <div className="flex flex-wrap gap-4">

          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-slate-700 outline-none transition focus:border-slate-800"
          >
            <option value="">All Locations</option>

            {locations.map((location) => (
              <option
                key={location}
                value={location}
              >
                {location}
              </option>
            ))}

          </select>

          <select
            value={selectedRating}
            onChange={(e) => setSelectedRating(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-slate-700 outline-none transition focus:border-slate-800"
          >
            <option value="">All Ratings</option>
            <option value="4">4★ & Above</option>
            <option value="3">3★ & Above</option>
            <option value="2">2★ & Above</option>
          </select>

        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-slate-700 outline-none transition focus:border-slate-800"
        >
          <option value="">Sort By</option>
          <option value="low-high">Price : Low to High</option>
          <option value="high-low">Price : High to Low</option>
          <option value="rating">Highest Rated</option>
        </select>

      </div>

    </div>
  );
}

export default FilterBar;