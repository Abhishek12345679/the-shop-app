import { AUTHENTICATE, LOG_OUT, DID_TRY_AL } from "../actions/auth";

const initialState = {
  token: null,
  userId: null,
  email: "",
  didTryAutoLogin: false,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId,
        email: action.email,
        didTryAutoLogin: true,
      };
    case DID_TRY_AL:
      return {
        ...state,
        didTryAutoLogin: true,
      };
    case LOG_OUT:
      return {
        ...initialState,
        didTryAutoLogin: true,
      };
    default:
      return state;
  }
};

export default AuthReducer;
