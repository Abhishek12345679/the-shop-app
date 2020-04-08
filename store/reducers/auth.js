import { AUTHENTICATE, LOG_OUT } from "../actions/auth";

const initialState = {
    token: null,
    userId: null,
    email: ""
};

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTHENTICATE:
            return {
                token: action.token,
                userId: action.userId,
                email: action.email
            };
        case LOG_OUT:
            return initialState;
            // case SIGN_IN:
            //     return {
            //         token: action.token,
            //         userId: action.userId,
            //         email: action.email
            //     };
        default:
            return state;
    }
};

export default AuthReducer;