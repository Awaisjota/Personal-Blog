import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-3">
        {/* About */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">DevBlog</h2>
          <p className="text-gray-400 text-sm">
            A modern blog platform where developers share knowledge, tutorials,
            and resources to level up their skills.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                to="/"
                className="hover:text-white transition-colors duration-200"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/blogs"
                className="hover:text-white transition-colors duration-200"
              >
                Blogs
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-white transition-colors duration-200"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-white transition-colors duration-200"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-white font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4 text-2xl">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors duration-200"
            >
              🐦
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition-colors duration-200"
            >
              💼
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500 transition-colors duration-200"
            >
              📸
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-100 transition-colors duration-200"
            >
              🐱
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-500 text-sm border-t border-gray-700 py-4">
        © {new Date().getFullYear()} DevBlog. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
