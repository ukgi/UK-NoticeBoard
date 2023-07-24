import React from "react";

export default function Comment({ commentData }) {
  const { _id, comment, author, userEmail } = commentData;
  return (
    <li
      key={_id}
      style={{
        width: "800px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <p>{comment}</p>
      <div style={{ display: "flex", gap: "12px" }}>
        <span>{userEmail}</span>
        <span>{author}</span>
      </div>
    </li>
  );
}
