import { stopSubmit } from "redux-form";
import { authAPI } from "../api/api";

const SET_AUTH = "SET-AUTH";

let initialState = {
  id: null,
  email: null,
  login: null,
  isLogin: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH:
      return { ...state, ...action.data };
    default:
      return state;
  }
};

export const setAuthAC = (id, login, email, isLogin) => ({
  type: SET_AUTH,
  data: { id, login, email, isLogin },
});

export const setAuthTC = () => (dispatch) => {
  return authAPI.me().then((data) => {
    let { id, email, login } = data.data;
    if (data.resultCode === 0) {
      dispatch(setAuthAC(id, login, email, true));
    }
  });
};

export const loginTC =
  (email, password, rememberMe = false) =>
  (dispatch) => {
    authAPI.login(email, password, rememberMe).then((data) => {
      if (data.resultCode === 0) {
        dispatch(setAuthTC());
      } else {
        let textErr = data.messages[0];
        dispatch(stopSubmit("login", { _error: textErr }));
      }
    });
  };

export const logoutTC = () => (dispatch) => {
  authAPI.logout().then((data) => {
    if (data.resultCode === 0) {
      dispatch(setAuthAC(null, null, null, false));
    }
  });
};

export default authReducer;
