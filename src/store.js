import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

//Action Type
const LOAD_TODO = 'LOAD_TODO';
const ADD_TODO = 'ADD_TODO';

//Reducers
const todoReducer = (state = [], action) => {
    if (action.type === LOAD_TODO) {
        state = action.todos;
    }

    if (action.type === ADD_TODO) {
        state = [...state, action.addtodo];
    }

    return state;
}

const reducer = combineReducers({ todos: todoReducer })

export const fetchTodos = () => {
    return async (dispatch) => {
        const todos = (await axios.get('/api/todos')).data; //Fetch todos
        dispatch({ type: LOAD_TODO, todos }); //Dispatch todos
    }
}

export const addTodo = (todo) => {
    return async (dispatch) => {
        try {
            const addtodo = (await axios.post('/api/todos', { todo })).data;
            dispatch({ type: ADD_TODO, addtodo })
        }
        catch (err) {
            console.log(err)
        }
    }
}

const store = createStore(reducer, applyMiddleware(thunk));

export default store;