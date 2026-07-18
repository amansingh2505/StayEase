import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import jsPDF from "jspdf";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [bookingToCancel, setBookingToCancel] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(saved);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setBookingToCancel(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const handleCancelBooking = (bookingId) => {
    setBookingToCancel(bookingId);
  };

  const confirmCancelBooking = () => {
    const updatedBookings = bookings.filter(
      (booking) => booking.id !== bookingToCancel
    );

    localStorage.setItem(
      "bookings",
      JSON.stringify(updatedBookings)
    );

    setBookings(updatedBookings);
    setBookingToCancel(null);

    toast.success("Booking cancelled successfully.");
  };

  const closeCancelModal = () => {
    setBookingToCancel(null);
  };

  const downloadInvoice = (booking) => {
    const doc = new jsPDF();

    // 1. Header Background
    doc.setFillColor(249, 115, 22); // Orange-500
    doc.rect(0, 0, 210, 42, "F");

    // Header Text
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(26);
    doc.text("StayEase", 20, 24);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("Hotel Booking Invoice", 20, 32);

    doc.setFontSize(10);
    doc.text(
      `Generated: ${new Date().toLocaleDateString("en-IN")}`,
      185,
      32,
      { align: "right" }
    );

    // 2. Hotel Name (Prominent at top)
    doc.setTextColor(40, 40, 40);
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text(booking.hotelName, 20, 54);

    // 3. Booking Information
    doc.setFontSize(14);
    doc.setTextColor(249, 115, 22); // Orange Accent
    doc.text("Booking Information", 20, 72);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(100, 100, 100);
    doc.text("Invoice No.", 20, 82);
    doc.setTextColor(40, 40, 40);
    doc.text(`INV-${booking.id}`, 185, 82, { align: "right" });

    doc.setTextColor(100, 100, 100);
    doc.text("Status", 20, 92);
    doc.setTextColor(34, 197, 94); // Green for Confirmed
    doc.setFont("helvetica", "bold");
    doc.text(`${booking.status}`, 185, 92, { align: "right" });

    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 100, 100);
    doc.text("Booked On", 20, 102);
    doc.setTextColor(40, 40, 40);
    doc.text(String(booking.bookedAt), 185, 102, { align: "right" });

    // 4. Divider Line
    doc.setDrawColor(230, 230, 230);
    doc.line(20, 112, 190, 112);

    // 5. Hotel Details
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(249, 115, 22);
    doc.text("Hotel Details", 20, 126);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(100, 100, 100);
    doc.text("Hotel", 20, 136);
    doc.setTextColor(40, 40, 40);
    doc.text(booking.hotelName, 185, 136, { align: "right" });

    doc.setTextColor(100, 100, 100);
    doc.text("Location", 20, 146);
    doc.setTextColor(40, 40, 40);
    doc.text(booking.location, 185, 146, { align: "right" });

    // 6. Divider
    doc.setDrawColor(230, 230, 230);
    doc.line(20, 156, 190, 156);

    // 7. Booking Details
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(249, 115, 22);
    doc.text("Booking Details", 20, 170);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(100, 100, 100);
    doc.text("Check-in", 20, 180);
    doc.setTextColor(40, 40, 40);
    doc.text(formatDate(booking.checkIn), 185, 180, { align: "right" });

    doc.setTextColor(100, 100, 100);
    doc.text("Check-out", 20, 190);
    doc.setTextColor(40, 40, 40);
    doc.text(formatDate(booking.checkOut), 185, 190, { align: "right" });

    doc.setTextColor(100, 100, 100);
    doc.text("Guests", 20, 200);
    doc.setTextColor(40, 40, 40);
    doc.text(String(booking.guests), 185, 200, { align: "right" });

    doc.setTextColor(100, 100, 100);
    doc.text("Nights", 20, 210);
    doc.setTextColor(40, 40, 40);
    doc.text(String(booking.nights), 185, 210, { align: "right" });

    // 8. Payment Box (Calculations & Layout)
    const totalNum = Number(String(booking.total).replace(/[^\d]/g, ""));
    const taxNum = Math.round(totalNum * 0.12); // Simulated 12% tax breakdown
    const roomNum = totalNum - taxNum;

    const totalStr = totalNum.toLocaleString("en-IN");
    const roomStr = roomNum.toLocaleString("en-IN");
    const taxStr = taxNum.toLocaleString("en-IN");

    doc.setFillColor(255, 247, 237); // orange-50
    doc.setDrawColor(253, 186, 116); // orange-300
    doc.roundedRect(20, 220, 170, 46, 4, 4, "FD"); // Fill and Draw

    doc.setTextColor(249, 115, 22);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text("Payment Summary", 28, 232);

    doc.setTextColor(100, 100, 100);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    
    doc.text("Room Charges", 28, 242);
    doc.setTextColor(40, 40, 40);
    doc.text(`INR ${roomStr}`, 182, 242, { align: "right" });

    doc.setTextColor(100, 100, 100);
    doc.text("Taxes & Fees", 28, 250);
    doc.setTextColor(40, 40, 40);
    doc.text(`INR ${taxStr}`, 182, 250, { align: "right" });

    // Inner divider
    doc.setDrawColor(253, 186, 116);
    doc.line(28, 255, 182, 255);

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Total", 28, 263);
    doc.text(`INR ${totalStr}`, 182, 263, { align: "right" });

    // 9. Footer
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(150, 150, 150);
    
    doc.text("Thank you for choosing StayEase", 105, 278, { align: "center" });
    doc.text("Need assistance? support@stayease.com | +91 XXXXX XXXXX", 105, 284, { align: "center" });

    // Bottom Decorative Bar
    doc.setFillColor(249, 115, 22);
    doc.rect(0, 292, 210, 5, "F");

    // 10. Save
    doc.save(`StayEase-Invoice-${booking.id}.pdf`);
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

                        <div className="min-w-[170px] flex-col flex rounded-2xl bg-slate-50 p-5 text-right">
                          <p className="text-3xl font-bold text-slate-800">
                            ₹{booking.total}
                          </p>

                          <p className="mt-2 text-sm text-slate-500">
                            {booking.nights} night{booking.nights > 1 ? "s" : ""}
                          </p>

                          <span className="mt-5 inline-flex self-end rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
                            {booking.status}
                          </span>

                          <motion.button
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.96 }}
                            onClick={() => downloadInvoice(booking)}
                            className="mt-5 w-full rounded-xl bg-slate-800 px-4 py-3 font-medium text-white transition hover:bg-black"
                          >
                            Download Invoice
                          </motion.button>

                          <motion.button
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.96 }}
                            onClick={() => handleCancelBooking(booking.id)}
                            className="mt-5 w-full rounded-xl bg-red-500 px-4 py-3 font-medium text-white transition hover:bg-red-600"
                          >
                            Cancel Booking
                          </motion.button>
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

      <AnimatePresence>
        {bookingToCancel && (
          <div
            onClick={closeCancelModal}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl"
            >
              <h2 className="text-2xl font-bold text-slate-800">
                Cancel Booking?
              </h2>

              <p className="mt-3 text-slate-500">
                Are you sure you want to cancel this booking? This action cannot be undone.
              </p>

              <div className="mt-8 flex justify-end gap-4">
                <button
                  onClick={closeCancelModal}
                  className="rounded-xl border border-slate-300 px-5 py-3 font-medium hover:bg-slate-100"
                >
                  Keep Booking
                </button>

                <button
                  onClick={confirmCancelBooking}
                  className="rounded-xl bg-red-500 px-5 py-3 font-medium text-white hover:bg-red-600"
                >
                  Yes, Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}

export default Bookings;