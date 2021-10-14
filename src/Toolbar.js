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

    unreadMessageCount = () => {

        let newMessages = this.state.messages.slice();
       
        let unreadMessages = newMessages.filter((message) => {
           
            return message.read === false
            })
            
        
        let unreadMessageCount;
        return unreadMessageCount = unreadMessages.length;
    }

    toggleStarred = (event) => {
        let id = event.target.id
        
        let newMessages = this.state.messages.slice();
        newMessages[id].starred = !newMessages[id].starred
        this.setState({
            messages: newMessages
        })
    }

    toggleSelected = (event) => {
        let id = event.target.id
      
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
        
        return allSelectedIsTrue;
    }

   

    dynamicSelectButtonClassName = () => {
        let className = "fa"
        let newMessages = this.state.messages.slice();
        newMessages = newMessages.filter((message)=> {
            return message.selected === true;
        })

        if(newMessages.length === this.state.messages.length){
            className += " fa-check-square-o"
        } else if(newMessages.length < this.state.messages.length && newMessages.length > 0){
            className += " fa-minus-square-o"
        } else {
            className += " fa-square-o"
        }

        return className;
    }




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


    handleDelete = () => {
        console.log("i am here")
        let newMessages = this.state.messages.slice();

        newMessages = newMessages.filter((message, index) => {
            return (message.selected === false || message.selected === undefined);
        })

        this.setState({
            messages: newMessages
        })

    }

   

    addLabel = (label) => {
        
        let newMessages = this.state.messages.slice();
        if(label !== "Apply label"){
        newMessages = newMessages.map((message, index)=> {
            if(message.selected === true && message.labels.indexOf(label) === -1){            
                              
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
            messages: newMessages
        })
    } 

    removeLabel = (label) => {
        
        let newMessages = this.state.messages.slice();
        
        newMessages = newMessages.map((message, index)=> {
            if(message.selected === true && message.labels.indexOf(label) !== -1){            
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
            messages: newMessages
        })
    } 

    
    

    render() {
       
        return (
            <div className="row toolbar">
                <div className="col-md-12">
                    <p className="pull-right">
                        <span className="badge badge" className='badge'>{this.unreadMessageCount()}</span>
                        unread messages
                    </p>

                    <button className="btn btn-default">
                        {/* <i className="fa fa-check-square-o" onClick={this.finalSelectState ? this.handleDeSelectAll : this.handleSelectAll}></i> */}
                        <i className={this.dynamicSelectButtonClassName()} onClick={this.finalSelectState ? this.handleDeSelectAll : this.handleSelectAll}></i>
                    </button>

                    <button className="btn btn-default" onClick={this.handleRead}>
                        Mark As Read
                    </button>

                    <button className="btn btn-default" onClick={this.handleUnRead}>
                        Mark As Unread
                    </button>

                    <select className="form-control label-select"  onChange={(e) => this.addLabel(e.target.value)}>
                        <option>Apply label</option>
                        <option  value="dev">dev</option>
                        <option  value="personal">personal</option>
                        <option  value="gschool">gschool</option>
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