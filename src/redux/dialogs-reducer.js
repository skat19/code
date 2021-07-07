const ADD_MESSAGE = "ADD-MESSAGE";

let initialState = {
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
};

const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      let item = {
        id: 4,
        message: action.message,
      };
      return { ...state, messages: [...state.messages, item] };
    default:
      return state;
  }
};

export const addMessageAC = (message) => ({ type: ADD_MESSAGE, message });

export default dialogsReducer;
