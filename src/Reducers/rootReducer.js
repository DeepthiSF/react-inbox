import { combineReducers } from "redux";
import messageApiResponseReducer from "./messageAPIResponsereducer";
//import starringMessageReducer from "./starringMessageReducer";

const rootReducer = combineReducers({
    ApiResponse: messageApiResponseReducer,
    //starringMessage: starringMessageReducer
})

export default rootReducer;