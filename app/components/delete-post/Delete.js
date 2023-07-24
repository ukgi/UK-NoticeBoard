"use client";

import { Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import axios from "axios";

export default function Delete({ postId, author }) {
  function deleteHandler() {
    const result = confirm("삭제하시겠습니까?");
    if (result) {
      axios
        .delete(`/api/delete-post`, {
          data: {
            selectedPostId: postId,
            author,
          },
        }) //
        .then((res) => alert(res.data.message))
        .catch((err) => alert(err.response.data));
    }
  }
  return (
    <Button type="primary" danger style={buttonStyle} onClick={deleteHandler}>
      <DeleteOutlined />
    </Button>
  );
}

const buttonStyle = { position: "absolute", top: "25px", right: "20px" };
