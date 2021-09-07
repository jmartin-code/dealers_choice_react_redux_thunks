import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

//Action Type
const LOADTRACKING = 'LOAD_TRACKING';
const ADDBUILDING = 'ADD_BUILDING';

//Reducers
const trackerReducre = (state = [], action) => {
    if (action.type === LOADTRACKING) {
        state = action.buildings;
    }

    if (action.type === ADDBUILDING) {
        state = action.addbuild;
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
        // console.log(buildings)

        //Dispatch all buildings
        dispatch({ type: LOADTRACKING, buildings: buildings })
    }
}

export const addBuilding = (id) => {
    return async (dispatch) => {
        try {
            const addbuild = (await axios.post('/api/buildings', { id })).data;

            // console.log(added)

            //Dispatch add building
            dispatch({ type: ADDBUILDING, addbuild })

        }
        catch (err) {
            console.log(err)
        }
    }
}

const store = createStore(reducer, applyMiddleware(thunk));

export default store;