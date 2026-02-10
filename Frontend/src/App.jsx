import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AdminPage from "./pages/AdminPage";
import Home from "./pages/Home";
import PostDetailPage from "./pages/PostDetailPage";
import Login from "./components/Login";
import Register from "./components/Register";
import AdminRoute from "./pages/AdminRoute";
import Posts from "./pages/Posts";
import PostForm from "./components/PostFrom";
import ContactForm from "./components/ContactForm";
const App = () => {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        // App.jsx
        <Route path="/admin/edit/:id" element={<PostForm />} />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminPage />
            </AdminRoute>
          }
        />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/blogs" element={<Posts />} />
        <Route path="/post/:id" element={<PostDetailPage />} /> {/* ✅ */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
