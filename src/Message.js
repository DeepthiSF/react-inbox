import React from 'react';

const Message = (props) => {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         read: this.props.data.read,
    //         selected: this.props.data.selected,
    //         starred: this.props.data.starred,
    //     }
    // }

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
                // className={this.props.dynamicClassName()}
            >
                <div className="col-xs-1">
                    <div className="row">
                        <div className="col-xs-2">
                            <input type="checkbox"
                                // checked={props.data.selected? "checked":""} onChange={this.handleSelected}/>
                                checked={props.data.selected? "checked":""} />
                                 {/* checked={this.state.selected? "checked":""} onChange={this.props.handleSelected}/> */}
                        </div>
                        <div className="col-xs-2">
                            <i id={props.index} className={props.data.starred ? "star fa fa-star" : "star fa fa-star-o"} onClick={props.handleStarred}></i>
                            {/* <i  className={props.data.starred ? "star fa fa-star" : "star fa fa-star-o"} ></i> */}
                            {/* <i className={this.state.starred ? "star fa fa-star" : "star fa fa-star-o"} onClick={this.props.handleStarred}></i> */}
                        </div>
                    </div>
                </div>
                <div className="col-xs-11">
                    {(props.data.labels).map((label, index) => {
                        return <span class="label label-warning">{label}</span>
                    })}
                    {/* {(this.props.labels).map((label, index) => {
                        return <span class="label label-warning">{label}</span>
                    })} */}
                    <a href="#">
                    {props.data.subject}
                    </a>

                </div>
            </div>
        </ul >
    )


}



export default Message;