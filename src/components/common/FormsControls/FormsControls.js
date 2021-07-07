import React from "react";
import s from "./FormsControls.module.css";

export const FormControl = ({ ...meta }) => {
  //   debugger;
  let hasError = meta.touched && meta.error;

  return (
    <div className={s.form}>
      <div className={hasError && s.border}>{meta.children}</div>
      {hasError && <span>{meta.error}</span>}
    </div>
  );
};

export const Textarea = ({ input, meta, ...props }) => {
  return (
    <FormControl {...meta}>
      <textarea {...input} {...props} />
    </FormControl>
  );
};

export const Element =
  (Element) =>
  ({ input, meta, ...props }) => {
    let hasError = meta.touched && meta.error;

    return (
      <div className={s.form}>
        <div className={hasError && s.border}>
          <Element {...input} {...props} />
        </div>
        {hasError && <span>{meta.error}</span>}
      </div>
    );
  };
