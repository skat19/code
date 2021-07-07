import { usersAPI } from "../api/api";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET-USERS";
const SET_TOTAL_COUNT = "SET-TOTAL-COUNT";
const SET_CURRENT_PAGE = "SET-CURRENT-PAGE";
const SET_FETCHING = "SET-FETCHING";
const SET_FETCHING_BTN = "SET-FETCHING-BTN";

let initialState = {
  users: [],
  pageSize: 5,
  totalCount: 0,
  currentPage: 1,
  isFetching: false,
  isFetchingBtn: [],
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: state.users.map((e) => {
          if (action.id === e.id) {
            return { ...e, followed: true };
          }
          return e;
        }),
      };
    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map((e) => {
          if (action.id === e.id) {
            return { ...e, followed: false };
          }
          return e;
        }),
      };
    case SET_USERS:
      return {
        ...state,
        users: action.users,
      };
    case SET_TOTAL_COUNT:
      return { ...state, totalCount: action.totalCount };
    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.currentPage };
    case SET_FETCHING:
      return { ...state, isFetching: action.isFetching };
    case SET_FETCHING_BTN:
      return {
        ...state,
        isFetchingBtn: action.isFetchingBtn
          ? [...state.isFetchingBtn, action.userId]
          : state.isFetchingBtn.filter((el) => el !== action.userId),
      };
    default:
      return state;
  }
};

export const followAC = (id) => ({ type: FOLLOW, id });
export const unfollowAC = (id) => ({
  type: UNFOLLOW,
  id,
});
export const setUsersAC = (users) => ({ type: SET_USERS, users });
export const setTotalCountAC = (totalCount) => ({
  type: SET_TOTAL_COUNT,
  totalCount,
});
export const setCurrentPageAC = (currentPage) => ({
  type: SET_CURRENT_PAGE,
  currentPage,
});
export const setFetchingAC = (isFetching) => ({
  type: SET_FETCHING,
  isFetching,
});
export const setFetchingBtnAC = (isFetchingBtn, userId) => ({
  type: SET_FETCHING_BTN,
  isFetchingBtn,
  userId,
});

export const getUsersTC =
  (currentPage = 1) =>
  (dispatch) => {
    dispatch(setFetchingAC(true));
    usersAPI.getUsers(currentPage, initialState.pageSize).then((data) => {
      dispatch(setFetchingAC(false));
      dispatch(setCurrentPageAC(currentPage));
      dispatch(setUsersAC(data.items));
      dispatch(setTotalCountAC(data.totalCount));
    });
  };

export const followTC = (userId) => (dispatch) => {
  dispatch(setFetchingBtnAC(true, userId));
  usersAPI.follow(userId).then((data) => {
    if (data.resultCode === 0) {
      dispatch(followAC(userId));
    }
    dispatch(setFetchingBtnAC(false, userId));
  });
};

export const unfollowTC = (userId) => (dispatch) => {
  dispatch(setFetchingBtnAC(true, userId));
  usersAPI.unfollow(userId).then((data) => {
    if (data.resultCode === 0) {
      dispatch(unfollowAC(userId));
    }
    dispatch(setFetchingBtnAC(false, userId));
  });
};

export default usersReducer;
