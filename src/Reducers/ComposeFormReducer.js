const ComposeFormReducer = (
    state = {
        visible: false,
        form: null
    }, action) => {
    console.log(action)
    switch (action.type) {

        case "OpenComposeForm":
            // If our state is an array or an object then we have to create a copy of the current state before changing it.
            // Here our state is an object and hence we are first getting a copy of it and then editing the values of the keys inside this object.
            // Because redux doesn’t “setState” to re-render Components unless the state is a new reference which is done via a copy and assigning it accordingly.

            // In this return statement we are getting a copy of the current state and also editing the values
            // of the state object. So the result would be a new copy of the state with the updated key values.
            // We can also do this in multiple lines by first creating a copy of the state and then editing its key values
            return { ...state, visible: action.visible, form: action.form }

        case "CloseComposeForm":
            return { ...state, visible: action.visible, form: action.form }

        default:
            return state;

    }
}

export default ComposeFormReducer;