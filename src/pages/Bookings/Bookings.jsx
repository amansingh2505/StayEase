import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

function Bookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem("bookings")) || [];

    setBookings(saved);
  }, []);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-100 py-12">

        <div className="mx-auto max-w-7xl px-6">

          <h1 className="mb-10 text-4xl font-bold text-slate-800">
            My Bookings
          </h1>

          {bookings.length === 0 ? (

            <div className="rounded-3xl bg-white py-20 text-center shadow">

              <h2 className="text-3xl font-semibold text-slate-700">
                No Bookings Yet
              </h2>

              <p className="mt-3 text-slate-500">
                Book a hotel to see it here.
              </p>

            </div>

          ) : (

            <div className="space-y-6">

              {bookings.map((booking) => (

                <div
                  key={booking.id}
                  className="rounded-3xl bg-white p-6 shadow"
                >

                  <div className="flex gap-6">

                    <img
                      src={booking.thumbnail}
                      alt={booking.hotelName}
                      className="h-40 w-52 rounded-2xl object-cover"
                    />

                    <div className="flex flex-1 justify-between">

                      <div>

                        <h2 className="text-2xl font-bold">
                          {booking.hotelName}
                        </h2>

                        <p className="mt-2 text-slate-500">
                          📍 {booking.location}
                        </p>

                        <p className="mt-3">
                          Check-in: {booking.checkIn}
                        </p>

                        <p>
                          Check-out: {booking.checkOut}
                        </p>

                        <p className="mt-3">
                          Guests: {booking.guests}
                        </p>

                      </div>

                      <div className="text-right">

                        <h3 className="text-3xl font-bold">
                          ₹{booking.total}
                        </h3>

                        <span className="mt-4 inline-block rounded-full bg-green-100 px-4 py-2 text-green-700">
                          {booking.status}
                        </span>

                      </div>

                    </div>

                  </div>

                </div>

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