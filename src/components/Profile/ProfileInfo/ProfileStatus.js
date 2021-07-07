import React from "react";

class ProfileStatus extends React.Component {
  state = {
    editMode: false,
    status: this.props.status,
  };

  activateEditMode() {
    this.setState({
      editMode: true,
    });
  }

  deactivateEditMode = () => {
    this.setState({
      editMode: false,
    });
    this.props.updateStatus(this.state.status);
  };

  updateStatus = (e) => {
    this.setState({ status: e.target.value });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.status !== this.props.status) {
      this.setState({
        status: this.props.status,
      });
    }
  }

  render() {
    return (
      <span className="">
        {this.state.editMode ? (
          <input
            onChange={this.updateStatus}
            autoFocus="true"
            onBlur={this.deactivateEditMode}
            value={this.state.status}
          />
        ) : (
          <span onDoubleClick={this.activateEditMode.bind(this)}>
            {this.props.status || "-----"}
          </span>
        )}
      </span>
    );
  }
}

export default ProfileStatus;
