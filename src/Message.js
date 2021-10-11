const Message = (props) => {
    return (
        <ul>
            {/* <input type="checkbox" />
                <h2> {props.subject} </h2> */}
            <div class="row message unread">
                <div class="col-xs-1">
                    <div class="row">
                         <div class="col-xs-2">
                            <input type="checkbox" className='message' />
                        </div>
                        <div class="col-xs-2">
                            <i class="star fa fa-star-o"></i>
                        </div>
                    </div>
                </div>
                <div class="col-xs-11">
                    <h2> className='message' {props.subject} </h2>
                </div>
            </div>
        </ul>
    )
}

export default Message;