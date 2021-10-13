import React from 'react';
import MessageList from './MessageList';
import messages from './MessageData';

class Toolbar extends React.Component {

    constructor(){
        super()
        this.state = {
            messages : messages,
        }
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
            return {...message, selected: true}
        })
        this.setState({
            messages: newMessages
        })
    }

        
    // handleRead = () => {
    //     // selectAllMessages = messages.map((message, index) => {
    //     //     return setState({this.state.message = true});
    //     // })
    //     return (
            
    //         this.state.messages.map((message,index) => {
    //             this.setState({message.selected = true})
    //         })
            
    //     )

    // }

    render() {
      return (
        <div class="row toolbar">
            <div class="col-md-12">
                <p class="pull-right">
                    <span class="badge badge" className='badge'>0</span>
                    unread messages
                </p>

                <button class="btn btn-default">
                    <i class="fa fa-check-square-o" onClick = {this.handleSelectAll}></i>
                </button>

                <button class="btn btn-default">
                    Mark As Read
                </button>

                <button class="btn btn-default">
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