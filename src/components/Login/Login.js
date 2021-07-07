import React from "react";
import s from "./Login.module.css";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { loginTC } from "../../redux/auth-reducer";
import { maxLengthCreator, required } from "../../utils/validators/validators";
import { Element } from "../common/FormsControls/FormsControls";

let maxLength20 = maxLengthCreator(20);
let Input = Element("input");

const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div className="">
        <Field
          component={Input}
          validate={[required, maxLength20]}
          name="login"
          placeholder="login"
        />
      </div>
      <div className="">
        <Field
          component={Input}
          validate={[required, maxLength20]}
          name="password"
          placeholder="password"
        />
      </div>
      <div className="">
        <Field component={Input} name="rememberMe" type="checkbox" /> remember
        me
      </div>
      {props.error && props.anyTouched && (
        <div className={s.er}>{props.error}</div>
      )}
      <div className="">
        <button>send</button>
      </div>
    </form>
  );
};

const ReduxLoginForm = reduxForm({ form: "login" })(LoginForm);

const Login = (props) => {
  let onSubm = (data) => {
    let { login, password, rememberMe } = data;
    props.login(login, password, rememberMe);
  };

  if (props.isLogin) return <Redirect to="/profile" />;

  return (
    <div>
      <h3>Login</h3>
      <ReduxLoginForm onSubmit={onSubm} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  isLogin: state.auth.isLogin,
});

export default connect(mapStateToProps, { login: loginTC })(Login);
