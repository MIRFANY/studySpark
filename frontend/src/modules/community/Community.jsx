import React, { useState } from "react";
import "./Community.css";

const initialPosts = [
  {
    id: 1,
    user: "Alex",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    content: "What are your best tips for memorizing medical mnemonics?",
    comments: [
      { user: "Sam", text: "I use flashcards and spaced repetition!" },
      { user: "Priya", text: "Mnemonics + mind maps work for me." },
    ],
  },
  {
    id: 2,
    user: "Priya",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    content: "Share your favorite study resources!",
    comments: [],
  },
];

export default function Community() {
  const [posts, setPosts] = useState(initialPosts);
  const [newPost, setNewPost] = useState("");
  const [comment, setComment] = useState("");
  const [activePost, setActivePost] = useState(null);

  const handleAddPost = () => {
    if (newPost.trim()) {
      setPosts([
        {
          id: Date.now(),
          user: "You",
          avatar: "https://randomuser.me/api/portraits/men/99.jpg",
          content: newPost,
          comments: [],
        },
        ...posts,
      ]);
      setNewPost("");
    }
  };

  const handleAddComment = (postId) => {
    if (comment.trim()) {
      setPosts(
        posts.map((post) =>
          post.id === postId
            ? {
                ...post,
                comments: [...post.comments, { user: "You", text: comment }],
              }
            : post
        )
      );
      setComment("");
      setActivePost(null);
    }
  };

  return (
    <div className="community-bg">
      <div className="community-container">
        <h2 className="community-title">Community</h2>
        <div className="community-newpost">
          <textarea
            placeholder="Share something with the community..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
          />
          <button onClick={handleAddPost}>Post</button>
        </div>
        <div className="community-posts">
          {posts.map((post) => (
            <div className="community-post" key={post.id}>
              <div className="community-post-header">
                <img
                  src={post.avatar}
                  alt="avatar"
                  className="community-avatar"
                />
                <span className="community-user">{post.user}</span>
              </div>
              <div className="community-post-content">{post.content}</div>
              <div className="community-comments">
                {post.comments.map((c, i) => (
                  <div className="community-comment" key={i}>
                    <span className="community-comment-user">{c.user}:</span>{" "}
                    {c.text}
                  </div>
                ))}
                {activePost === post.id ? (
                  <div className="community-addcomment">
                    <input
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Add a comment..."
                    />
                    <button onClick={() => handleAddComment(post.id)}>
                      Send
                    </button>
                  </div>
                ) : (
                  <button
                    className="community-comment-btn"
                    onClick={() => setActivePost(post.id)}
                  >
                    Comment
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
