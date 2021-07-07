import React from "react";
import { connect } from "react-redux";
import { logoutTC } from "../../redux/auth-reducer";
import Header from "./Header";

class HeaderContainer extends React.Component {
  render() {
    return <Header {...this.props} />;
  }
}

const mapStateToProps = (state) => ({
  login: state.auth.login,
  isLogin: state.auth.isLogin,
});

export default connect(mapStateToProps, { logout: logoutTC })(HeaderContainer);
