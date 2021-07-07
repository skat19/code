import React from "react";
import s from "./ProfileInfo.module.css";
import Preloader from "../../common/Preloader/Preloader";
import garf from "../../../assets/images/garf.jpg";
// import ProfileStatus from "./ProfileStatus";
import ProfileStatusWhitHooks from "./ProfileStatusWithHooks";
import { useState } from "react";
import ProfileDataForm from "./ProfileDataForm";

const ProfileInfo = (props) => {
  let [editMode, setEditMode] = useState(false);

  const changePhoto = (e) => {
    if (e.target.files) props.savePhoto(e.target.files[0]);
  };

  const onSubmit = (data) => {
    props.saveProfile(data).then(() => {
      setEditMode(false);
    });
    debugger;
  };

  if (!props.profile) {
    return <Preloader />;
  }
  return (
    <div className={s.profile}>
      <div className="">
        <img
          src={props.profile.photos.small ? props.profile.photos.small : garf}
          alt=""
        />
        <div className="">
          {props.isOwner && <input type="file" onChange={changePhoto} />}
        </div>
      </div>

      <div className={s.profileInfo}>
        {editMode ? (
          <ProfileDataForm
            initialValues={props.profile}
            profile={props.profile}
            onSubmit={onSubmit}
          />
        ) : (
          <ProfileData
            profile={props.profile}
            isOwner={props.isOwner}
            onEditMode={() => {
              setEditMode(true);
            }}
          />
        )}

        <div className="">
          status:{" "}
          <ProfileStatusWhitHooks
            status={props.status}
            updateStatus={props.updateStatus}
          />
        </div>
      </div>
    </div>
  );
};

const ProfileData = (props) => {
  return (
    <div>
      {props.isOwner && (
        <div>
          <button onClick={props.onEditMode}>edit</button>
        </div>
      )}
      <div className="">
        <b>id</b>: {props.profile.userId}
      </div>
      <div className="">
        <b>Full name</b>: {props.profile.fullName}
      </div>
      <div className="">
        <b>About me</b>:{" "}
        {props.profile.aboutMe ? props.profile.aboutMe : "-----"}
      </div>
      <div className="">
        <b>lookingForAJob</b>: {props.profile.lookingForAJob ? "yes" : "no"}
      </div>
      {props.profile.lookingForAJob && (
        <div className="">
          <b>My professional skills</b>:{" "}
          {props.profile.lookingForAJobDescription}
        </div>
      )}
      <div className="">
        <b>Contacts</b>:{" "}
        {Object.keys(props.profile.contacts).map((key) => {
          return (
            <Contact
              key={key}
              contactTitle={key}
              contactValue={props.profile.contacts[key]}
            />
          );
        })}
      </div>
    </div>
  );
};

export const Contact = ({ contactTitle, contactValue }) => {
  return (
    <div className={s.contacts}>
      <b>{contactTitle}:</b> {contactValue}
    </div>
  );
};

export default ProfileInfo;
