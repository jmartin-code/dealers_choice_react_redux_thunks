import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

//Action Type
const LOADTRACKING = 'LOAD_TRACKING';

//Reducers
const trackerReducre = (state = [], action) => {
    if (action.type === LOADTRACKING) {
        state = action.buildings;
    }
    return state;
}

const reducer = combineReducers({ tracker: trackerReducre })

export const trackingBuilding = () => {
    return async (dispatch) => {
        //Tracking ids
        const tracking = (await axios.get('/api/buildings')).data;

        //Get buildings based on tracking ids
        const response = await Promise.all(tracking.map(track => axios.get(`/api/buildings/${track.buildingId}`)))
        const buildings = response.map(building => building.data);

        //dispatch buildings
        dispatch({ type: LOADTRACKING, buildings: buildings[0] })
    }
}

const store = createStore(reducer, applyMiddleware(thunk));

export default store;