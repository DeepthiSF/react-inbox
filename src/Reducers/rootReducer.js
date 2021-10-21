import { combineReducers } from "redux";
import ComposeFormReducer from "./ComposeFormReducer";
import messageApiResponseReducer from "./messageAPIResponsereducer";
import selectAllMessagesReducer from './selectAllMessagesReducer'
import FormSubjectValueReducer from "./FormSubjectValueReducer";
import FormBodyValueReducer from "./FormBodyValueReducer";

const rootReducer = combineReducers({
    ApiResponse: messageApiResponseReducer,
    areAllMessagesSelected : selectAllMessagesReducer,
    composeFormReducer: ComposeFormReducer,
    formSubjectValue: FormSubjectValueReducer,
    formBodyValue: FormBodyValueReducer
})

export default rootReducer;