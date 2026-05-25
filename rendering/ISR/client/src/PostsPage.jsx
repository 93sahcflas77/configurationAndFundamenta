import { useEffect, useState } from "react";

import API from "./api";

export default function PostsPage() {
  const [posts, setPosts] = useState([]);

  async function fetchPosts() {
    const res = await API.get("/posts");

    setPosts(res.data.data);
  }

  useEffect(() => {
    fetchPosts();
  }, []);
 

  return (
    <div>
      <h1>ISR Posts</h1>

      {posts.slice(0, 10).map((post) => (
        <div
          key={post.id}
          style={{
            border: "1px solid gray",
            marginBottom: "10px",
            padding: "10px",
          }}
        >
          <h2>{post.title}</h2>

          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
}