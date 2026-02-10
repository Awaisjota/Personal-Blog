import { useDispatch, useSelector } from "react-redux";
import Posts from "./Posts";
import PostForm from "../components/PostFrom";
import AdminContactPage from "../components/AdminContactPage";
import { deletePost, fetchPost, selectPosts } from "../features/postSlice";
import { useEffect } from "react";

const AdminPage = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);

  useEffect(() => {
    dispatch(fetchPost());
  }, [dispatch]);

  const handleDelete = (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      dispatch(deletePost(postId));
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center">Admin Dashboard</h1>

      {/* Post Form */}
      <div className="bg-white p-6 rounded-xl shadow">
        <PostForm />
      </div>

      {/* Posts Grid */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">All Posts</h2>
        {posts.length > 0 ? (
          <Posts posts={posts} isAdmin={true} onDelete={handleDelete} />
        ) : (
          <p className="text-gray-500">No posts yet.</p>
        )}
      </div>
      <br />
      <AdminContactPage />
    </div>
  );
};

export default AdminPage;
