import { combineReducers } from "redux";
import messageApiResponseReducer from "./messageAPIResponsereducer";
//import starringMessageReducer from "./starringMessageReducer";
import selectAllMessagesReducer from './selectAllMessagesReducer'

const rootReducer = combineReducers({
    ApiResponse: messageApiResponseReducer,
    //starringMessage: starringMessageReducer
    areAllMessagesSelected : selectAllMessagesReducer
})

export default rootReducer;