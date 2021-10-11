import React from 'react';

// class Message extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             read: false,
//             selected: false,
//             starred: false,
//         }
//     }

//     const markRead = () => {
//         this.setState({
//             read: true,
//         });
//     }

//     render() {
//         return (
//             <div>
//                 {
//                     this.state.read ?
//                         (<div className="row message read"></div>)
//                         : (<div className="row message unread" onClick={this.markRead}></div>)
//                 }
//                 <div class="col-xs-1">
//                     <div class="row">
//                         <div class="col-xs-2">
//                             <input type="checkbox" className='message' />
//                         </div>
//                         <div class="col-xs-2">
//                             <i class="star fa fa-star-o"></i>
//                         </div>
//                     </div>
//                 </div>
//                 <div class="col-xs-11">
//                     <h2> {this.props.data.subject} </h2>
//                 </div>
//             </div>
//         )
//     }
// }


const Message = (props) => {

    return (
        <ul>
            <div className=
                {
                props.data.read ?
                    ("row message read")
                    : ("row message unread")
                }>
                
                <div className="col-xs-1">
                  <div className="row">
                        <div className="col-xs-2">
                         <input type="checkbox" 
                         checked={props.data.selected? "checked":""}/>
                        </div>
                        <div className="col-xs-2">
                         <i className={props.data.starred? "star fa fa-star":"star fa fa-star-o"}></i>
                        </div>
                  </div>
                </div>
            <div className="col-xs-11">
                {(props.data.labels).map((label,index) => {
                    return <span class="label label-warning">label</span>
                })}
               
                {props.data.subject}
               
            </div>
        </div>
        </ul >
    )
}

export default Message;