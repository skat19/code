import React from "react";
import { Field, reduxForm } from "redux-form";
import { maxLengthCreator, required } from "../../utils/validators/validators";
import { Element } from "../common/FormsControls/FormsControls";
import DialogItem from "./DialogItem/DialogItem";
import s from "./Dialogs.module.css";
import Message from "./Message/Message";

let maxLength10 = maxLengthCreator(10);
let Textarea = Element("textarea");

const addMessageForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div className="">
        <Field
          component={Textarea}
          validate={[required, maxLength10]}
          name="message"
          placeholder="text post..."
        />
      </div>
      <div className="">
        <button>send</button>
      </div>
    </form>
  );
};

let ReduxAddMessageForm = reduxForm({ form: "dialogs" })(addMessageForm);

const Dialogs = (props) => {
  let dialogsElements = props.dialogs.map((el) => (
    <DialogItem name={el.name} id={el.id} />
  ));

  let messagesElements = props.messages.map((el) => (
    <Message message={el.message} />
  ));

  let onSubmit = (data) => {
    props.addMessage(data.message);
  };

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>{dialogsElements}</div>
      <div className={s.messages}>
        <div className="">{messagesElements}</div>
        <div className={s.inputMessage}>
          <div className="">
            <ReduxAddMessageForm onSubmit={onSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dialogs;
