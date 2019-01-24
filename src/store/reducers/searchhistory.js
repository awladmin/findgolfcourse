import * as actionTypes from  '../actions/actionTypes';

const intialState = {
    searchcoursehistory:[]
}
const reducer = (state = intialState,action) => { 
    switch( action.type ) {
        case actionTypes.HISTORY_ADD:
        console.log("action: ",action.id);
        console.log("action: ",action.title);
            return {
                ...state,
                searchcoursehistory: state.searchcoursehistory.concat({id:action.id,title:action.title})
            }
        default:
            return state;
    } 
}

export default reducer;