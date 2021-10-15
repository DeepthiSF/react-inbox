import React from 'react';
import MessageList from './MessageList';
import messages from './MessageData';

class Toolbar extends React.Component {

    constructor() {
        super()
        this.state = {
            // messages: messages,
            messageApiResponse: []
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

    // componentDidUpdate(prevState) {
    //     if (this.state.messages !== prevState.messages) {
    //         this.getMessages();
    //     }
    // }

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
        //let newMessages = this.state.messageApiResponse.slice();
        let newMessages = {...this.state.messageApiResponse};

        let unreadMessages = newMessages.filter((message) => {

            return message.read === false
        })


        let unreadMessageCount;
        return unreadMessageCount = unreadMessages.length;
    }


    toggleStarred = async (event) => {
        let id = event.target.id

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
        // let newMessages = this.state.messages.slice();
        //console.log(this.state.messageApiResponse)
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


    handleRead = () => {
        if (this.totalselectMessages()) {
            this.alertHandle();
        } else {
            let newMessages = this.state.messageApiResponse.slice();

            newMessages = newMessages.map((message) => {
                if (message.selected === true) {
                    return { ...message, read: true }
                } else {
                    return { ...message }
                }
            })

            this.setState({
                messageApiResponse: newMessages
            })
        }

    }

    handleUnRead = () => {
        if (this.totalselectMessages()) {
            this.alertHandle();
        } else {
            let newMessages = this.state.messageApiResponse.slice();

            newMessages = newMessages.map((message) => {
                if (message.selected === true) {
                    return { ...message, read: false }
                } else {
                    return { ...message }
                }
            })

            this.setState({
                messageApiResponse: newMessages
            })
        }
    }


    handleDelete = () => {
        if (this.totalselectMessages()) {
            this.alertHandle();
        } else {
            let newMessages = this.state.messageApiResponse.slice();

            newMessages = newMessages.filter((message, index) => {
                return (message.selected === false || message.selected === undefined);
            })

            this.setState({
                messageApiResponse: newMessages
            })
        }
    }



    addLabel = (label) => {
        if (this.totalselectMessages()) {
            this.alertHandle();
        } else {
            let newMessages = this.state.messageApiResponse.slice();
            if (label !== "Apply label") {
                newMessages = newMessages.map((message, index) => {
                    if (message.selected === true && message.labels.indexOf(label) === -1) {

                        message.labels.push(label)
                        // message.labels = message.labels.concat([label]) 
                        message.selected = false;
                        return message;
                    } else {
                        return message;
                    }
                })
            }
            this.setState({
                messageApiResponse: newMessages
            })
        }
    }

    removeLabel = (label) => {
        if (this.totalselectMessages()) {
            this.alertHandle();
        } else {
            let newMessages = this.state.messageApiResponse.slice();

            newMessages = newMessages.map((message, index) => {
                if (message.selected === true && message.labels.indexOf(label) !== -1) {
                    let index;
                    index = message.labels.indexOf(label);
                    message.labels.splice(index, 1);
                    // message.labels = message.labels.concat([label]) 
                    message.selected = false;
                    return message;
                } else {
                    return message;
                }
            })

            this.setState({
                messageApiResponse: newMessages
            })
        }
    }

    alertHandle = () => {

        return alert("Please select a message to use the toolbar items");

    }


    render() {

        return (
            <div className="row toolbar">
                <div className="col-md-12">
                    <p className="pull-right">
                        {/* <span className="badge badge" className='badge'>{this.unreadMessageCount()}</span> */}
                        <span className="badge badge" className='badge'></span>
                        <span className="badge badge" className='badge'>0</span>
                        unread messages
                    </p>

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

                <div>
                    <MessageList
                        // messages={this.state.messages}
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