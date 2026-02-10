import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { likePost } from "../features/postSlice";
import { selectUser } from "../features/authSlice";

const PostCard = ({ post, isAdmin, onDelete }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const handleLike = () => {
    if (!user) return navigate("/login");
    dispatch(likePost(post._id));
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <img
        src={post.image} // post.image hi path hai
        alt={post.title}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <p className="text-gray-500 text-sm mb-1">
          {new Date(post.createdAt).toLocaleDateString()}
        </p>

        <h2 className="text-xl font-bold mb-2">{post.title}</h2>
        <p className="text-gray-700 mb-2 line-clamp-2">{post.description}</p>

        {/* Like + Read */}
        <div className="flex justify-between items-center">
          <Link
            to={`/post/${post._id}`}
            className="text-blue-600 hover:underline font-semibold"
          >
            Read More →
          </Link>

          <button onClick={handleLike} className="text-red-500 font-semibold">
            ❤️ {post.likes?.length || 0}
          </button>
        </div>

        {/* Admin Actions */}
        {isAdmin && (
          <div className="flex space-x-3 mt-3">
            <Link
              to={`/admin/edit/${post._id}`}
              className="text-yellow-600 hover:underline font-semibold"
            >
              Edit
            </Link>

            <button
              onClick={() => onDelete(post._id)}
              className="text-red-600 hover:underline font-semibold"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;
