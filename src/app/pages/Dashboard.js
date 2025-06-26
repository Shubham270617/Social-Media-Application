"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [hasMore, setHasMore] = useState(true);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!token || !userId) {
      navigate("/");
    } else {
      fetchUserData();
      fetchOtherUsers();
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [page]);

  const fetchUserData = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setUser(data.user);
    } catch (err) {
      console.error("User fetch error:", err);
    }
  };

  const fetchPosts = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/posts?page=${page}&limit=${limit}`
      );
      const data = await res.json();
      if (Array.isArray(data.posts)) {
        setPosts((prev) => (page === 1 ? data.posts : [...prev, ...data.posts]));
        setHasMore(page < data.totalPages);
      } else {
        console.error("Unexpected response format:", data);
      }
    } catch (err) {
      console.error("Post fetch error:", err);
    }
  };

  const fetchOtherUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setAllUsers(Array.isArray(data.users) ? data.users : []);
    } catch (err) {
      console.error("Users fetch error:", err);
      setAllUsers([]);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!content) return;
    const res = await fetch("http://localhost:5000/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, content }),
    });
    const data = await res.json();
    if (res.ok) {
      setContent("");
      setPosts([]);
      setPage(1);
    } else {
      alert(data.error || "Error creating post");
    }
  };

  const handleLike = async (postId) => {
    const res = await fetch(`http://localhost:5000/api/posts/${postId}/like`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });
    const data = await res.json();
    if (res.ok) {
      setPosts([]);
      setPage(1);
    } else {
      alert(data.error || "Error liking post");
    }
  };

  const handleFollow = async (followingId) => {
    const res = await fetch(`http://localhost:5000/api/follow`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ followerId: userId, followingId }),
    });
    const data = await res.json();
    if (res.ok) {
      alert("Now following user");
    } else {
      alert(data.error || "Follow failed");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white p-6">
      <div className="max-w-4xl mx-auto space-y-10 animate-fade-in">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              Welcome, {user?.username}
            </h1>
            <p className="text-gray-300">Your personalized social space ✨</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg shadow-lg transition duration-300 font-semibold"
          >
            Logout
          </button>
        </div>

        {/* Create Post */}
        <form
          onSubmit={handleCreatePost}
          className="bg-[#1f1b36] border border-purple-500 rounded-2xl p-6 shadow-xl transition hover:shadow-purple-800"
        >
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-4 bg-[#2d254f] text-white rounded-lg border border-purple-500 focus:ring-2 focus:ring-purple-400 outline-none transition"
            placeholder="Share your thoughts with the world..."
            rows={4}
          />
          <button
            type="submit"
            className="mt-4 bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg shadow-lg font-bold tracking-wide transition"
          >
            🚀 Post
          </button>
        </form>

        {/* Follow Users */}
        <div className="bg-[#1f1b36] rounded-2xl p-6 shadow-xl border border-indigo-500">
          <h2 className="text-2xl font-bold text-indigo-400 mb-4">💬 Follow Users</h2>
          <div className="flex flex-wrap gap-3">
            {allUsers
              .filter((u) => u.id !== parseInt(userId))
              .map((u) => (
                <button
                  key={u.id}
                  onClick={() => handleFollow(u.id)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full shadow-md transition"
                >
                  + {u.username}
                </button>
              ))}
          </div>
        </div>

        {/* Posts */}
        <div className="bg-[#1f1b36] rounded-2xl p-6 shadow-xl border border-pink-500">
          <h2 className="text-2xl font-bold text-pink-400 mb-4">📝 Recent Posts</h2>

          {posts.length === 0 ? (
            <p className="text-gray-400 italic">No posts to display yet.</p>
          ) : (
            posts.map((post) => (
              <div
                key={post.id}
                className="border-b border-gray-700 last:border-none py-4 flex justify-between items-start hover:bg-[#2a2548] px-2 rounded-md transition duration-200"
              >
                <div>
                  <p className="text-sm text-purple-300 font-semibold">@{post.username}</p>
                  <p className="text-white">{post.content}</p>
                </div>
                <button
                  onClick={() => handleLike(post.id)}
                  className="text-sm bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-full text-white shadow transition"
                >
                  👍 Like
                </button>
              </div>
            ))
          )}

          {/* Load More */}
          {hasMore && (
            <div className="text-center mt-6">
              <button
                onClick={() => setPage((prev) => prev + 1)}
                className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold shadow-lg hover:shadow-pink-600 transition"
              >
                🔄 Load More
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
