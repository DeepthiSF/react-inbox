import { combineReducers } from "redux";
import ComposeFormReducer from "./ComposeFormReducer";
import messageApiResponseReducer from "./messageAPIResponsereducer";
//import starringMessageReducer from "./starringMessageReducer";
import selectAllMessagesReducer from './selectAllMessagesReducer'


const rootReducer = combineReducers({
    ApiResponse: messageApiResponseReducer,
    //starringMessage: starringMessageReducer
    areAllMessagesSelected : selectAllMessagesReducer,
    composeFormReducer: ComposeFormReducer
})

export default rootReducer;