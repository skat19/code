import React from "react";
import { connect } from "react-redux";
import { HashRouter, Route } from "react-router-dom";
import "./App.css";
import Preloader from "./components/common/Preloader/Preloader";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import ProfileContainer from "./components/Profile/ProfileContainer";
import UsersContainer from "./components/Users/UsersContainer";
import withSuspense from "./hoc/withSuspense";
import { appInitializedTC } from "./redux/app-reducer";

const DialogsContainer = React.lazy(() =>
  import(`./components/Dialogs/DialogsContainer`)
);

class App extends React.Component {
  componentDidMount() {
    this.props.appInitialized();
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />;
    }

    return (
      <HashRouter>
        <div className=""></div>
        <div className="App">
          <HeaderContainer />
          <Navbar />
          <div className="content">
            <Route
              path="/profile/:userId?"
              render={() => <ProfileContainer />}
            />
            <Route path="/dialogs" render={withSuspense(DialogsContainer)} />
            <Route path="/users" render={() => <UsersContainer />} />
            <Route path="/login" render={() => <Login />} />
          </div>
        </div>
      </HashRouter>
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
});

export default connect(mapStateToProps, { appInitialized: appInitializedTC })(
  App
);
