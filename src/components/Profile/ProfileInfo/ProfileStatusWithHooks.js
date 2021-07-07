import React, { useEffect, useState } from "react";

const ProfileStatusWhitHooks = (props) => {
  let [editMode, setState] = useState(false);
  let [status, setStatus] = useState(props.status);

  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  let activateEditMode = () => {
    setState(true);
  };

  let deactivateEditMode = () => {
    setState(false);
    props.updateStatus(status);
  };

  let updateStatus = (e) => {
    setStatus(e.target.value);
  };

  return (
    <span className="">
      {editMode ? (
        <input
          autoFocus="true"
          onBlur={deactivateEditMode}
          onChange={updateStatus}
          value={status}
        />
      ) : (
        <span onDoubleClick={activateEditMode}>{props.status || "-----"}</span>
      )}
    </span>
  );
};

export default ProfileStatusWhitHooks;
