
const FormSubjectValueReducer = (state = "", action) => {
    switch(action.type) {
        case "Subject_Value":
            return state = action.value;
            
        default:
            return state;
    }
}

export default FormSubjectValueReducer;


// const FormSubjectValueReducer = (state = {
//     subject: "",
//     body: ""
// }, action) => {
    // case "Subject_Value":
            //     return {...state, subject: action.value}
        
            // case "Body_Value":
            //     return {...state, body: action.value}

//             default:
//                 return state;
// }