import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, selectAuthrole, logout } from "../features/authSlice";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const user = useSelector(selectUser);
  const role = useSelector(selectAuthrole);
  const dispatch = useDispatch();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600 hover:text-gray-900 transition"
        >
          Dev<span className=" text-gray-900 hover:text-blue-600">Blog</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-6 items-center font-medium text-gray-600">
          <Link to="/" className="hover:text-blue-600 transition">
            Home
          </Link>
          <Link to="/blogs" className="hover:text-blue-600 transition">
            Posts
          </Link>
          <Link to="/contact" className="hover:text-blue-600 transition">
            Contact
          </Link>

          {user ? (
            <>
              {role === "admin" && (
                <Link to="/admin" className="hover:text-blue-600 transition">
                  Admin
                </Link>
              )}
              <button
                onClick={() => dispatch(logout())}
                className="ml-2 px-3 py-1 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition font-semibold"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-600 transition">
                Login
              </Link>
              <Link
                to="/register"
                className="ml-2 px-3 py-1 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition font-semibold"
              >
                Register
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-2xl p-1 rounded hover:bg-gray-200 transition"
          onClick={() => setOpen(!open)}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t shadow-md animate-slide-down">
          <nav className="flex flex-col p-4 gap-3 text-gray-700 font-medium">
            <Link
              onClick={() => setOpen(false)}
              to="/"
              className="hover:text-blue-600 transition"
            >
              Home
            </Link>
            <Link
              onClick={() => setOpen(false)}
              to="/blogs"
              className="hover:text-blue-600 transition"
            >
              Posts
            </Link>
            <Link
              onClick={() => setOpen(false)}
              to="/contact"
              className="hover:text-blue-600 transition"
            >
              Contact
            </Link>

            {user ? (
              <>
                {role === "admin" && (
                  <Link
                    onClick={() => setOpen(false)}
                    to="/admin"
                    className="hover:text-blue-600 transition"
                  >
                    Admin
                  </Link>
                )}
                <button
                  onClick={() => {
                    dispatch(logout());
                    setOpen(false);
                  }}
                  className="text-red-600 hover:underline transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  onClick={() => setOpen(false)}
                  to="/login"
                  className="hover:text-blue-600 transition"
                >
                  Login
                </Link>
                <Link
                  onClick={() => setOpen(false)}
                  to="/register"
                  className="hover:text-blue-600 transition"
                >
                  Register
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
