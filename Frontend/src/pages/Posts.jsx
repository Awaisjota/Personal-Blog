import { useDispatch, useSelector } from "react-redux";
import PostCard from "../components/PostCard";
import { fetchPost, selectPosts } from "../features/postSlice";
import { useEffect } from "react";

const Posts = ({ isAdmin, onDelete }) => {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);

  useEffect(() => {
    dispatch(fetchPost());
  }, [dispatch]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {posts.map((post) => (
        <PostCard
          key={post._id}
          post={post}
          isAdmin={isAdmin}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default Posts;
