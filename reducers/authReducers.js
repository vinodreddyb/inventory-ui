import {AUTH_ACTIONS} from '../actionTypes'
import jwt_decode from "jwt-decode";

const initialState = {
    login: [],
    token: '',
    refreshToken: '',
    error: null,
    loading:true,
    userName:'',
    roles:[],
    message: ''
  };

  const authReducers = (state = initialState, action)=>{
      switch(action.type){
          case 'LOADING' : {
              return {
                  ...state,

                  loading:true,
                  error:null
              }
          }
          case AUTH_ACTIONS.LOGIN_SUCCESS:
              const jwt = jwt_decode(action.payload.token);
              console.log("JWT: " + JSON.stringify(jwt))
              localStorage.setItem("token", action.payload.token);
              localStorage.setItem("userName", jwt.sub);
              localStorage.setItem("refreshToken", action.payload.refreshToken);
              localStorage.setItem("roles", JSON.stringify(jwt.scopes));
              localStorage.setItem("user", action.payload.user)
          return {
              ...state,
              userName: jwt.sub,
              roles: jwt.scopes,
              token:action.payload.token,
              refreshToken:action.payload.refreshToken,
              error:null
          }
          case AUTH_ACTIONS.SIGN_OUT:
              localStorage.removeItem("token");
              localStorage.removeItem("userName");
              localStorage.removeItem("refreshToken");
              localStorage.removeItem("roles");
              localStorage.removeItem("user")
          case AUTH_ACTIONS.SIGN_OUT_ERROR:
              localStorage.removeItem("token");
              localStorage.removeItem("userName");
              localStorage.removeItem("refreshToken");
              localStorage.removeItem("roles");
              localStorage.removeItem("user")
          case AUTH_ACTIONS.TOKEN_REG_SUCCESS: {
              return {
                  message: action.payload.body,
                  error: null,
                  loading:false,
              }
          }
          case AUTH_ACTIONS.TOKEN_REG_ERROR: {
              return {
                  error: action.payload,
                  loading:false,
              }
          }
          default: return state
      }
  }
  export default authReducers
