import React from "react";
import s from "./Post.module.css";

const Post = (props) => {
  return (
    <div className={s.postItem}>
      <span>
        {props.message} - like: {props.likeCount}
      </span>
    </div>
  );
};

export default Post;
