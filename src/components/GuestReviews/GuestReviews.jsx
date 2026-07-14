import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

function GuestReviews({ hotel }) {
  const reviews =
    hotel.rating >= 4.7
      ? [
          {
            name: "Rahul Sharma",
            rating: 5,
            review:
              "Excellent stay. The rooms were spotless and the staff was extremely helpful.",
          },
          {
            name: "Priya Singh",
            rating: 5,
            review:
              "Amazing breakfast and beautiful ambience. Highly recommended.",
          },
          {
            name: "Aman Verma",
            rating: 4,
            review:
              "Great location and comfortable rooms. Would definitely visit again.",
          },
        ]
      : [
          {
            name: "Neha Gupta",
            rating: 4,
            review:
              "Good value for money with clean rooms and friendly staff.",
          },
          {
            name: "Rohit Kumar",
            rating: 4,
            review:
              "Nice experience overall. Food could be improved.",
          },
        ];

  return (
    <section className="mt-20">
      <h2 className="mb-8 text-3xl font-bold text-slate-800">
        Guest Reviews
      </h2>

      <div className="space-y-6">
        {reviews.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.4,
              delay: index * 0.1,
            }}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">
                {item.name}
              </h3>

              <div className="flex gap-1">
                {[...Array(item.rating)].map((_, i) => (
                  <FaStar
                    key={i}
                    className="text-yellow-400"
                  />
                ))}
              </div>
            </div>

            <p className="mt-4 leading-7 text-slate-600">
              {item.review}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default GuestReviews;