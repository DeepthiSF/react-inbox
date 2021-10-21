// const FormSubjectValueReducer = (state = {
//     subject: "",
//     body: ""
// }, action) => {
const FormSubjectValueReducer = (state = "", action) => {
    switch(action.type) {
        case "Subject_Value":
            return state = action.value;
            // case "Subject_Value":
            //     return {...state, subject: action.value}
        
            // case "Body_Value":
            //     return {...state, body: action.value}
        default:
            return state;
    }
}

export default FormSubjectValueReducer;