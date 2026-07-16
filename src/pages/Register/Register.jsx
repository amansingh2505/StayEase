import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaHotel } from "react-icons/fa";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      toast.error("Please enter your name.");
      return;
    }

    if (!form.email.trim()) {
      toast.error("Please enter your email.");
      return;
    }

    if (!form.password.trim()) {
      toast.error("Please enter a password.");
      return;
    }

    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    const exists = users.find(
      (user) =>
        user.email.toLowerCase() ===
        form.email.toLowerCase()
    );

    if (exists) {
      toast.error("Email already registered.");
      return;
    }

    const newUser = {
      id: Date.now(),
      name: form.name,
      email: form.email,
      password: form.password,
    };

    users.push(newUser);

    localStorage.setItem(
      "users",
      JSON.stringify(users)
    );

    login({
      name: newUser.name,
      email: newUser.email,
    });

    toast.success("Account created successfully!");

    navigate("/");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-6">
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl"
      >
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100">
            <FaHotel
              size={28}
              className="text-orange-500"
            />
          </div>

          <h1 className="mt-5 text-3xl font-bold text-slate-800">
            Create Account
          </h1>

          <p className="mt-2 text-slate-500">
            Register to start booking hotels.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <label className="mb-2 block font-medium">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Password
            </label>

            <div className="relative">
              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-12 outline-none focus:border-orange-500"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                {showPassword
                  ? <FaEyeSlash />
                  : <FaEye />}
              </button>
            </div>
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Confirm Password
            </label>

            <div className="relative">
              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-12 outline-none focus:border-orange-500"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                {showConfirmPassword
                  ? <FaEyeSlash />
                  : <FaEye />}
              </button>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="w-full rounded-xl bg-slate-800 py-3 font-semibold text-white hover:bg-black"
          >
            Register
          </motion.button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-orange-500"
          >
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default Register;