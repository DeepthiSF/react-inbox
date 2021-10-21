import React from 'react';
import MessageList from './MessageList';
import ComposeMessageForm from './ComposeMessageForm';
import {connect} from 'react-redux'
import { render } from '@testing-library/react';

// Implementing REDUX to this Inbox App

// The Toolbar component should still be a Class component even though it is not maintaining any state because it is using Life cycle methods like
// componentDidMount()
class Toolbar extends React.Component {
// const Toolbar = (props) = { 

    // constructor() {
    //     super()
    //     this.state = {
    //         messageApiResponse: [],
    //         composeMessageForm: null,
    //         composeFormVisible: false,
    //         subject: "",
    //         body: ""
    //     }
    //     this.finalSelectState = this.selectState();
    // }

    // This method is used only if you want to load data on a page as soon as it loads. Because this method gets triggered only after the page is loaded and then loads the requested data
    componentDidMount = () => {
        fetch("http://localhost:8082/api/messages")
            .then(response => response.json())
            .then((response) => {
                console.log(response)
                // Actions always return an object
                let myAction = {
                    type: "Fetch_Response",
                    response: response
                }
                this.props.dispatch(myAction)
            })

    }

    // // To check if all the messages are selected or not
    // selectState = () => {

    //     let selectValues = this.props.apiResponse.map((message) => {
    //         return message.selected
    //     })
    //     let allSelectedIsTrue = selectValues.every((value) => { return value === 'true' })

    //     return allSelectedIsTrue;
    // }

    // To check if no messages are selected
    totalselectMessages = () => {
        let totalSelectMessages = 0;
        let newMessages = this.props.apiResponse.slice();
        let selectedMessages = newMessages.filter((message) => {
            return message.selected === true;
        })

        totalSelectMessages = selectedMessages.length;
        if (totalSelectMessages === 0) {
            return true;
        } else {
            return false;
        }
    }

    // To check how many messages are unread 
    unreadMessageCount = () => {

        let newMessages = this.props.apiResponse.slice();
        let unreadMessages = newMessages.filter((message) => {
            return message.read === false
        })
        let unreadMessageCount;
        return unreadMessageCount = unreadMessages.length;
    }


    // To Star and Unstar a message
    toggleStarred = async (event) => {

        console.log(this.props.apiResponse)
        
        // getting a copy of the current array of messages returned from the API
        let newMessages = [...this.props.apiResponse];

        let indexOfMessage = event.target.id
        let id = newMessages[indexOfMessage].id;

        const response = await fetch(`http://localhost:8082/api/messages`,
            {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        messageIds: [id],
                        command: 'star',
                    })

            })

        const messages = await response.json()
        console.log(messages)
        let myAction = {
            type: "Starring_Message",
            response: messages
        }
        this.props.dispatch(myAction)
    }

    // To select and deselect a message
    toggleSelected = (event) => {
        let id = event.target.id
        console.log(id)

        let newMessages = [...this.props.apiResponse];
        newMessages[id].selected = !newMessages[id].selected;
        let myAction = {
            type: "Select_Message",
            response: newMessages
        }
        this.props.dispatch(myAction)
    }

    // To select all the messages using the Select All button in the Toolbar
    handleSelectAll = () => {

        console.log("I am in select ALL")
        let newMessages = [...this.props.apiResponse];

        newMessages = newMessages.map((message) => {
            return { ...message, selected: true }

        })

        let myAction = {
            type: "SelectAll_Messages",
            response: newMessages
        }
        this.props.dispatch(myAction)

        let selectAction = {
            type: "AllMessagesSelected",
            response: false
        }
        this.props.dispatch(selectAction)
        

    }

    // To De-select all the messages using the Select All button in the Toolbar
    handleDeSelectAll = () => {
        
        let newMessages = [...this.props.apiResponse];

        newMessages = newMessages.map((message) => {
            return { ...message, selected: false }
        })

        let myAction = {
        type: "DeSelectAll_Messages",
        response: newMessages
       }
       this.props.dispatch(myAction)
     
       let deSelectAction = {
        type: "AllMessagesDeSelected",
        response: true
       }
       this.props.dispatch(deSelectAction)
        

    }

    // To determine the state of the Select All button on the Toolbar depending on how many messages are selected
    dynamicSelectButtonClassName = () => {
        let className = "fa"
        let newMessages = [...this.props.apiResponse];
        newMessages = newMessages.filter((message) => {
            return message.selected === true;
        })

        if (newMessages.length === this.props.apiResponse.length) {
            className += " fa-check-square-o"
        } else if (newMessages.length < this.props.apiResponse.length && newMessages.length > 0) {
            className += " fa-minus-square-o"
        } else {
            className += " fa-square-o"
        }

        return className;
    }

    // // To make the message state as 'Read' state when the message is selected and 'Mark As Read' button is clicked on the toolbar
    // handleRead = async () => {
    //     if (this.totalselectMessages()) {
    //         this.alertHandle();
    //     } else {
    //         let newMessages = this.state.messageApiResponse.slice();
    //         let itemsSelected = [];
    //         newMessages.map((message) => {
    //             if (message.selected === true) {
    //                 itemsSelected.push(message.id)
    //             }
    //         })
    //         console.log(itemsSelected)
    //         const response = await fetch('http://localhost:8082/api/messages',
    //             {
    //                 method: 'PATCH',
    //                 headers: {
    //                     'Accept': 'application/json',
    //                     'Content-Type': 'application/json',
    //                 },
    //                 body: JSON.stringify(
    //                     {
    //                         messageIds: itemsSelected,
    //                         command: 'read',
    //                         read: true,
    //                     })
    //             })

    //         const messages = await response.json()
    //         this.setState({
    //             messageApiResponse: messages
    //         })
    //     }
    // }

    // // To make the message state as 'Unread' state when the message is selected and 'Mark As Unread' button is clicked on the toolbar
    // handleUnRead = async () => {
    //     if (this.totalselectMessages()) {
    //         this.alertHandle();
    //     } else {
    //         let newMessages = this.state.messageApiResponse.slice();
    //         let itemsSelected = [];
    //         newMessages.map((message) => {
    //             if (message.selected === true) {
    //                 itemsSelected.push(message.id)
    //             }
    //         })
    //         console.log(itemsSelected)
    //         const response = await fetch('http://localhost:8082/api/messages',
    //             {
    //                 method: 'PATCH',
    //                 headers: {
    //                     'Accept': 'application/json',
    //                     'Content-Type': 'application/json',
    //                 },
    //                 body: JSON.stringify(
    //                     {
    //                         messageIds: itemsSelected,
    //                         command: 'read',
    //                         read: false,
    //                     })
    //             })

    //         const messages = await response.json()
    //         this.setState({
    //             messageApiResponse: messages
    //         })
    //     }
    // }

    // // To Delete a selected message/ messages
    // handleDelete = async () => {

    //     if (this.totalselectMessages()) {
    //         this.alertHandle();
    //     } else {
    //         let newMessages = this.state.messageApiResponse.slice();
    //         let itemsSelected = [];
    //         newMessages.map((message) => {
    //             if (message.selected === true) {
    //                 itemsSelected.push(message.id)
    //             }
    //         })
    //         console.log(itemsSelected)
    //         const response = await fetch('http://localhost:8082/api/messages',
    //             {
    //                 method: 'PATCH',
    //                 headers: {
    //                     'Accept': 'application/json',
    //                     'Content-Type': 'application/json',
    //                 },
    //                 body: JSON.stringify(
    //                     {
    //                         messageIds: itemsSelected,
    //                         command: 'delete',
    //                     })
    //             })

    //         const messages = await response.json()
    //         this.setState({
    //             messageApiResponse: messages
    //         })
    //     }

    // }


    // // To add label to a selected message/messages
    // addLabel = async (label) => {

    //     if (this.totalselectMessages()) {
    //         this.alertHandle();
    //     } else {
    //         let newMessages = this.state.messageApiResponse.slice();
    //         let itemsSelected = [];
    //         if (label !== "Apply label") {
    //             newMessages.map((message, index) => {
    //                 if (message.selected === true) {
    //                     itemsSelected.push(message.id)
    //                 }
    //             })
    //         }

    //         console.log(itemsSelected)
    //         const response = await fetch('http://localhost:8082/api/messages',
    //             {
    //                 method: 'PATCH',
    //                 headers: {
    //                     'Accept': 'application/json',
    //                     'Content-Type': 'application/json',
    //                 },
    //                 body: JSON.stringify(
    //                     {
    //                         messageIds: itemsSelected,
    //                         command: 'addLabel',
    //                         label: label,
    //                     })
    //             })

    //         const messages = await response.json()
    //         this.setState({
    //             messageApiResponse: messages
    //         })
    //     }

    // }

    // // To remove label on a selected message/messages
    // removeLabel = async (label) => {

    //     if (this.totalselectMessages()) {
    //         this.alertHandle();
    //     } else {
    //         let newMessages = this.state.messageApiResponse.slice();
    //         let itemsSelected = [];
    //         if (label !== "Apply label") {
    //             newMessages.map((message, index) => {
    //                 if (message.selected === true) {
    //                     itemsSelected.push(message.id)
    //                 }
    //             })
    //         }

    //         console.log(itemsSelected)
    //         const response = await fetch('http://localhost:8082/api/messages',
    //             {
    //                 method: 'PATCH',
    //                 headers: {
    //                     'Accept': 'application/json',
    //                     'Content-Type': 'application/json',
    //                 },
    //                 body: JSON.stringify(
    //                     {
    //                         messageIds: itemsSelected,
    //                         command: 'removeLabel',
    //                         label: label,
    //                     })
    //             })

    //         const messages = await response.json()
    //         this.setState({
    //             messageApiResponse: messages
    //         })
    //     }
    // }


    // // To disable all the bottons on the Toolbar when no messages are selected
    // alertHandle = () => {
    //     return alert("Please select a message to use the toolbar items");
    // }

    // // To display the compose form when the red compose button is clicked on the toolbar
    // // and close the compose form when the same button is clicked again
    // displayComposeMessageForm = () => {        
    //     if(this.state.composeFormVisible === false){
    //         this.setState({
    //             composeMessageForm: <ComposeMessageForm 
    //                     onChange = {this.onChange}
    //                     addMessageOnSubmit = {this.addMessageOnSubmit}
    //                     />,
    //             composeFormVisible: true,
    //         })
    //     } else{
    //         this.setState({
    //             composeMessageForm: null,
    //             composeFormVisible: false,
    //         })
    //     }

    // } 
    
    // // To handle the change happening in the input type text forms. Which means when someone starts typing in the text box that means a change is happening in that text box
    // // and we need to handle that change by grabbing the text values entered in the text box and setting the state of that text box name with the value entered.
    // // For this we use event.target.value to grab the value entered in the target.
    // onChange = (e) => {
    //     console.log("hello")
    //     this.setState({[e.target.name]: e.target.value})
    // }

    // // To add a new message to the message list on the UI when the Send button is clicked on the compose form
    // addMessageOnSubmit = async (e) => {
    //     e.preventDefault();
    //     let subject = this.state.subject;
    //     let body = this.state.body;
    //     const response = await fetch('http://localhost:8082/api/messages',
    //             {
    //                 method: 'POST',
    //                 headers: {
    //                     'Accept': 'application/json',
    //                     'Content-Type': 'application/json',
    //                 },
    //                 body: JSON.stringify(
    //                     {
    //                         subject: subject,
    //                         body: body,
    //                         read: false,
    //                         starred: false,
    //                         labels: ["dev"],

    //                     })
    //             })

    //         const newMessage = await response.json()
    //         let newMessages = this.state.messageApiResponse.slice();
    //         newMessages.push(newMessage)
    //         this.setState({
    //             messageApiResponse: newMessages,
    //             composeMessageForm: null,
    //             composeFormVisible: false,
    //         })
    // }
   
    render() {
        return (
            <div className="row toolbar">
                <div className="col-md-12">
                    <p className="pull-right">
                        <span className="badge badge" className='badge'>{this.unreadMessageCount()}</span>
                        <span className="badge badge" className='badge'></span>
                        <span className="badge badge" className='badge'></span>
                        <span className="badge badge" className='badge'></span>
                        unread messages
                    </p>

                    {/* <a className="btn btn-danger" onClick={this.displayComposeMessageForm}>              */}
                    <a className="btn btn-danger" >
                        <i className="fa fa-plus"></i>
                    </a>

                    <button className="btn btn-default">
                        <i className={this.dynamicSelectButtonClassName()} onClick={this.props.areAllMessagesSelected ?  this.handleSelectAll : this.handleDeSelectAll}></i>
                        <i className ></i>
                    </button>

                    {/* <button className="btn btn-default" onClick={this.handleRead}> */}
                    <button className="btn btn-default" >
                        Mark As Read
                    </button>

                    {/* <button className="btn btn-default" onClick={this.handleUnRead}> */}
                    <button className="btn btn-default">
                        Mark As Unread
                    </button>

                    {/* <select className="form-control label-select" onChange={(e) => this.addLabel(e.target.value)}> */}
                    <select className="form-control label-select" >
                        <option>Apply label</option>
                        <option value="dev">dev</option>
                        <option value="personal">personal</option>
                        <option value="gschool">gschool</option>
                    </select>

                    {/* <select className="form-control label-select" onChange={(e) => this.removeLabel(e.target.value)}> */}
                    <select className="form-control label-select" >
                        <option>Remove Label </option>
                        <option value="dev" >dev</option>
                        <option value="personal">personal</option>
                        <option value="gschool">gschool</option>
                    </select>

                    <button className="btn btn-default">
                        {/* <i className="fa fa-trash-o" onClick={this.handleDelete}></i> */}
                        <i className="fa fa-trash-o"></i>
                    </button>
                </div>

                {/* {this.state.composeMessageForm} */}

                <div>
                    <MessageList
                        // messages={this.state.messageApiResponse}
                        toggleStarred={this.toggleStarred}
                        toggleSelected={this.toggleSelected}                  
                    />
                </div>
            </div>

        )
    }
      
}
    

const mapStateToProps = (state) => {
    return {
        apiResponse: state.ApiResponse,
        areAllMessagesSelected: state.areAllMessagesSelected
    }
}

export default connect(mapStateToProps)(Toolbar);