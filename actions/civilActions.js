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
                                ...n,
                                key: n.id,
                                label: n.name,
                                leaf: false,
                                path: n.path.slice(1, -1),
                                startDate: new Date(n.startDate),
                                endDate: new Date(n.endDate)

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

export function setNodeValues(data){
    const url = `${API_ENDPOINT}/civil/node/values`
    return async dispatch => {
        try {
            dispatch({ type: CIVIL.LOADING })
            httpRequest({method:'put',url: url, data:data}).then((response) =>
                dispatch({type: CIVIL.UPDATE_VALUES,payload: response.data}))
        }catch (error) {
            dispatch({type: CIVIL.GET_ALL_ERROR,payload: error.message })
        }
    };
}
export function getStatusGraph(nodeId){
    const url = `${API_ENDPOINT}/civil/status/${nodeId}?graph=true`
    try {
        return httpRequest({url})
            .then((response) => response.data.body)
    }catch (error) {
        console.log("Error while fetching subtree ", error)
    }
}
const civilActions = {
    getTopLevel: getTopLevel,
    getFields: getFields,
    getSubTree: getSubTree,
    setNodeValues: setNodeValues,
    getStatusGraph: getStatusGraph

}

export default civilActions;
