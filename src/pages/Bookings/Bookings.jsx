import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

function Bookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(saved);
  }, []);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-100 py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-medium uppercase tracking-widest text-orange-500">
                Your Travel History
              </p>

              <h1 className="mt-2 text-4xl font-bold text-slate-800">
                My Bookings
              </h1>

              <p className="mt-3 text-slate-500">
                {bookings.length} confirmed booking{bookings.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>

          {bookings.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl bg-white py-20 text-center shadow"
            >
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-orange-100 text-4xl">
                🧳
              </div>

              <h2 className="text-3xl font-semibold text-slate-700">
                No Bookings Yet
              </h2>

              <p className="mt-3 text-slate-500">
                Book a hotel to see it here.
              </p>

              <Link
                to="/"
                className="mt-8 inline-flex rounded-xl bg-slate-800 px-6 py-3 font-medium text-white transition hover:bg-black"
              >
                Browse Hotels
              </Link>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {bookings.map((booking, index) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06 }}
                  className="overflow-hidden rounded-3xl bg-white shadow-lg"
                >
                  <div className="grid gap-0 md:grid-cols-[220px_1fr]">
                    <img
                      src={booking.thumbnail}
                      alt={booking.hotelName}
                      className="h-60 w-full object-cover md:h-full"
                    />

                    <div className="p-6 md:p-8">
                      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                        <div className="max-w-2xl">
                          <div className="mb-3 inline-flex rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-600">
                            Confirmed Booking
                          </div>

                          <h2 className="text-2xl font-bold text-slate-800">
                            {booking.hotelName}
                          </h2>

                          <p className="mt-2 text-slate-500">
                            📍 {booking.location}
                          </p>

                          <div className="mt-5 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
                            <p>
                              <span className="font-semibold text-slate-700">
                                Check-in:
                              </span>{" "}
                              {formatDate(booking.checkIn)}
                            </p>

                            <p>
                              <span className="font-semibold text-slate-700">
                                Check-out:
                              </span>{" "}
                              {formatDate(booking.checkOut)}
                            </p>

                            <p>
                              <span className="font-semibold text-slate-700">
                                Guests:
                              </span>{" "}
                              {booking.guests}
                            </p>

                            <p>
                              <span className="font-semibold text-slate-700">
                                Booked on:
                              </span>{" "}
                              {booking.bookedAt}
                            </p>
                          </div>
                        </div>

                        <div className="min-w-[170px] rounded-2xl bg-slate-50 p-5 text-right">
                          <p className="text-3xl font-bold text-slate-800">
                            ₹{booking.total}
                          </p>

                          <p className="mt-2 text-sm text-slate-500">
                            {booking.nights} night{booking.nights > 1 ? "s" : ""}
                          </p>

                          <span className="mt-5 inline-flex rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
                            {booking.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Bookings;
