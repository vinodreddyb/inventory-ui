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
export function addChildNode(data,path){
    const url = `${API_ENDPOINT}/civil/node/${path}`
    try {
        return httpRequest({method:'post',url:url,data:data})
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
        console.log("Error while adding subtree ", error)
    }
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
export function saveProgress(data){
    const url = `${API_ENDPOINT}/civil/status`
    return async dispatch => {
        try {
            dispatch({ type: CIVIL.LOADING })
            httpRequest({method:'post',url: url, data:data}).then((response) =>
                dispatch({type: CIVIL.SAVE_STATUS,payload: response.data}))
        }catch (error) {
            dispatch({type: CIVIL.GET_ALL_ERROR,payload: error.message })
        }
    };
}
export function getScurveGraph() {
    const url = `${API_ENDPOINT}/contract/scurve`
    console.log("UT", url)
    return async dispatch => {
        try {
            dispatch({ type: CIVIL.LOADING })
            httpRequest({url}).then((response) =>
                dispatch({type: CIVIL.GET_SCURVE,payload: response.data}))
        }catch (error) {
            dispatch({type: CIVIL.GET_SCURVE_ERROR,payload: error.message })
        }
    };
}
export function getContractSchedule() {
    const url = `${API_ENDPOINT}/contract/schedule`
    return async dispatch => {
        try {
            dispatch({ type: CIVIL.LOADING })
            httpRequest({url}).then((response) =>
                dispatch({type: CIVIL.GET_CONTRACT_SCHEDULE,payload: response.data}))
        }catch (error) {
            dispatch({type: CIVIL.GET_CONTRACT_SCHEDULE_ERROR,payload: error.message })
        }
    };
}
export function getContractProgresPie() {
    const url = `${API_ENDPOINT}/contract/piechart`
    return async dispatch => {
        try {
            dispatch({ type: CIVIL.LOADING })
            httpRequest({url}).then((response) =>
                dispatch({type: CIVIL.GET_CONTRACT_PIE,payload: response.data}))
        }catch (error) {
            dispatch({type: CIVIL.GET_CONTRACT_PIE_ERROR,payload: error.message })
        }
    };
}
export function dateToYMD(date) {
    const d = date.getDate();
    const m = date.getMonth() + 1; //Month from 0 to 11
    const y = date.getFullYear();
    return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
}
const civilActions = {
    getTopLevel: getTopLevel,
    getFields: getFields,
    getSubTree: getSubTree,
    setNodeValues: setNodeValues,
    addChildNode:addChildNode,
    getStatusGraph: getStatusGraph,
    dateToYMD:dateToYMD,
    saveProgress: saveProgress,
    getScurveGraph: getScurveGraph,
    getContractSchedule:getContractSchedule,
    getContractProgresPie:getContractProgresPie
}

export default civilActions;
