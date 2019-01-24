import * as actionTypes from  '../actions/actionTypes';

const intialState = {
    searchesmade:0
}
const reducer = (state = intialState,action) => { 
    switch( action.type ) {
        case actionTypes.INC_SEARCHES:
            console.log("INC_SEARCHES...",state.searchesmade);
            return {
                ...state,
                searchesmade:state.searchesmade + 1
            }
        default:
            return state;
    } 
}

export default reducer;