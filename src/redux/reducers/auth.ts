import { DEPOSITALERT, DERQUIZALERT, ISDEPOSITACTIVE, ISLOGGED_IN, LOGIN_FAIL, LOGIN_LOADING, LOGIN_SUCCESS, LOGOUT_USER } from "../actions/types";

const initialState =  {
  isLoggedIn: false, 
  data: {},
  error: null,
  loading: false,
  depositAlert:false,
  derQuizAlert: false,
  isDepositPage:false
};


const authReducer = (state = initialState, {type, payload}:any) => {
  switch (type) {
    case ISLOGGED_IN:
      return {
        ...state,
        isLoggedIn: payload,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
    };
    case LOGOUT_USER:
      return {
        ...state,
        isLoggedIn: false,
      };
    case DEPOSITALERT:
      return {
        ...state,
        depositAlert: payload,
    };
    case DERQUIZALERT:
      return {
      ...state,
      derQuizAlert : payload,
    };
    
    case ISDEPOSITACTIVE:
      return {
        ...state,
        isDepositPage: payload,
    };
    default:
      return state;
  }
};

export default authReducer;
