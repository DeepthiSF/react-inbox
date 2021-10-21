const FormBodyValueReducer = (state = "", action) => {
    switch(action.type) {
        case "Body_Value":
            return state = action.value;
            // case "Subject_Value":
            //     return {...state, subject: action.value}
        
            // case "Body_Value":
            //     return {...state, body: action.value}
        default:
            return state;
    }
}

export default FormBodyValueReducer;