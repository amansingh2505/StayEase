import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

function GuestReviews({ hotel }) {
  const [showAll, setShowAll] = useState(false);

  const reviews =
    hotel.rating >= 4.7
      ? [
          {
            name: "Rahul Sharma",
            rating: 5,
            date: "Stayed in June 2026",
            helpful: 24,
            review:
              "Excellent stay. The rooms were spotless and the staff was extremely helpful. Everything from check-in to check-out was smooth.",
          },
          {
            name: "Priya Singh",
            rating: 5,
            date: "Stayed in May 2026",
            helpful: 18,
            review:
              "Amazing breakfast and beautiful ambience. Highly recommended for families and couples.",
          },
          {
            name: "Aman Verma",
            rating: 4,
            date: "Stayed in April 2026",
            helpful: 12,
            review:
              "Great location, comfortable rooms and courteous staff. Would definitely visit again.",
          },
        ]
      : [
          {
            name: "Neha Gupta",
            rating: 4,
            date: "Stayed in June 2026",
            helpful: 15,
            review:
              "Good value for money with clean rooms and friendly staff.",
          },
          {
            name: "Rohit Kumar",
            rating: 4,
            date: "Stayed in May 2026",
            helpful: 9,
            review:
              "Nice experience overall. Food could be improved but the stay was comfortable.",
          },
        ];

  return (
    <section className="mt-20">

      <div className="mb-3 inline-flex rounded-full bg-yellow-100 px-4 py-2 text-sm font-medium text-yellow-700">
        Trusted Guest Feedback
      </div>

      <h2 className="text-3xl font-bold text-slate-800">
        Guest Reviews
      </h2>

      <div className="mt-5 flex flex-wrap items-center gap-4">

        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, index) => (
            <FaStar
              key={index}
              className="text-yellow-400"
            />
          ))}
        </div>

        <span className="text-xl font-bold text-slate-800">
          {hotel.rating}
        </span>

        <span className="text-slate-500">
          Based on 2,000+ verified stays
        </span>

      </div>

      <div className="mt-10 space-y-6">

        {(showAll ? reviews : reviews.slice(0, 2)).map(
          (item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: index * 0.1,
              }}
              whileHover={{
                y: -6,
              }}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-xl"
            >

              <div className="flex items-start justify-between">

                <div>

                  <h3 className="text-lg font-semibold">
                    {item.name}
                  </h3>

                  <p className="text-sm font-medium text-green-600">
                    ✔ Verified Stay
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    {item.date}
                  </p>

                </div>

                <div className="flex gap-1">
                  {[...Array(item.rating)].map((_, i) => (
                    <FaStar
                      key={i}
                      className="text-yellow-400"
                    />
                  ))}
                </div>

              </div>

              <p className="mt-5 leading-7 text-slate-600">
                {item.review}
              </p>

              <button className="mt-6 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200">
                👍 Helpful ({item.helpful})
              </button>

            </motion.div>
          )
        )}

      </div>

      {reviews.length > 2 && (
        <div className="mt-10 text-center">

          <button
            onClick={() => setShowAll(!showAll)}
            className="rounded-xl bg-slate-800 px-6 py-3 font-medium text-white transition hover:bg-black"
          >
            {showAll
              ? "Show Less"
              : "Show More Reviews"}
          </button>

        </div>
      )}

    </section>
  );
}

export default GuestReviews;