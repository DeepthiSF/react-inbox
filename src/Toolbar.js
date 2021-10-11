import React from 'react';
import { messages } from './MessageList';

const Toolbar = () => {

    // const handleRead = () => {
    //     return (
    //         // if(messages.)
    //         <div class="row message read">
    //             <div class="col-xs-1">
    //                 <div class="row">
    //                     <div class="col-xs-2">
    //                         <input type="checkbox" />
    //                     </div>
    //                     <div class="col-xs-2">
    //                         <i class="star fa fa-star-o"></i>
    //                     </div>
    //                 </div>
    //             </div>
    //             {/* <div class="col-xs-11">
    //                 <a href="#">
    //                     Here is some message text that has a bunch of stuff
    //                 </a>
    //             </div> */}
    //         </div>
    //     )

    // }

    return (
        <div class="row toolbar">
            <div class="col-md-12">
                <p class="pull-right">
                    <span class="badge badge" className='badge'>0</span>
                    unread messages
                </p>

                <button class="btn btn-default">
                    <i class="fa fa-check-square-o"></i>
                </button>

                <button class="btn btn-default" >
                    Mark As Read
                </button>

                <button class="btn btn-default">
                    Mark As Unread
                </button>

                <select class="form-control label-select">
                    <option>Apply label</option>
                    <option value="dev">dev</option>
                    <option value="personal">personal</option>
                    <option value="gschool">gschool</option>
                </select>

                <select class="form-control label-select">
                    <option>Remove label</option>
                    <option value="dev">dev</option>
                    <option value="personal">personal</option>
                    <option value="gschool">gschool</option>
                </select>

                <button class="btn btn-default">
                    <i class="fa fa-trash-o"></i>
                </button>
            </div>
        </div>
    )
}

export default Toolbar;