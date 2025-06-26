// components/FollowButton.js
import { useEffect, useState } from "react";

export default function FollowButton({ currentUserId }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("http://localhost:5000/users");
      const data = await res.json();
      setUsers(data.filter((u) => u.id !== currentUserId));
    };
    fetchUsers();
  }, [currentUserId]);

  const followUser = async (targetId) => {
    const res = await fetch("http://localhost:5000/api/follow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ followerId: currentUserId, followingId: targetId }),
    });
    const data = await res.json();
    if (!res.ok) alert(data.error);
  };

  return (
    <div className="space-y-3">
      {users.map((u) => (
        <div key={u.id} className="flex justify-between items-center">
          <span>@{u.username}</span>
          <button
            onClick={() => followUser(u.id)}
            className="px-3 py-1 bg-pink-500 text-white rounded hover:bg-pink-600"
          >
            Follow
          </button>
        </div>
      ))}
    </div>
  );
}
