// import React from "react";
import { connect } from "react-redux";
import { addPostAC } from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";

const mapStateToProps = (state) => ({
  posts: state.profilePage.posts,
  postText: state.profilePage.postText,
});

const mapDispatchToProps = (dispatch) => ({
  addPost: (t) => {
    dispatch(addPostAC(t));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MyPosts);
