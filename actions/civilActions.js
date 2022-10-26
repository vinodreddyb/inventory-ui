import {CIVIL, PLAYLIST_ACTIONS} from '../actionTypes'
import httpRequest from '../utils/httpRequest'
import {API_ENDPOINT} from "../constants/config";




export function getTopLevel(path){
    const url = `${API_ENDPOINT}/civil?path=` + path
    return async dispatch => {
        try {
            dispatch({ type: CIVIL.LOADING })
            httpRequest({url}).then((response) =>
                dispatch({type: CIVIL.GET_ALL_TOP_TREE,payload: response.data}))
        }catch (error) {
            dispatch({type: CIVIL.GET_ALL_ERROR,payload: error.message })
        }
    };
}

const civilActions = {
    getTopLevel: getTopLevel,

}

export default civilActions;
