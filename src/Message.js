import React from 'react';

class Message extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // read: false,
            // selected: false,
            starred: this.props.data.starred,

        }
    }

    markRead = () => {
        this.setState({
            read: true,
        });
    }

    handleStarred = ()=> {
        // console.log("starred")
        this.setState({
            starred: !this.state.starred
                     
        })
    }

    render() {
        return (
            <ul>
            <div className=
                 {
                 this.props.data.read ?
                     ("row message read")
                     : ("row message unread")
                 }>
                <div className="col-xs-1">
                   <div className="row">
                         <div className="col-xs-2">
                          <input type="checkbox" 
                         checked={this.props.data.selected? "checked":""}/>
                         </div>
                         <div className="col-xs-2">
                         <i className={this.state.starred? "star fa fa-star":"star fa fa-star-o"} onClick={this.handleStarred}></i>
                         </div>
                   </div>
                 </div>
             <div className="col-xs-11">
                 {(this.props.data.labels).map((label,index) => {
                     return <span class="label label-warning">{label}</span>
                 })}
               
                 {this.props.data.subject}
               
             </div>
         </div>
         </ul >
        )
    }
}


// const Message = (props) => {

//     return (
//         <ul>
//             <div className=
//                 {
//                 props.data.read ?
//                     ("row message read")
//                     : ("row message unread")
//                 }>
                
//                 <div className="col-xs-1">
//                   <div className="row">
//                         <div className="col-xs-2">
//                          <input type="checkbox" 
//                          checked={props.data.selected? "checked":""}/>
//                         </div>
//                         <div className="col-xs-2">
//                          <i className={props.data.starred? "star fa fa-star":"star fa fa-star-o"}></i>
//                         </div>
//                   </div>
//                 </div>
//             <div className="col-xs-11">
//                 {(props.data.labels).map((label,index) => {
//                     return <span class="label label-warning">label</span>
//                 })}
               
//                 {props.data.subject}
               
//             </div>
//         </div>
//         </ul >
//     )
// }

export default Message;