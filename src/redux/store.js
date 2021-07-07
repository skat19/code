import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";

let store = {
  _state: {
    profilePage: {
      posts: [
        { id: 1, message: "how are you?", likeCount: 3 },
        { id: 2, message: "it's my first post", likeCount: 5 },
      ],
      postText: "",
    },
    messagesPage: {
      dialogs: [
        { id: 1, name: "dima" },
        { id: 2, name: "sasha" },
        { id: 3, name: "valera" },
      ],
      messages: [
        { id: 1, message: "hi" },
        { id: 2, message: "how are you?" },
        { id: 3, message: "what are you doing?" },
      ],
      messageText: "",
    },
  },

  getState() {
    return this._state;
  },

  subscribe(observer) {
    this._rerenderEntireTree = observer;
  },

  dispatch(action) {
    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.messagesPage = dialogsReducer(this._state.messagesPage, action);
    this._rerenderEntireTree(this._state);
  },

  _rerenderEntireTree() {},
};

export default store;
window.store = store;
