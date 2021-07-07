import React from "react";
import { Field, reduxForm } from "redux-form";
import { Element } from "../../common/FormsControls/FormsControls";
// import { Contact } from "./ProfileInfo";

let Input = Element("input");
let TextArea = Element("textarea");

const ProfileForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <button>save</button>
      </div>
      {props.error && <div>{props.error}</div>}
      <div className="">
        <b>id</b>: {props.profile.userId}
      </div>
      <div className="">
        <b>Full name</b>:{" "}
        <Field component={Input} name="fullName" placeholder="full name" />
      </div>
      <div className="">
        <b>About me</b>:{" "}
        <Field component={TextArea} name="aboutMe" placeholder="about me" />
      </div>
      <div className="">
        <b>lookingForAJob</b>:{" "}
        <Field
          component={Input}
          type="checkbox"
          name="lookingForAJob"
          placeholder="are you looking for a job"
        />
      </div>
      <div className="">
        <b>My professional skills</b>:{" "}
        <Field
          component={TextArea}
          name="lookingForAJobDescription"
          placeholder="professional skills"
        />
      </div>
      <div className="">
        <b>Contacts</b>:{" "}
        {Object.keys(props.profile.contacts).map((key) => {
          return (
            <div>
              <b>{key}</b>:{" "}
              <Field
                component={Input}
                name={`contacts.${key}`}
                placeholder={key}
              />
            </div>
          );
        })}
      </div>
    </form>
  );
};

const ProfileDataForm = reduxForm({ form: "editProfile" })(ProfileForm);

export default ProfileDataForm;
