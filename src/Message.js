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

//    const markRead = () => {
//         setState({
//              props.data.read: true,
//         })
//     }

    return (
        <ul>
            <div className=
                {
                props.data.read ?
                    ("row message read")
                    : ("row message unread")
                }
                >
                
                <div className="col-xs-1">
                  <div className="row">
                        <div className="col-xs-2">
                         <input type="checkbox" />
                        </div>
                        <div className="col-xs-2">
                         <i className="star fa fa-star-o"></i>
                        </div>
                  </div>
                </div>
            <div className="col-xs-11">
                
                    {props.data.subject}
               
            </div>
        </div>
        </ul >
    )
}

export default Message;