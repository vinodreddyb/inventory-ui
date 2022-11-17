import {CIVIL} from '../actionTypes'

const initialState = {
    civilTree: [],
    subTree: [],
    fields: [],
    error: null,
    loading:false,
    message: '',
    updateNodeValues: false,
    status: {},
    tenderTree:[],
    nonTenderTree:[],
  };

function getCivilTree(action,civilTree) {

    if(!action.payload.body) return civilTree;

    const trr = action.payload.body.map((n) => {
        return {
            ...n,
            key: n.id,
            label: n.name,
            leaf: false,
            path: n.path.slice(1,-1),
            startDate: new Date(n.startDate),
            endDate: new Date(n.endDate)
        }
    });

    if(civilTree.length > 0) {
        const ss = trr[0].path.split(",");
        const ss1 = ss[ss.length-1]
        return civilTree.map(pa => {
            //   console.log("Matched " + pa.id + ":" +ss1,pa.id ===ss1)

            if (pa.id === ss1) {
                pa['children'] = trr
            }
            return pa
        })
    } else {
        return trr
    }


}
function groupByKey(array, key) {
    return array
        .reduce((hash, obj) => {
            if(obj[key] === undefined) return hash;
            return Object.assign(hash, { [obj[key]]:( hash[obj[key]] || [] ).concat(obj)})
        }, {})
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
              let ct= getCivilTree(action, state.civilTree)
              let gr = groupByKey(ct,"type");
              return {
                  ...state,
                  civilTree: getCivilTree(action, state.civilTree),
                  tenderTree: gr["TENDER"],
                  nonTenderTree: gr["NON-TENDER"],
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
                  loading: false,
                  error: null
              }
          }
          case CIVIL.UPDATE_VALUES: {
              return {
                  ...state,
                  message: 'Update Successfully',
                  updateNodeValues: true,
                  loading: false,
                  error: null
              }
          }
          case CIVIL.GET_STATUS : {
             return {
                 ...state,
                 status: action.payload.body,
                 loading: false,
                 error: null
             }

          }

          default: return state
      }
  }
  export default civilReducers
