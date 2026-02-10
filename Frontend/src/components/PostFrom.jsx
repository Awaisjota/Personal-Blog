import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addPost,
  selectPostError,
  selectPostLoading,
  selectSinglePost,
} from "../features/postSlice";
import { clearError, selectAuthrole, selectUser } from "../features/authSlice";
import { useNavigate, useParams } from "react-router-dom";
import { fetchById, updatePost } from "../features/postSlice";
const PostForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector(selectPostLoading);
  const user = useSelector(selectUser);
  const role = useSelector(selectAuthrole);
  const error = useSelector(selectPostError);
  const post = useSelector(selectSinglePost);

  const [formData, setFormData] = useState({
    title: "",
    image: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    dispatch(clearError());
  };
  const getError = (filed) => {
    return error?.errors?.find((e) => e.param === filed)?.msg;
  };
  useEffect(() => {
    if (id) {
      dispatch(fetchById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (id && post) {
      setFormData({
        title: post.title || "",
        image: post.image || "",
        description: post.description || "",
      });
    }
  }, [id, post]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let res;
    if (id) {
      res = await dispatch(updatePost({ id, data: formData }));
    } else {
      res = await dispatch(addPost({ ...formData, author: user }));
    }
    if (res.meta.requestStatus === "fulfilled") {
      navigate("/blogs");
    }
  };

  if (role !== "admin") {
    return null;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 rounded-xl shadow space-y-4"
    >
      <h2 className="text-xl font-bold text-center">
        {id ? "Edit Post" : "Create Post"}
      </h2>

      {/* 🔴 General error */}
      {error?.msg && (
        <p className="text-red-600 text-sm text-center">{error.msg}</p>
      )}

      {/* Title */}
      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Post Title"
        className="w-full border p-2 rounded"
      />
      {getError("title") && (
        <p className="text-red-500 text-sm">{getError("title")}</p>
      )}

      {/* Image */}
      <input
        name="image"
        value={formData.image}
        onChange={handleChange}
        placeholder="Post Image"
        className="w-full border p-2 rounded"
      />

      {getError("image") && (
        <p className="text-red-500 text-sm">{getError("image")}</p>
      )}

      {/* Description */}
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Post Description"
        className="w-full border p-2 rounded"
        rows="4"
      />
      {getError("description") && (
        <p className="text-red-500 text-sm">{getError("description")}</p>
      )}

      <button
        className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 disabled:opacity-50"
        disabled={loading}
      >
        {loading
          ? id
            ? "Updating..."
            : "Adding..."
          : id
          ? "Update Post"
          : "Add Post"}
      </button>
    </form>
  );
};

export default PostForm;
