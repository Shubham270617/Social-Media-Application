"use client";
// components/PostForm.js
import { useState } from "react";

export default function PostForm({ userId, onPostCreated }) {
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, content }),
    });

    const data = await res.json();
    if (res.ok) {
      setContent("");
      onPostCreated();
    } else {
      alert(data.error || "Error creating post");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-4 rounded-lg border border-gray-300 text-black focus:ring-2 focus:ring-indigo-400"
        placeholder="What's on your mind?"
        required
      />
      <button
        type="submit"
        className="px-6 py-2 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600"
      >
        Post
      </button>
    </form>
  );
}
