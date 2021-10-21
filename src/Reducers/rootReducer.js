import { combineReducers } from "redux";
import ComposeFormReducer from "./ComposeFormReducer";
import messageApiResponseReducer from "./messageAPIResponsereducer";
//import starringMessageReducer from "./starringMessageReducer";
import selectAllMessagesReducer from './selectAllMessagesReducer'
import FormSubjectValueReducer from "./FormSubjectValueReducer";
import FormBodyValueReducer from "./FormBodyValueReducer";

const rootReducer = combineReducers({
    ApiResponse: messageApiResponseReducer,
    //starringMessage: starringMessageReducer
    areAllMessagesSelected : selectAllMessagesReducer,
    composeFormReducer: ComposeFormReducer,
    formSubjectValue: FormSubjectValueReducer,
    formBodyValue: FormBodyValueReducer
})

export default rootReducer;