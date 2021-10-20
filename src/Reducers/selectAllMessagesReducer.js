const selectAllMessagesReducer = (state = false, action) => {
        switch(action.type){
            case "AllMessagesSelected":
                state = action.response;
                return state;
            
            case "AllMessagesDeSelected":
                state = action.response;
                return state;
     
             default:
                 return state;
        }  
     }
     
     export default selectAllMessagesReducer;