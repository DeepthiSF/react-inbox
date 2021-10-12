import React from 'react';
import Message from './Message';
import messages from './MessageData';


const MessageList = () => {

    const messageList = messages.map((message, index, messages) => {
        return <Message key={index} data={message} />
    })

    return (
        <div className='messageList'>
            {messageList}
        </div>
    )



}

export default MessageList;
