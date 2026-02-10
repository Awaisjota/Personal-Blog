import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPost, selectPosts } from "../features/postSlice";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import PostCard from "../components/PostCard";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const posts = useSelector(selectPosts);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchPost());
  }, [dispatch]);

  const featuredPosts = posts.slice(-3).reverse();
  const latestPosts = posts.slice(-6).reverse();

  useEffect(() => {
    if (!featuredPosts.length) return;
    const t = setInterval(
      () => setIndex((i) => (i + 1) % featuredPosts.length),
      5000
    );
    return () => clearInterval(t);
  }, [featuredPosts]);

  const post = featuredPosts[index];

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* HERO CAROUSEL */}
      {post && (
        <section className="relative mt-6 h-[55vh] rounded-xl overflow-hidden bg-black">
          {/* IMAGE */}
          <img
            src={post.image}
            alt={post.title}
            className="absolute bottom-0 w-full h-[60%] object-cover"
          />

          {/* CONTENT */}
          <div className="relative z-10 p-8 md:p-12 text-white max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold leading-tight">
              {post.title}
            </h1>

            <p className="mt-4 text-gray-200 line-clamp-3">
              {post.description}
            </p>

            <div className="mt-6 flex gap-4">
              <button
                onClick={() => navigate(`/post/${post._id}`)}
                className="bg-white text-black px-6 py-2 rounded-md hover:bg-gray-200"
              >
                Read More
              </button>

              {/* LIKE → NAVIGATE */}
              <button
                onClick={() => navigate(`/post/${post._id}`)}
                className="flex items-center gap-2 bg-white/10 px-5 py-2 rounded-md hover:bg-white/20"
              >
                <Heart size={18} />
                Like
              </button>
            </div>
          </div>

          {/* NAV BUTTONS */}
          <button
            onClick={() =>
              setIndex(
                (i) => (i - 1 + featuredPosts.length) % featuredPosts.length
              )
            }
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 p-2 rounded-full"
          >
            <ChevronLeft className="text-white" />
          </button>

          <button
            onClick={() => setIndex((i) => (i + 1) % featuredPosts.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 p-2 rounded-full"
          >
            <ChevronRight className="text-white" />
          </button>
        </section>
      )}

      {/* FEATURED */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Trending Posts</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {featuredPosts.map((p) => (
            <PostCard key={p._id} post={p} />
          ))}
        </div>
      </section>

      {/* LATEST */}
      <section className="mt-12 mb-16">
        <h2 className="text-2xl font-bold mb-6">Latest Posts</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {latestPosts.map((p) => (
            <PostCard key={p._id} post={p} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
