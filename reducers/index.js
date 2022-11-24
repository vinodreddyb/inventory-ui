import {combineReducers} from "redux";
import authReducers from "./authReducers";
import civilReducers from "./civilReducers";


export default combineReducers({

  auth: authReducers,
    civil: civilReducers,


});
