import { combineReducers } from "redux";
import ComposeFormReducer from "./ComposeFormReducer";
import messageApiResponseReducer from "./messageAPIResponsereducer";
import selectAllMessagesReducer from './selectAllMessagesReducer'
import FormValuesReducer from './FormValuesReducer';

// We use combineReducers to gather all the reducers and put them under one reducer so we can pass that one reducer to the 
// createStore() method
const rootReducer = combineReducers({
    ApiResponse: messageApiResponseReducer,
    areAllMessagesSelected: selectAllMessagesReducer,
    composeFormReducer: ComposeFormReducer,
    formValues: FormValuesReducer,
})

export default rootReducer;