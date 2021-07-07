import React from "react";
import Post from "./Post/Post";
import s from "./MyPosts.module.css";
import { Field, reduxForm } from "redux-form";
import {
  maxLengthCreator,
  required,
} from "../../../utils/validators/validators";
import { Element } from "../../common/FormsControls/FormsControls";

let maxLength10 = maxLengthCreator(10);
let Textarea = Element("textarea");

const addPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div className="">
        <Field
          component={Textarea}
          name="textPost"
          placeholder="text post..."
          validate={[required, maxLength10]}
        />
      </div>
      <div className="">
        <button>send</button>
      </div>
    </form>
  );
};

const ReduxAddPostForm = reduxForm({ form: "posts" })(addPostForm);

const MyPosts = React.memo((props) => {
  let postsElements = props.posts.map((el) => (
    <Post message={el.message} likeCount={el.likeCount} />
  ));

  let addPost = (data) => {
    props.addPost(data.textPost);
  };

  return (
    <div className="">
      <h3>My posts</h3>
      <div className={s.textInput}>
        <div className="">
          <ReduxAddPostForm onSubmit={addPost} />
        </div>
      </div>
      <div className={s.posts}>{postsElements}</div>
    </div>
  );
});

export default MyPosts;
