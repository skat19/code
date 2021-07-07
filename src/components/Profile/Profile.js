import React from "react";
import MyPostsComponent from "./MyPosts/MyPostsComponent";
import ProfileInfo from "./ProfileInfo/ProfileInfo.js";
// import s from "./Profile.module.css";

const Profile = (props) => {
  return (
    <div className="">
      <ProfileInfo {...props} isOwner={props.isOwner} />
      <MyPostsComponent />
    </div>
  );
};

export default Profile;
