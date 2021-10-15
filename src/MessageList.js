import Message from './Message';

function MessageList(props) {

    const messageList = props.messages.map((message, index) => {
        return <Message
        key={index} 
        data= {message}
        index = {index}
        toggleStarred={props.toggleStarred}
        toggleSelected={props.toggleSelected}
        />
    })

    return (
        <div >
            {messageList}
        </div>
    )

}

export default MessageList;

