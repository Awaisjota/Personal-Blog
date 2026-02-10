import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  register,
  clearError,
  selectAuthStatus,
  selectAuthError,
} from "../features/authSlice";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const status = useSelector(selectAuthStatus);
  const error = useSelector(selectAuthError);

  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const getFieldError = (field) =>
    error?.errors?.find((e) => e.path === field)?.msg;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) dispatch(clearError());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(register(form));
    if (res.meta.requestStatus === "fulfilled") {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-yellow-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-3xl shadow-lg w-96 space-y-5"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Create Account
        </h2>

        {/* General error */}
        {error?.msg && <p className="text-red-600 text-center">{error.msg}</p>}

        <div className="flex flex-col space-y-3">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          {getFieldError("name") && (
            <p className="text-red-500 text-sm">{getFieldError("name")}</p>
          )}

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          {getFieldError("email") && (
            <p className="text-red-500 text-sm">{getFieldError("email")}</p>
          )}

          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          {getFieldError("password") && (
            <p className="text-red-500 text-sm">{getFieldError("password")}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full py-3 bg-pink-500 text-white rounded-xl font-semibold hover:bg-pink-600 transition disabled:opacity-50"
        >
          {status === "loading" ? "Registering..." : "Register"}
        </button>

        <p className="text-center text-gray-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-pink-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
