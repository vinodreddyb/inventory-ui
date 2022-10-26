import {AUTH_ACTIONS, MARKET_PLACE} from '../actionTypes'
import httpRequest from '../utils/httpRequest'
import {API_ENDPOINT} from "../constants/config";

export function signIn(sdata){
    const url = `${API_ENDPOINT}/api/auth/signin`
    return async dispatch => {
        try {
            httpRequest({method:"post",url, data: sdata}).then((response) =>
                dispatch({type: AUTH_ACTIONS.LOGIN_SUCCESS,payload: response.data}))
        }catch (error) {
            dispatch({type: MARKET_PLACE.MARKET_ERROR,payload: error.message })
        }
    };
}

export function sendToken(token) {
    const url = `${API_ENDPOINT}/pnotification/register`
    return async dispatch => {
        try {
            httpRequest({method:"post",url, data: token}).then((response) =>
                dispatch({type: AUTH_ACTIONS.TOKEN_REG_SUCCESS,payload: response.data}))
        }catch (error) {
            dispatch({type: AUTH_ACTIONS.TOKEN_REG_ERROR,payload: error.message })
        }
    };
}

export function signOut(){

    const url = `${API_ENDPOINT}/auth/logout`
    return async dispatch => {
        try {
            httpRequest({url}).then((response) =>
                dispatch({type: AUTH_ACTIONS.SIGN_OUT,payload: response.data}))
                .then(()=>window.location="/")
        }catch (error) {
            dispatch({type: AUTH_ACTIONS.SIGN_OUT_ERROR,payload: error.message })
        }
    };

}
const authActions = {
    login: signIn,
    logout: signOut,
    sendToken: sendToken
}

export default authActions;
