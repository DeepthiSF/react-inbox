import React from 'react';

const Message = (props) => {
    
    let dynamicClass = "row message"

    const dynamicClassName = () => {
          let dynamicClass = "row message"
        if (props.data.selected === true && props.data.read === true) {
           dynamicClass += " read selected";
        } else if (props.data.selected === true && props.data.read === false) {
            dynamicClass += " unread selected";
        } else if (props.data.read === true) {
            dynamicClass += " read"
        } else {
            dynamicClass += " unread"
        }
        return dynamicClass;
    }

    
    return (
        <ul>
            <div
                className={dynamicClassName()}
            >
                <div className="col-xs-1">
                    <div className="row">
                        <div className="col-xs-2">
                            <input id={props.index} type="checkbox"
                                checked={props.data.selected? "checked":""} onChange={props.toggleSelected}/>                                
                        </div>
                        <div className="col-xs-2">
                            <i id={props.index} className={props.data.starred ? "star fa fa-star" : "star fa fa-star-o"} onClick={props.toggleStarred}></i>
                        </div>
                    </div>
                </div>
                <div className="col-xs-11">
                    {(props.data.labels).map((label, index) => {
                        return <span class="label label-warning">{label}</span>
                    })}
                    
                    <a href="#">
                    {props.data.subject}
                    </a>

                </div>
            </div>
        </ul >
    )


}



export default Message;