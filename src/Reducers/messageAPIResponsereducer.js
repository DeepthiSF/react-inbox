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

        default:
            return state;
   }  
}

export default messageApiResponseReducer;