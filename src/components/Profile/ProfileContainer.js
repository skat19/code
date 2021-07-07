import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import {
  getProfileTC,
  getStatusTC,
  savePhotoTC,
  saveProfileTC,
  updateStatusTC,
} from "../../redux/profile-reducer";
import Profile from "./Profile";

class ProfileContainer extends React.Component {
  refreshProfile() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = this.props.myId;
      if (!userId) {
        this.props.history.push("/login");
      }
    }
    this.props.getProfile(userId);
    this.props.getStatus(userId);
  }

  componentDidMount() {
    this.refreshProfile();
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.userId !== prevProps.match.params.userId) {
      this.refreshProfile();
    }
  }

  render() {
    return (
      <Profile {...this.props} isOwner={!this.props.match.params.userId} />
    );
  }
}

const mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  myId: state.auth.id,
});

export default compose(
  // withAuthRedirect,
  withRouter,
  connect(mapStateToProps, {
    getProfile: getProfileTC,
    getStatus: getStatusTC,
    updateStatus: updateStatusTC,
    savePhoto: savePhotoTC,
    saveProfile: saveProfileTC,
  })
)(ProfileContainer);
