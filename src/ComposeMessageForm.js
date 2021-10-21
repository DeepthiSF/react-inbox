import {connect} from 'react-redux';

// Since this is a functional component we need to use 'props.***' to access the props/data being passed into this functional component

const ComposeMessageForm = (props) => {
    console.log(props)
    return (
        <div>
            {/* // For Forms in react the onSubmit should be declared in the first line where the Form begins */}
        {/* <form className="form-horizontal well" onSubmit={props.addMessageOnSubmit}> */}
        <form className="form-horizontal well" >
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
                    {/* <input type="text" className="form-control" id="subject" placeholder="Enter a subject" onChange={props.onChange} name="subject" /> */}
                    <input type="text" className="form-control" id="subject" placeholder="Enter a subject" name="subject" />
                </div>
            </div>
            <div className="form-group">
                <label for="body" className="col-sm-2 control-label">Body</label>
                <div className="col-sm-8">
                     {/* // This onChange method will take the value that is entered in the name 'body' and will set the state of the body in Toolbar.js with this entered value.
                    so we can use that value from the this.state.body to pass it to our POST method */}
                    {/* <textarea name="body" id="body" className="form-control" onChange={props.onChange}></textarea> */}
                    <textarea name="body" id="body" className="form-control" ></textarea>
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
        composeFormVisible: state.composeFormReducer.visible,
        composeForm : state.composeFormReducer.form
    }
}

export default connect(mapStateToProps)(ComposeMessageForm);