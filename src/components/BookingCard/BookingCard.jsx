import { useMemo, useState } from "react";
import { motion } from "framer-motion";

function BookingCard({ hotel }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);

  const today = new Date().toISOString().split("T")[0];

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;

    const start = new Date(checkIn);
    const end = new Date(checkOut);

    const diff =
      (end.getTime() - start.getTime()) /
      (1000 * 60 * 60 * 24);

    return diff > 0 ? diff : 0;
  }, [checkIn, checkOut]);

  const roomPrice = Math.round(hotel.price);

  // ₹500 per night for every guest above 2
  const guestFee =
    guests > 2 ? (guests - 2) * 500 * nights : 0;

  const subtotal = roomPrice * nights + guestFee;
  const taxes = Math.round(subtotal * 0.18);
  const total = subtotal + taxes;

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="sticky top-28 rounded-3xl bg-white p-6 shadow-xl"
    >
      <h2 className="text-2xl font-bold text-slate-800">
        Book Your Stay
      </h2>

      <p className="mt-2 text-sm text-slate-500">
        Reserve your room instantly.
      </p>

      <div className="mt-6 space-y-5">

        <div>
          <label className="mb-2 block font-medium text-slate-700">
            Check-in
          </label>

          <input
            type="date"
            min={today}
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-orange-500"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium text-slate-700">
            Check-out
          </label>

          <input
            type="date"
            min={checkIn || today}
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-orange-500"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium text-slate-700">
            Guests
          </label>

          <select
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-orange-500"
          >
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <option key={num} value={num}>
                {num} Guest{num > 1 ? "s" : ""}
              </option>
            ))}
          </select>
        </div>

      </div>

      <div className="mt-8 rounded-2xl bg-slate-50 p-5">

        {nights > 0 ? (
          <>
            <div className="flex justify-between">
              <span>
                {nights} Night{nights > 1 ? "s" : ""}
              </span>

              <span>
                ₹{roomPrice} / night
              </span>
            </div>

            <div className="mt-3 flex justify-between">
              <span>Guests</span>
              <span>{guests}</span>
            </div>

            {guestFee > 0 && (
              <div className="mt-3 flex justify-between">
                <span>Extra Guest Fee</span>
                <span>₹{guestFee}</span>
              </div>
            )}

            <div className="mt-3 flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="mt-3 flex justify-between">
              <span>Taxes & Fees</span>
              <span>₹{taxes}</span>
            </div>

            <hr className="my-4" />

            <div className="flex justify-between text-xl font-bold text-slate-800">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

          </>
        ) : (
          <div className="py-6 text-center">

            <h3 className="text-lg font-semibold text-slate-700">
              Select your travel dates
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Choose your check-in and check-out dates to calculate your booking cost.
            </p>

          </div>
        )}

      </div>

      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.96 }}
        className="mt-8 w-full rounded-2xl bg-slate-800 py-4 text-lg font-semibold text-white transition hover:bg-black"
      >
        Reserve Your Stay
      </motion.button>

    </motion.div>
  );
}

export default BookingCard;