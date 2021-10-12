import React from 'react';

class Message extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            read: this.props.data.read,
            selected: this.props.data.selected,
            starred: this.props.data.starred,
        }
    }

    dynamicClass = "row message"

    dynamicClassName = () => {
        this.dynamicClass = "row message"
        if (this.state.selected === true && this.state.read === true) {
            this.dynamicClass += " read selected";
        } else if (this.state.selected === true && this.state.read === false) {
            this.dynamicClass += " unread selected";
        } else if (this.state.read === true) {
            this.dynamicClass += " read"
        } else {
            this.dynamicClass += " unread"
        }
        return this.dynamicClass;
    }


    // handleRead = () => {
    //     this.setState({
    //         read: true,
    //     });
    // }

    handleStarred = () => {
        
        this.setState({
            starred: !this.state.starred,

        })
    }

    handleSelected = () => {
        // this.setState({
        //     selected: true,
        //     read: true,
        // })
        // if(this.state.selected === true && this.state.read === true){
        //     this.dynamicClassName += " read selected";
        //     this.state.selected = true;
        // } else if(this.state.selected === true && this.state.read === false) {
        //     this.dynamicClassName += " unread selected";
        //     this.state.selected = false;
        // }
        console.log("selected")
        // if (this.state.read === true) {
        //     this.dynamicClassName += " read"
        //     this.setState({
        //         read: true
        //     })
        // } else {
        //     this.dynamicClassName += " unread"
        // }
        // if (this.state.selected === true) {
        //     this.dynamicClass += " selected"
        this.setState({
            selected: !this.state.selected
        })
        
    }
    


render() {
    return (
        <ul>
            <div
                className={this.dynamicClassName()}
            >
                {/* className={
                         this.props.data.read ?
                             ("row message read")
                             : ("row message unread")
                     }> */}
                <div className="col-xs-1">
                    <div className="row">
                        <div className="col-xs-2">
                            <input type="checkbox"
                                checked={this.state.selected? "checked":""} onChange={this.handleSelected}/>
                                {/* defaultChecked={this.state.selected ? true : false} onClick={this.handleSelected} /> */}
                        </div>
                        <div className="col-xs-2">
                            <i className={this.state.starred ? "star fa fa-star" : "star fa fa-star-o"} onClick={this.handleStarred}></i>
                        </div>
                    </div>
                </div>
                <div className="col-xs-11">
                    {(this.props.data.labels).map((label, index) => {
                        return <span class="label label-warning">{label}</span>
                    })}

                    {this.props.data.subject}

                </div>
            </div>
        </ul >
    )
}

}



export default Message;