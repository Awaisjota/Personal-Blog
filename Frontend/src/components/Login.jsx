import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  login,
  selectAuthError,
  selectAuthStatus,
  selectUser,
} from "../features/authSlice";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector(selectAuthError);
  const status = useSelector(selectAuthStatus);
  const user = useSelector(selectUser);

  const [form, setForm] = useState({ email: "", password: "" });

  const getFieldError = (field) =>
    error?.errors?.find((e) => e.path === field)?.msg;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(login(form));
    if (res.meta.requestStatus === "fulfilled") {
      localStorage.setItem("token", res.payload.token);
      navigate(res.payload.user.role === "admin" ? "/admin" : "/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-3xl shadow-lg w-96 space-y-5"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Welcome Back
        </h2>

        {/* General error */}
        {error?.msg && <p className="text-red-600 text-center">{error.msg}</p>}

        <div className="flex flex-col space-y-3">
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
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
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {getFieldError("password") && (
            <p className="text-red-500 text-sm">{getFieldError("password")}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition disabled:opacity-50"
        >
          {status === "loading" ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-gray-500">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
