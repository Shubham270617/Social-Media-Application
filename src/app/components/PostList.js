// PostList.js
export default function PostList({ userId, posts, onLike }) {
  const likePost = async (postId) => {
    const res = await fetch(`http://localhost:5000/api/posts/${postId}/like`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });

    const data = await res.json();
    if (res.ok && typeof onLike === "function") {
      onLike(); // Trigger re-fetch in parent if needed
    } else {
      alert(data.error || "Error liking post");
    }
  };

  return (
    <div className="space-y-6">
      {posts.length === 0 ? (
        <p className="text-white/80">No posts yet.</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="p-6 rounded-xl bg-white/20 shadow-lg text-white">
            <p className="text-lg font-bold">@{post.username}</p>
            <p className="mt-2 text-white/90">{post.content}</p>
            <button
              onClick={() => likePost(post.id)}
              className="mt-3 text-sm text-sky-200 hover:underline"
            >
              Like
            </button>
          </div>
        ))
      )}
    </div>
  );
}
