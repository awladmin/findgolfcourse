//import * as actionTypes from  './actions';

const intialState = {
    searchesmade:0
}
const reducer = (state = intialState,action) => {    
    if(action.type === 'INC_SEARCHES'){
        return {
            searchesmade:state.searchesmade + 1
        }
    }
    return state;
}

export default reducer;