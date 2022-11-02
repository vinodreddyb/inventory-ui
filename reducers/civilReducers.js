import {CIVIL} from '../actionTypes'

const initialState = {
    civilTree: [],
    subTree: [],
    fields: [],
    error: null,
    loading:false,
    message: '',
  };

function getCivilTree(action,civilTree) {

    if(!action.payload.body) return civilTree;

    const trr = action.payload.body.map((n, i) => {
        return {
            key: n.id,
            label: n.name,
            leaf: false,
            path: n.path.slice(1,-1),
            id: n.id,
            supply: n.supply,
            install: n.install,
            unit: n.unit,
            quantity: n.quantity
        }
    });

    if(civilTree.length > 0) {
        const ss = trr[0].path.split(",");

        const ss1 = ss[ss.length-1]


        const cc = civilTree.map(pa=> {
         //   console.log("Matched " + pa.id + ":" +ss1,pa.id ===ss1)

            if(pa.id ===ss1) {
                pa['children'] = trr
            }
            return pa
        })
        console.log(JSON.stringify(cc))
        return cc
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
          case CIVIL.GET_ALL_TOP_TREE: {

              return {
                  ...state,
                  civilTree: getCivilTree(action, state.civilTree),
                  error: null
              }
          }
          case CIVIL.GET_SUB_TREE: {
              return {
                  ...state,
                  subTree: action.payload.body.map((n) => {
                      return {
                          key: n.id,
                          label: n.name,
                          leaf: false,
                          path: n.path.slice(1,-1),
                          id: n.id,
                          supply: n.supply,
                          install: n.install,
                          unit: n.unit,
                          quantity: n.quantity
                      }
                  }),
                  error: null
              }
          }
          case CIVIL.GET_FIELDS: {
              return {
                  ...state,
                  fields: action.payload.body,
                  error: null
              }
          }

          default: return state
      }
  }
  export default civilReducers
