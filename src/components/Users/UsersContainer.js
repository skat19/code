import React from "react";
import { connect } from "react-redux";
import { followTC, getUsersTC, unfollowTC } from "../../redux/users-reducer";
import {
  getCurrentPage,
  getIsFetching,
  getIsFetchingBtn,
  getPageSize,
  getTotalCount,
  getUsers,
} from "../../redux/users-selectors";
import Preloader from "../common/Preloader/Preloader";
import Users from "./Users";

class UserComponent extends React.Component {
  componentDidMount() {
    this.props.getUsers();
  }
  onPageChanges = (currentPage) => {
    this.props.getUsers(currentPage);
  };
  render() {
    return (
      <div>
        {this.props.isFetching ? (
          <Preloader />
        ) : (
          <Users {...this.props} onPageChanges={this.onPageChanges} />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  users: getUsers(state),
  pageSize: getPageSize(state),
  totalCount: getTotalCount(state),
  currentPage: getCurrentPage(state),
  isFetching: getIsFetching(state),
  isFetchingBtn: getIsFetchingBtn(state),
});

export default connect(mapStateToProps, {
  follow: followTC,
  unfollow: unfollowTC,
  getUsers: getUsersTC,
})(UserComponent);
