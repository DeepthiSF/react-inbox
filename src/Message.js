import React from 'react';
import {connect} from 'react-redux'

const Message = (props) => {
    
    let dynamicClass = "row message"

    // To check the status of an individual message whether it is read or selected and display the message accordingly.
    // If the message is read then the message will not be in bold. If it is unread then it will be bold
    // If message is selected then the background will b highlighted in yellow
    const dynamicClassName = () => {
          let dynamicClass = "row message"
        if (props.apiResponse.selected === true && props.apiResponse.read === true) {
           dynamicClass += " read selected";
        } else if (props.apiResponse.selected === true && props.apiResponse.read === false) {
            dynamicClass += " unread selected";
        } else if (props.apiResponse.read === true) {
            dynamicClass += " read"
        } else {
            dynamicClass += " unread"
        }
        return dynamicClass;
    }

    console.log(props)

    // // To check if all the messages are selected or not
    // selectState = () => {

    //     let selectValues = this.state.messageApiResponse.map((message) => {
    //         return message.selected
    //     })
    //     let allSelectedIsTrue = selectValues.every((value) => { return value === 'true' })

    //     return allSelectedIsTrue;
    // }

    // // To check if no messages are selected
    // totalselectMessages = () => {
    //     let totalSelectMessages = 0;
    //     let newMessages = this.state.messageApiResponse.slice();
    //     let selectedMessages = newMessages.filter((message) => {
    //         return message.selected === true;
    //     })

    //     totalSelectMessages = selectedMessages.length;
    //     if (totalSelectMessages === 0) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }

    // // To check how many messages are unread 
    // unreadMessageCount = () => {

    //     console.log(this.state.messageApiResponse)
    //     let newMessages = this.state.messageApiResponse.slice();
    //     let unreadMessages = newMessages.filter((message) => {
    //         return message.read === false
    //     })
    //     let unreadMessageCount;
    //     return unreadMessageCount = unreadMessages.length;
    // }


    // // To Star and Unstar a message
    // const toggleStarred = async (event) => {
    //     let newMessages = props.apiResponse.slice();

    //     let indexOfMessage = event.target.id
    //     let id = newMessages[indexOfMessage].id;

    //     const response = await fetch(`http://localhost:8082/api/messages`,
    //         {
    //             method: 'PATCH',
    //             headers: {
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(
    //                 {
    //                     messageIds: [id],
    //                     command: 'star',
    //                 })

    //         })

    //     const messages = await response.json()
    //     let myAction = {
    //         type: "Starring_Message",
    //         response: messages
    //     }
    //     this.props.dispatch(myAction)
    // }

    
    return (
        <ul>
            <div
                className={dynamicClassName()}
            >
                <div className="col-xs-1">
                    <div className="row">
                        <div className="col-xs-2">
                            <input id={(props.index)} type="checkbox"
                                checked={props.apiResponse[props.index].selected? "checked":""} onChange={props.toggleSelected}/>                                
                                
                        </div>
                        <div className="col-xs-2">
                            <i id={(props.index)} className={props.apiResponse[props.index].starred ? "star fa fa-star" : "star fa fa-star-o"} onClick={props.toggleStarred} ></i>
                        </div>
                    </div>
                </div>
                <div className="col-xs-11">                    

                    {(props.apiResponse[props.index].labels).map((label, index) => {
                        return <span class="label label-warning">{label}</span>
                    })}
                    
                    <a href="#">
                    {props.apiResponse[props.index].subject}
                    </a>

                </div>
            </div>
        </ul >
    )


}



const mapStateToProps = (state) => {
    return {
        apiResponse: state.ApiResponse
    }
}

export default connect(mapStateToProps)(Message);