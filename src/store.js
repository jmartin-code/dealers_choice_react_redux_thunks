import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

//Action Type
const LOADTRACKING = 'LOAD_TRACKING';

//Reducers
const trackerReducre = (state = [], action) => {
    if (action.type === LOADTRACKING) {
        state = action.tracking;
    }
    return state;
}

const reducer = combineReducers({ tracker: trackerReducre })

export const loadBuilding = () => {
    return async (dispatch) => {
        const tracking = (await axios.get('/api/buildings')).data
        // console.log(tracking)
        dispatch({ type: LOADTRACKING, tracking })
    }
}

const store = createStore(reducer, applyMiddleware(thunk));

export default store;