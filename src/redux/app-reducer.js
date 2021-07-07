import { setAuthTC } from "./auth-reducer";

const INITIALIZED = "INITIALIZED";

let initialState = {
  initialized: false,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZED:
      return { ...state, initialized: true };
    default:
      return state;
  }
};

export const appInitializedAC = () => ({ type: INITIALIZED });

export const appInitializedTC = () => (dispatch) => {
  let prom = dispatch(setAuthTC());
  Promise.all([prom]).then((response) => {
    dispatch(appInitializedAC());
  });
};

export default appReducer;
