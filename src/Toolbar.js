import React from 'react';
import MessageList from './MessageList';
import ComposeMessageForm from './ComposeMessageForm';

class Toolbar extends React.Component {

    constructor() {
        super()
        this.state = {
            messageApiResponse: [],
            composeMessageForm: null,
            composeFormVisible: false,
            subject: "",
            body: ""
        }
        this.finalSelectState = this.selectState();
    }

    componentDidMount() {
        fetch("http://localhost:8082/api/messages")
            .then(response => response.json())
            .then((response) => {
                console.log(response)
                this.setState({
                    messageApiResponse: response
                })
            })

    }

    selectState = () => {

        let selectValues = this.state.messageApiResponse.map((message) => {
            return message.selected
        })
        let allSelectedIsTrue = selectValues.every((value) => { return value === 'true' })

        return allSelectedIsTrue;
    }

    totalselectMessages = () => {
        let totalSelectMessages = 0;
        let newMessages = this.state.messageApiResponse.slice();
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

    unreadMessageCount = () => {

        console.log(this.state.messageApiResponse)
        let newMessages = this.state.messageApiResponse.slice();
        let unreadMessages = newMessages.filter((message) => {
            return message.read === false
        })
        let unreadMessageCount;
        return unreadMessageCount = unreadMessages.length;
    }


    toggleStarred = async (event) => {
        let newMessages = this.state.messageApiResponse.slice();

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
        this.setState({ messageApiResponse: messages })
    }

    toggleSelected = (event) => {
        let id = event.target.id
        console.log(id)

        let newMessages = this.state.messageApiResponse.slice();
        newMessages[id].selected = !newMessages[id].selected;
        this.setState({
            messageApiResponse: newMessages
        })
    }


    handleSelectAll = () => {

        let newMessages = this.state.messageApiResponse.slice();

        newMessages = newMessages.map((message) => {
            return { ...message, selected: true }

        })

        this.finalSelectState = true;
        this.setState({
            messageApiResponse: newMessages
        })

    }

    handleDeSelectAll = () => {

        let newMessages = this.state.messageApiResponse.slice();

        newMessages = newMessages.map((message) => {
            return { ...message, selected: false }
        })

        this.finalSelectState = false;
        this.setState({
            messageApiResponse: newMessages
        })

    }



    dynamicSelectButtonClassName = () => {
        let className = "fa"
        let newMessages = this.state.messageApiResponse.slice();
        newMessages = newMessages.filter((message) => {
            return message.selected === true;
        })

        if (newMessages.length === this.state.messageApiResponse.length) {
            className += " fa-check-square-o"
        } else if (newMessages.length < this.state.messageApiResponse.length && newMessages.length > 0) {
            className += " fa-minus-square-o"
        } else {
            className += " fa-square-o"
        }

        return className;
    }


    handleRead = async () => {
        if (this.totalselectMessages()) {
            this.alertHandle();
        } else {
            let newMessages = this.state.messageApiResponse.slice();
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
                            read: true,
                        })
                })

            const messages = await response.json()
            this.setState({
                messageApiResponse: messages
            })
        }
    }

    handleUnRead = async () => {
        if (this.totalselectMessages()) {
            this.alertHandle();
        } else {
            let newMessages = this.state.messageApiResponse.slice();
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
            this.setState({
                messageApiResponse: messages
            })
        }
    }


    handleDelete = async () => {

        if (this.totalselectMessages()) {
            this.alertHandle();
        } else {
            let newMessages = this.state.messageApiResponse.slice();
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
            this.setState({
                messageApiResponse: messages
            })
        }

    }



    addLabel = async (label) => {

        if (this.totalselectMessages()) {
            this.alertHandle();
        } else {
            let newMessages = this.state.messageApiResponse.slice();
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
            this.setState({
                messageApiResponse: messages
            })
        }

    }


    removeLabel = async (label) => {

        if (this.totalselectMessages()) {
            this.alertHandle();
        } else {
            let newMessages = this.state.messageApiResponse.slice();
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
            this.setState({
                messageApiResponse: messages
            })
        }
    }

    alertHandle = () => {
        return alert("Please select a message to use the toolbar items");
    }

    displayComposeMessageForm = () => {
        
        if(this.state.composeFormVisible === false){
            this.setState({
                composeMessageForm: <ComposeMessageForm 
                        onChange = {this.onChange}
                        addMessageOnSubmit = {this.addMessageOnSubmit}
                        />,
                composeFormVisible: true,
            })
        } else{
            this.setState({
                composeMessageForm: null,
                composeFormVisible: false,
            })
        }

    } 
    
    onChange = (e) => {
        console.log("hello")
        this.setState({[e.target.name]: e.target.value})
    }

    addMessageOnSubmit = async (e) => {
        e.preventDefault();
        let subject = this.state.subject;
        let body = this.state.body;
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
                            labels: ["dev"],

                        })
                })

            const newMessage = await response.json()
            let newMessages = this.state.messageApiResponse.slice();
            newMessages.push(newMessage)
            this.setState({
                messageApiResponse: newMessages,
                composeMessageForm: null,
                composeFormVisible: false,
            })
    }


    render() {

        return (
            <div className="row toolbar">
                <div className="col-md-12">
                    <p className="pull-right">
                        <span className="badge badge" className='badge'>{this.unreadMessageCount()}</span>
                        <span className="badge badge" className='badge'></span>
                        <span className="badge badge" className='badge'></span>
                        unread messages
                    </p>

                    <a className="btn btn-danger" onClick={this.displayComposeMessageForm}>             
                        <i className="fa fa-plus"></i>
                    </a>

                    <button className="btn btn-default">
                        <i className={this.dynamicSelectButtonClassName()} onClick={this.finalSelectState ? this.handleDeSelectAll : this.handleSelectAll}></i>
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

                {this.state.composeMessageForm}

                <div>
                    <MessageList
                        messages={this.state.messageApiResponse}
                        toggleStarred={this.toggleStarred}
                        toggleSelected={this.toggleSelected}                  
                    />
                </div>
            </div>

        )
    }
}

export default Toolbar;