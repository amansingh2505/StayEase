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

function Amenities() {
  const amenities = [
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

  return (
    <section className="mt-16">

      <h2 className="mb-8 text-3xl font-bold text-slate-800">
        Hotel Amenities
      </h2>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

        {amenities.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-lg"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-2xl text-orange-500">
              {item.icon}
            </div>

            <span className="font-medium text-slate-700">
              {item.title}
            </span>
          </div>
        ))}

      </div>

    </section>
  );
}

export default Amenities;