import {
  FaWifi,
  FaSwimmingPool,
  FaParking,
  FaSnowflake,
  FaDumbbell,
} from "react-icons/fa";

import {
  MdRestaurant,
  MdRoomService,
} from "react-icons/md";

import { motion } from "framer-motion";

function Amenities({ hotel }) {
  const allAmenities = [
    {
      icon: <FaWifi />,
      title: "Free WiFi",
    },
    {
      icon: <FaSwimmingPool />,
      title: "Swimming Pool",
    },
    {
      icon: <MdRestaurant />,
      title: "Restaurant",
    },
    {
      icon: <FaDumbbell />,
      title: "Fitness Center",
    },
    {
      icon: <FaParking />,
      title: "Free Parking",
    },
    {
      icon: <MdRoomService />,
      title: "24×7 Room Service",
    },
    {
      icon: <FaSnowflake />,
      title: "Air Conditioning",
    },
    {
      icon: "☕",
      title: "Complimentary Breakfast",
    },
  ];

  let amenities = [];

  if (hotel.rating >= 4.7) {
    amenities = allAmenities;
  } else if (hotel.rating >= 4.3) {
    amenities = allAmenities.slice(0, 7);
  } else if (hotel.rating >= 4.0) {
    amenities = allAmenities.slice(0, 6);
  } else {
    amenities = [
      allAmenities[0],
      allAmenities[2],
      allAmenities[4],
      allAmenities[6],
    ];
  }

  return (
    <section className="mt-16">

      <div className="mb-3 inline-flex rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-600">
        Premium Services
      </div>

      <motion.h2
        initial={{ opacity: 0, x: -25 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-3xl font-bold text-slate-800"
      >
        Hotel Amenities
      </motion.h2>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

        {amenities.map((item, index) => (

          <motion.div
            key={index}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.4,
              delay: index * 0.08,
            }}
            whileHover={{
              y: -8,
              scale: 1.03,
            }}
            className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >

            <motion.div
              whileHover={{
                rotate: 10,
                scale: 1.15,
              }}
              className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-2xl text-orange-500"
            >
              {item.icon}
            </motion.div>

            <span className="font-medium text-slate-700">
              {item.title}
            </span>

          </motion.div>

        ))}

      </div>

    </section>
  );
}

export default Amenities;