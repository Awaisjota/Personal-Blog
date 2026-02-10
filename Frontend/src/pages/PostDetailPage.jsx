// PostDetailCard.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchById,
  likePost,
  addComment,
  selectSinglePost,
  selectPostLoading,
} from "../features/postSlice";
import { selectUser } from "../features/authSlice";

const PostDetailCard = () => {
  const { id } = useParams(); // ✅ get id from URL
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const post = useSelector(selectSinglePost);
  const loading = useSelector(selectPostLoading);
  const user = useSelector(selectUser);
  const [text, setText] = useState("");

  // 🔹 Fetch post by ID on mount or ID change
  useEffect(() => {
    if (id) dispatch(fetchById(id));
  }, [dispatch, id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!post) return <p className="text-center mt-10">Post not found</p>;

  const handleLike = () => {
    if (!user) return navigate("/login");
    dispatch(likePost(post._id));
  };

  const handleComment = () => {
    if (!user) return navigate("/login");
    if (text.trim()) {
      dispatch(addComment({ id: post._id, text }));
      setText("");
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl p-8 mt-8">
      <p className="text-gray-400 text-sm mb-2">
        {new Date(post.createdAt).toLocaleDateString()} • by{" "}
        {post.author?.name || "Unknown"}
      </p>

      <h1 className="text-4xl font-bold mb-6">{post.title}</h1>

      <img
        src={post.image}
        alt={post.title}
        className="w-full h-96 object-cover rounded-2xl mb-6"
      />

      <p className="text-gray-800 text-lg whitespace-pre-line">
        {post.description}
      </p>

      <div className="flex items-center mt-6 gap-4">
        <button
          onClick={handleLike}
          className="flex items-center gap-2 text-red-500 font-semibold hover:scale-105 transition transform"
        >
          ❤️ {post.likes?.length || 0} Likes
        </button>
      </div>

      <div className="mt-8">
        <h4 className="text-xl font-semibold mb-4">
          Comments ({post.comments?.length || 0})
        </h4>

        <div className="space-y-3">
          {post.comments?.map((c) => (
            <div key={c._id} className="bg-gray-50 rounded-xl p-3">
              <p className="text-sm text-gray-700">
                <strong>{c.user?.name || "Unknown"}:</strong> {c.text}
              </p>
            </div>
          ))}
        </div>

        <div className="flex gap-3 mt-4">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 border rounded-2xl px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <button
            onClick={handleComment}
            className="bg-blue-600 text-white px-6 rounded-2xl hover:bg-blue-700 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostDetailCard;
