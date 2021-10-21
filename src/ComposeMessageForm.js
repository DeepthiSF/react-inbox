import { connect } from 'react-redux';

// Since this is a functional component we need to use 'props.***' to access the props/data being passed into this functional component

const ComposeMessageForm = (props) => {
    //console.log(props)

    // To handle the change happening in the input type text forms. Which means when someone starts typing in the text box that means a change is happening in that text box
    // and we need to handle that change by grabbing the text values entered in the text box and setting the state of that text box name with the value entered.
    // For this we use event.target.value to grab the value entered in the target.

    const onChange = (e) => {
        //console.log("hello")
        //console.log(e.target.name)
        if (e.target.name === "subject") {
            let myAction = {
                type: "Subject_Value",
                value: e.target.value
            }
            props.dispatch(myAction)
        } else {
            let action = {
                type: "Body_Value",
                value: e.target.value
            }
            props.dispatch(action)
        }

    }


    const addMessageOnSubmit = async (e) => {
        e.preventDefault();
        let subject = props.formSubjectValue;
        let body = props.formBodyValue;
        const response = await fetch('http://localhost:8082/api/messages',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        subject: subject,
                        body: body,
                        read: false,
                        starred: false,
                        labels: [],

                    })
            })

        const newMessage = await response.json()
        let newMessages = props.apiResponse.slice();
        newMessages.push(newMessage)
        let myAction = {
            type: "Create_Message",
            response: newMessages
        }
        props.dispatch(myAction);

        let action = {
            type: "CloseComposeForm",
            visible: false,
            form: null
        }
        props.dispatch(action)
    }


    return (
        <div>
            {/* // For Forms in react the onSubmit should be declared in the first line where the Form begins */}
            <form className="form-horizontal well" onSubmit={addMessageOnSubmit}>
                <div className="form-group">
                    <div className="col-sm-8 col-sm-offset-2">
                        <h4>Compose Message</h4>
                    </div>
                </div>
                <div className="form-group">
                    <label for="subject" className="col-sm-2 control-label">Subject</label>
                    <div className="col-sm-8">
                        {/* // This onChange method will take the value that is entered in the name 'subject' and will set the state of the subject in Toolbar.js with this entered value.
                    so we can use that value from the this.state.subject to pass it to our POST method */}
                        <input type="text" className="form-control" id="subject" placeholder="Enter a subject" onChange={onChange} name="subject" />
                    </div>
                </div>
                <div className="form-group">
                    <label for="body" className="col-sm-2 control-label">Body</label>
                    <div className="col-sm-8">
                        {/* // This onChange method will take the value that is entered in the name 'body' and will set the state of the body in Toolbar.js with this entered value.
                    so we can use that value from the this.state.body to pass it to our POST method */}
                        <textarea name="body" id="body" className="form-control" onChange={onChange}></textarea>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-8 col-sm-offset-2">
                        <input type="submit" value="Send" className="btn btn-primary" />
                    </div>
                </div>
            </form>
        </div>

    )
}

const mapStateToProps = (state) => {
    return {
        apiResponse: state.ApiResponse,
        formSubjectValue: state.formValues.subject,
        formBodyValue: state.formValues.body
    }
}

export default connect(mapStateToProps)(ComposeMessageForm);