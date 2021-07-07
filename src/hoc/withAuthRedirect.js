import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const mapStateToProps = (state) => ({
  isLogin: state.auth.isLogin,
});

export const withAuthRedirect = (Component) => {
  class RedirectComponent extends React.Component {
    render() {
      if (!this.props.isLogin) return <Redirect to="/login" />;
      return <Component {...this.props} />;
    }
  }
  return connect(mapStateToProps)(RedirectComponent);
};

export default withAuthRedirect;
