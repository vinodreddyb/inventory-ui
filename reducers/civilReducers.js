import {CIVIL} from '../actionTypes'

const initialState = {
    civilTree: [],
    error: null,
    loading:false,
    message: '',
  };

function getCivilTree(action,civilTree) {

    const trr = action.payload.body.map((n, i) => {
        return {
            key: n.id,
            label: n.name,
            'leaf': false,
            'path': n.path.slice(1,-1),
            'id': n.id
        }
    });

    if(civilTree.length > 0) {
        const ss = trr[0].path.split(",");
        const ss1 = ss[ss.length-1]
        return civilTree.map(pa=> {
            if(pa.id ===ss1) {
                pa['children'] = trr
            }
            return pa
        })

    } else {
        return trr
    }

}

const civilReducers = (state = initialState, action)=>{
      switch(action.type){
          case 'LOADING' : {
              return {
                  ...state,

                  loading:true,
                  error:null,
                  message: null
              }
          }
          case CIVIL.GET_ALL_TOP_TREE:

          return {
              ...state,
              civilTree: getCivilTree(action,state.civilTree),
              error:null
          }

          default: return state
      }
  }
  export default civilReducers
