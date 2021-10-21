const messageApiResponseReducer = (state = [], action) => {
   switch(action.type){
       case "Fetch_Response":
           state = action.response;
           return state;

        case "Starring_Message":
            state = action.response;
            return state;

        case "Select_Message":
            state = action.response;
            return state;

        case "SelectAll_Messages":
            state = action.response;
            return state;

        case "DeSelectAll_Messages":              
             state = action.response;            
             return state;

        case "MarkAsRead":              
             state = action.response;            
             return state;

        case "MarkAsUnRead":              
             state = action.response;            
             return state;

        case "DeleteMessages":              
             state = action.response;            
             return state;

        case "AddLabel":              
             state = action.response;            
             return state;

        case "DeleteLabel":              
             state = action.response;            
             return state;

        case "Create_Message":              
             state = action.response;            
             return state;

        default:
            return state;
   }  
}

export default messageApiResponseReducer;