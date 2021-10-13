import React from 'react';
import MessageList from './MessageList';
import messages from './MessageData';

class Toolbar extends React.Component {

    constructor() {
        super()
        this.state = {
            messages: messages,
        }
        this.finalSelectState = this.selectState();
    }

    toggleStarred = (event) => {
        let id = event.target.id
        console.log(id)
        let newMessages = this.state.messages.slice();
        newMessages[id].starred = !newMessages[id].starred
        this.setState({
            messages: newMessages
        })
    }

    toggleSelected = (event) => {
        let id = event.target.id
        console.log(id)
        let newMessages = this.state.messages.slice();
        newMessages[id].selected = !newMessages[id].selected;
        this.setState({
            messages: newMessages
        })
    }


    handleSelectAll = () => {
        
        let newMessages = this.state.messages.slice();
        
            newMessages = newMessages.map((message) => {
                return { ...message, selected: true }

            })

            this.finalSelectState = true;
            this.setState({
                messages: newMessages
            })
        
    }

    handleDeSelectAll = () => {
       
        let newMessages = this.state.messages.slice();
        
            newMessages = newMessages.map((message) => {
                return { ...message, selected: false }
            })

            this.finalSelectState = false;
            this.setState({
                messages: newMessages
            })
        
    }

    selectState = () => {

        let selectValues = this.state.messages.map((message) => {
            return message.selected
        })
        let allSelectedIsTrue = selectValues.every((value) => { return value === 'true' })
        console.log(allSelectedIsTrue)
        return allSelectedIsTrue;
    }

   

    // dynamicSelectButtonClassName = () => {
    //     let className = "fa"
    //     let selectValues = this.state.messages.map((message) => {
    //         return message.selected
    //     })

    //     let selectedStateFalse = selectValues.find((element) => element === 'false');
    //     let selectedStateUndefined = selectValues.find((element) => element === 'undefined');
    //     let allSelectedIsTrue = selectValues.every((value) => {return value === 'true'})

    //     if(selectedStateFalse || selectedStateUndefined){
    //         className += " fa-minus-square-o"
    //     } else if (!selectedStateFalse{
    //         className += " fa-check-square-o"
    //     }
    //     return className;
    // }




    handleRead = () => {
        
        let newMessages = this.state.messages.slice();

        newMessages = newMessages.map((message) => {
            if(message.selected === true){
                return {...message, read: true}
            } else{
                return {...message}
            }
        })

        this.setState({
            messages: newMessages
        })
    }

    handleUnRead = () => {
        
        let newMessages = this.state.messages.slice();

        newMessages = newMessages.map((message) => {
            if(message.selected === true){
                return {...message, read: false}
            } else{
                return {...message}
            }
        })

        this.setState({
            messages: newMessages
        })
    }

    render() {
       
        return (
            <div class="row toolbar">
                <div class="col-md-12">
                    <p class="pull-right">
                        <span class="badge badge" className='badge'>0</span>
                        unread messages
                    </p>

                    <button class="btn btn-default">
                        <i class="fa fa-check-square-o" onClick={this.finalSelectState ? this.handleDeSelectAll : this.handleSelectAll}></i>
                    </button>

                    <button class="btn btn-default" onClick={this.handleRead}>
                        Mark As Read
                    </button>

                    <button class="btn btn-default" onClick={this.handleUnRead}>
                        Mark As Unread
                    </button>

                    <select class="form-control label-select">
                        <option>Apply label</option>
                        <option value="dev">dev</option>
                        <option value="personal">personal</option>
                        <option value="gschool">gschool</option>
                    </select>

                    <select class="form-control label-select">
                        <option>Remove label</option>
                        <option value="dev">dev</option>
                        <option value="personal">personal</option>
                        <option value="gschool">gschool</option>
                    </select>

                    <button class="btn btn-default">
                        <i class="fa fa-trash-o"></i>
                    </button>
                </div>

                <div>
                    <MessageList
                        messages={this.state.messages}
                        toggleStarred={this.toggleStarred}
                        toggleSelected={this.toggleSelected}
                    />
                </div>
            </div>

        )
    }
}

export default Toolbar;