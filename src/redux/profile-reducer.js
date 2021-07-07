import { stopSubmit } from "redux-form";
import { profileAPI, usersAPI } from "../api/api";

const ADD_POST = "ADD-POST";
const SET_PROFILE = "SET-PROFILE";
const SET_STATUS = "SET-STATUS";
const SAVE_PHOTO = "SAVE-PHOTO";

let initialState = {
  posts: [
    { id: 1, message: "how are you?", likeCount: 3 },
    { id: 2, message: "it's my first post", likeCount: 5 },
  ],
  profile: null,
  status: null,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      let item = {
        id: 3,
        message: action.text,
        likeCount: 3,
      };
      return { ...state, posts: [...state.posts, item] };
    }
    case SET_PROFILE: {
      return { ...state, profile: action.profile };
    }
    case SET_STATUS: {
      return { ...state, status: action.status };
    }
    case SAVE_PHOTO: {
      return { ...state, profile: { ...state.profile, photos: action.photos } };
    }
    default:
      return state;
  }
};

export const addPostAC = (text) => ({ type: ADD_POST, text });
export const setProfileAC = (profile) => ({ type: SET_PROFILE, profile });
export const setStatusAC = (status) => ({ type: SET_STATUS, status });
export const savePhotoAC = (photos) => ({ type: SAVE_PHOTO, photos });

export const getProfileTC = (userId) => (dispatch) => {
  usersAPI.getProfile(userId).then((data) => {
    dispatch(setProfileAC(data));
  });
};

export const getStatusTC = (userId) => (dispatch) => {
  profileAPI.getStatus(userId).then((data) => {
    dispatch(setStatusAC(data));
  });
};

export const updateStatusTC = (status) => (dispatch) => {
  profileAPI.updateStatus(status).then((data) => {
    if (data.resultCode === 0) {
      dispatch(setStatusAC(status));
    }
  });
};

export const savePhotoTC = (file) => async (dispatch) => {
  let data = await profileAPI.savePhoto(file);
  if (data.resultCode === 0) {
    dispatch(savePhotoAC(data.data.photos));
  }
};

export const saveProfileTC = (profile) => async (dispatch, getState) => {
  let data = await profileAPI.saveProfile(profile);
  let id = getState().auth.id;
  // debugger;
  if (data.resultCode === 0) {
    dispatch(getProfileTC(id));
  } else {
    // debugger;
    let er = data.messages[0] || "some error";
    dispatch(stopSubmit("editProfile", { _error: er }));
    return Promise.reject(er);
  }
};

export default profileReducer;
