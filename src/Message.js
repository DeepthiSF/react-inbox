import React from 'react';
import {connect} from 'react-redux'

const Message = (props) => {
    
    let dynamicClass = "row message"

    // To check the status of an individual message whether it is read or selected and display the message accordingly.
    // If the message is read then the message will not be in bold. If it is unread then it will be bold
    // If message is selected then the background will b highlighted in yellow
    const dynamicClassName = () => {
          let dynamicClass = "row message"
        if (props.apiResponse[props.index].selected === true && props.apiResponse[props.index].read === true) {
           dynamicClass += " read selected";
           console.log(dynamicClass)
        } else if (props.apiResponse[props.index].selected === true && props.apiResponse[props.index].read === false) {
            dynamicClass += " unread selected";
        } else if (props.apiResponse[props.index].read === true) {
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
                            <input id={(props.index)} type="checkbox"
                                checked={props.apiResponse[props.index].selected? "checked":""} onChange={props.toggleSelected}/>                                
                                
                        </div>
                        <div className="col-xs-2">
                            <i id={(props.index)} className={props.apiResponse[props.index].starred ? "star fa fa-star" : "star fa fa-star-o"} onClick={props.toggleStarred} ></i>
                        </div>
                    </div>
                </div>
                <div className="col-xs-11">                    

                    {(props.apiResponse[props.index].labels).map((label, index) => {
                        return <span class="label label-warning">{label}</span>
                    })}
                    
                    <a href="#">
                    {props.apiResponse[props.index].subject}
                    </a>

                </div>
            </div>
        </ul >
    )


}


const mapStateToProps = (state) => {
    return {
        apiResponse: state.ApiResponse
    }
}

export default connect(mapStateToProps)(Message);