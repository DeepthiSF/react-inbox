import React from 'react';
import MessageList from './MessageList';
import ComposeMessageForm from './ComposeMessageForm';
import { connect } from 'react-redux'
import { render } from '@testing-library/react';

// Implementing REDUX to this Inbox App

// The Toolbar component should still be a Class component even though it is not maintaining any state because it is using Life cycle methods like
// componentDidMount()
class Toolbar extends React.Component {

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
        // this will dispatch this action to the Store and then the Reducer based on the action type name will
        // will act accordingly.
        this.props.dispatch(myAction)
    }

    // To select and deselect a message
    toggleSelected = (event) => {
        let id = event.target.id
        // console.log(id)

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

    // To make the message state as 'Read' state when the message is selected and 'Mark As Read' button is clicked on the toolbar
    handleRead = async () => {
        if (this.totalselectMessages()) {
            this.alertHandle();
        } else {
            let newMessages = this.props.apiResponse.slice();
            let itemsSelected = [];
            newMessages.map((message) => {
                if (message.selected === true) {
                    itemsSelected.push(message.id)
                }
            })
            // console.log(itemsSelected)
            const response = await fetch('http://localhost:8082/api/messages',
                {
                    method: 'PATCH',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(
                        {
                            messageIds: itemsSelected,
                            command: 'read',
                            read: true,
                        })
                })

            const messages = await response.json()
            let myAction = {
                type: "MarkAsRead",
                response: messages
            }
            this.props.dispatch(myAction)

        }
    }

    // To make the message state as 'Unread' state when the message is selected and 'Mark As Unread' button is clicked on the toolbar
    handleUnRead = async () => {
        if (this.totalselectMessages()) {
            this.alertHandle();
        } else {
            let newMessages = this.props.apiResponse.slice();
            let itemsSelected = [];
            newMessages.map((message) => {
                if (message.selected === true) {
                    itemsSelected.push(message.id)
                }
            })
            console.log(itemsSelected)
            const response = await fetch('http://localhost:8082/api/messages',
                {
                    method: 'PATCH',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(
                        {
                            messageIds: itemsSelected,
                            command: 'read',
                            read: false,
                        })
                })

            const messages = await response.json()
            let myAction = {
                type: "MarkAsUnRead",
                response: messages
            }
            this.props.dispatch(myAction)

        }
    }

    // To Delete a selected message/ messages
    handleDelete = async () => {

        if (this.totalselectMessages()) {
            this.alertHandle();
        } else {
            let newMessages = this.props.apiResponse.slice();
            let itemsSelected = [];
            newMessages.map((message) => {
                if (message.selected === true) {
                    itemsSelected.push(message.id)
                }
            })
            console.log(itemsSelected)
            const response = await fetch('http://localhost:8082/api/messages',
                {
                    method: 'PATCH',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(
                        {
                            messageIds: itemsSelected,
                            command: 'delete',
                        })
                })

            const messages = await response.json()
            let myAction = {
                type: "DeleteMessages",
                response: messages
            }
            this.props.dispatch(myAction)

        }

    }


    // To add label to a selected message/messages
    addLabel = async (label) => {

        if (this.totalselectMessages()) {
            this.alertHandle();
        } else {
            let newMessages = this.props.apiResponse.slice();
            let itemsSelected = [];
            if (label !== "Apply label") {
                newMessages.map((message, index) => {
                    if (message.selected === true) {
                        itemsSelected.push(message.id)
                    }
                })
            }

            console.log(itemsSelected)
            const response = await fetch('http://localhost:8082/api/messages',
                {
                    method: 'PATCH',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(
                        {
                            messageIds: itemsSelected,
                            command: 'addLabel',
                            label: label,
                        })
                })

            const messages = await response.json()
            let myAction = {
                type: "AddLabel",
                response: messages
            }
            this.props.dispatch(myAction)
        }

    }

    // To remove label on a selected message/messages
    removeLabel = async (label) => {

        if (this.totalselectMessages()) {
            this.alertHandle();
        } else {
            let newMessages = this.props.apiResponse.slice();
            let itemsSelected = [];
            if (label !== "Apply label") {
                newMessages.map((message, index) => {
                    if (message.selected === true) {
                        itemsSelected.push(message.id)
                    }
                })
            }

            console.log(itemsSelected)
            const response = await fetch('http://localhost:8082/api/messages',
                {
                    method: 'PATCH',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(
                        {
                            messageIds: itemsSelected,
                            command: 'removeLabel',
                            label: label,
                        })
                })

            const messages = await response.json()
            let myAction = {
                type: "DeleteLabel",
                response: messages
            }
            this.props.dispatch(myAction)
        }
    }


    // To disable all the bottons on the Toolbar when no messages are selected
    alertHandle = () => {
        return alert("Please select a message to use the toolbar items");
    }

    // To display the compose form when the red compose button is clicked on the toolbar
    // and close the compose form when the same button is clicked again
    displayComposeMessageForm = () => {
        // console.log(this.props.composeFormVisible)
        if (this.props.composeFormVisible === false) {
            let myAction = {
                type: "OpenComposeForm",
                visible: true,
                form: <ComposeMessageForm />,
            }
            this.props.dispatch(myAction)
        } else {
            let action = {
                type: "CloseComposeForm",
                visible: false,
                form: null
            }
            this.props.dispatch(action)

        }

    }


    render() {
        console.log(this)
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

                    <a className="btn btn-danger" onClick={this.displayComposeMessageForm}>
                        <i className="fa fa-plus"></i>
                    </a>

                    <button className="btn btn-default">
                        <i className={this.dynamicSelectButtonClassName()} onClick={this.props.areAllMessagesSelected ? this.handleSelectAll : this.handleDeSelectAll}></i>
                        <i className ></i>
                    </button>

                    <button className="btn btn-default" onClick={this.handleRead}>
                        Mark As Read
                    </button>

                    <button className="btn btn-default" onClick={this.handleUnRead}>
                        Mark As Unread
                    </button>

                    <select className="form-control label-select" onChange={(e) => this.addLabel(e.target.value)}>
                        <option>Apply label</option>
                        <option value="dev">dev</option>
                        <option value="personal">personal</option>
                        <option value="gschool">gschool</option>
                    </select>

                    <select className="form-control label-select" onChange={(e) => this.removeLabel(e.target.value)}>
                        <option>Remove Label </option>
                        <option value="dev" >dev</option>
                        <option value="personal">personal</option>
                        <option value="gschool">gschool</option>
                    </select>

                    <button className="btn btn-default">
                        <i className="fa fa-trash-o" onClick={this.handleDelete}></i>
                    </button>
                </div>

                {this.props.composeForm}

                <div>
                    <MessageList
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
        areAllMessagesSelected: state.areAllMessagesSelected,
        composeFormVisible: state.composeFormReducer.visible,
        composeForm: state.composeFormReducer.form,
    }
}

export default connect(mapStateToProps)(Toolbar);