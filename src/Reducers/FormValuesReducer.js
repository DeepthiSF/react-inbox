
const FormValuesReducer = (state = {
    subject: "",
    body: ""
}, action) => {
    switch (action.type) {
        case "Subject_Value":
            console.log("I am here")
            return { ...state, subject: action.value }

        case "Body_Value":
            console.log("I am in the body")
            return { ...state, body: action.value }

        default:
            return state;
    }
}

export default FormValuesReducer;
