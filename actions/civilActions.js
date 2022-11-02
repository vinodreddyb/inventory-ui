import {CIVIL} from '../actionTypes'
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
export function getSubTree(path){
    const url = `${API_ENDPOINT}/civil?path=` + path
        try {
              return httpRequest({url})
                .then((response) => {
                    const data = response.data.body
                    if(data){
                        return data.map((n) => {
                            return {
                                key: n.id,
                                label: n.name,
                                leaf: false,
                                path: n.path.slice(1, -1),
                                id: n.id,
                                supply: n.supply,
                                install: n.install,
                                unit: n.unit,
                                quantity: n.quantity
                            }
                        })
                    }
                })
        }catch (error) {
          console.log("Error while fetching subtree ", error)
        }

}
export function getFields(){
    const url = `${API_ENDPOINT}/civil/fields`
    return async dispatch => {
        try {
            dispatch({ type: CIVIL.LOADING })
            httpRequest({url}).then((response) =>
                dispatch({type: CIVIL.GET_FIELDS,payload: response.data}))
        }catch (error) {
            dispatch({type: CIVIL.GET_ALL_ERROR,payload: error.message })
        }
    };
}

const civilActions = {
    getTopLevel: getTopLevel,
    getFields: getFields,
    getSubTree: getSubTree

}

export default civilActions;
