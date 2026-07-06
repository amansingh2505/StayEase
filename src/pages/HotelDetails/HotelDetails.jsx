import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaLocationDot, FaStar } from "react-icons/fa6";
import { fetchHotels } from "../../services/api";

function HotelDetails() {
  const { id } = useParams();

  const [hotel, setHotel] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    const loadHotel = async () => {
      const hotels = await fetchHotels();

      const selectedHotel = hotels.find(
        (item) => item.id === Number(id)
      );

      setHotel(selectedHotel);

      if (selectedHotel) {
        setSelectedImage(
          selectedHotel.photos?.[0] || selectedHotel.thumbnail
        );
      }
    };

    loadHotel();
  }, [id]);

  if (!hotel) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <div className="text-center">
          <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-slate-300 border-t-slate-800"></div>

          <p className="mt-5 text-lg font-medium text-slate-600">
            Loading Hotel...
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 py-10">

      <div className="mx-auto max-w-7xl px-6">

        <Link
          to="/"
          className="mb-8 inline-flex items-center rounded-xl bg-white px-5 py-3 font-medium shadow transition hover:bg-slate-100"
        >
          ← Back to Hotels
        </Link>

        <div className="grid gap-10 lg:grid-cols-2">

          <div>

            <img
              src={selectedImage}
              alt={hotel.name}
              className="h-[500px] w-full rounded-3xl object-cover shadow-xl"
            />

            <div className="mt-5 grid grid-cols-4 gap-4">

              {(hotel.photos?.length
                ? hotel.photos
                : [hotel.thumbnail]
              )
                .slice(0, 8)
                .map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt=""
                    onClick={() => setSelectedImage(photo)}
                    className={`h-24 w-full cursor-pointer rounded-xl object-cover transition duration-300 hover:scale-105 ${
                      selectedImage === photo
                        ? "ring-4 ring-slate-800"
                        : ""
                    }`}
                  />
                ))}

            </div>

          </div>

          <div>

            <div className="flex items-center gap-6">

              <div className="flex items-center gap-2 rounded-full bg-yellow-100 px-4 py-2 text-yellow-700">
                <FaStar />
                <span className="font-semibold">
                  {hotel.rating}
                </span>
              </div>

              <div className="flex items-center gap-2 text-slate-600">
                <FaLocationDot className="text-orange-400" />
                <span>{hotel.location}</span>
              </div>

            </div>

            <h1 className="mt-6 text-5xl font-bold text-slate-800">
              {hotel.name}
            </h1>

            <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

              <h2 className="text-4xl font-bold text-slate-800">
                ₹{Math.round(hotel.price)}
              </h2>

              <p className="mt-2 text-slate-500">
                Per Night
              </p>

            </div>

            <div className="mt-10">

              <h2 className="text-2xl font-semibold text-slate-800">
                About this Hotel
              </h2>

              <p className="mt-5 leading-8 text-slate-600">
                {hotel.description}
              </p>

            </div>

            <div className="mt-10 grid grid-cols-2 gap-4">

              <div className="rounded-2xl bg-white p-5 text-center shadow-sm">
                <h3 className="text-3xl font-bold text-slate-800">
                  {hotel.rating}
                </h3>

                <p className="mt-2 text-slate-500">
                  Guest Rating
                </p>
              </div>

              <div className="rounded-2xl bg-white p-5 text-center shadow-sm">
                <h3 className="text-3xl font-bold text-slate-800">
                  24/7
                </h3>

                <p className="mt-2 text-slate-500">
                  Support
                </p>
              </div>

            </div>

            <button className="mt-10 w-full rounded-2xl bg-slate-800 py-4 text-lg font-semibold text-white transition hover:bg-black">
              Book Now
            </button>

          </div>

        </div>

      </div>

    </main>
  );
}

export default HotelDetails;