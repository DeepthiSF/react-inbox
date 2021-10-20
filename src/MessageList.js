import { connect } from 'react-redux';
import Message from './Message';
//import {connect} from 'react-redux'

function MessageList(props) {

    // const messageList = props.messages.map((message, index) => {
    //     return <Message
    //     key={index} 
    //     data= {message}
    //     index = {index}
    //     toggleStarred={props.toggleStarred}
    //     toggleSelected={props.toggleSelected}
    //     />
    // })

    const messageList = props.apiResponse.map((message, index) => {
        return <Message
        key={index} 
        data= {message}
        index = {index}
        toggleStarred={props.toggleStarred}
        // toggleSelected={props.toggleSelected}
        />
    })

    return (
        <div >
            {messageList}
        </div>
    )

}

const mapStateToProps = (state) => {
    return {
        apiResponse: state.ApiResponse
    }
}

export default connect(mapStateToProps)(MessageList);

