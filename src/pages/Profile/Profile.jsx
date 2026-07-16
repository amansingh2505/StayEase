import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaHeart,
  FaSuitcaseRolling,
  FaSignOutAlt,
  FaHome,
} from "react-icons/fa";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

function Profile() {
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  const bookings =
    JSON.parse(localStorage.getItem("bookings")) || [];

  const wishlist =
    JSON.parse(localStorage.getItem("wishlist")) || [];

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully.");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-100 px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-2xl rounded-3xl bg-white p-8 shadow-xl"
      >
        <div className="text-center">
          <FaUserCircle
            size={90}
            className="mx-auto text-slate-700"
          />

          <h1 className="mt-5 text-3xl font-bold">
            {user.name}
          </h1>

          <p className="mt-2 text-slate-500">
            {user.email}
          </p>

          <div className="mt-8 grid grid-cols-2 gap-5">
            <div className="rounded-2xl bg-orange-50 p-5 text-center">
              <h2 className="text-3xl font-bold text-orange-600">
                {bookings.length}
              </h2>

              <p className="mt-2 text-sm text-slate-600">
                Bookings
              </p>
            </div>

            <div className="rounded-2xl bg-red-50 p-5 text-center">
              <h2 className="text-3xl font-bold text-red-500">
                {wishlist.length}
              </h2>

              <p className="mt-2 text-sm text-slate-600">
                Wishlist
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 space-y-4">
          <Link
            to="/"
            className="flex items-center justify-between rounded-2xl border border-slate-200 p-5 transition hover:bg-slate-50"
          >
            <div className="flex items-center gap-3">
              <FaHome />
              <span>Home</span>
            </div>

            →
          </Link>

          <Link
            to="/bookings"
            className="flex items-center justify-between rounded-2xl border border-slate-200 p-5 transition hover:bg-slate-50"
          >
            <div className="flex items-center gap-3">
              <FaSuitcaseRolling />
              <span>My Bookings</span>
            </div>

            →
          </Link>

          <Link
            to="/wishlist"
            className="flex items-center justify-between rounded-2xl border border-slate-200 p-5 transition hover:bg-slate-50"
          >
            <div className="flex items-center gap-3">
              <FaHeart className="text-red-500" />
              <span>Wishlist</span>
            </div>

            →
          </Link>

          <button
            onClick={handleLogout}
            className="flex w-full items-center justify-between rounded-2xl border border-red-200 p-5 text-red-600 transition hover:bg-red-50"
          >
            <div className="flex items-center gap-3">
              <FaSignOutAlt />
              <span>Logout</span>
            </div>

            →
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default Profile;