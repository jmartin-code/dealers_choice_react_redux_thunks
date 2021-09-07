import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import logger from 'redux-logger';

//Action Type
const LOAD_TODO = 'LOAD_TODO';
const ADD_TODO = 'ADD_TODO';
const UPDATE_TODO = 'UPDATE_TODO';
const DELETE_TODO = 'DELETE_TODO';
const SET_VIEW = 'SET_VIEW';


//Action creators
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
export const updateTodo = (id, check) => {
    return async (dispatch) => {
        try {
            const updatetodo = (await axios.put(`/api/todos/${id}`, { check })).data;
            dispatch({ type: UPDATE_TODO, updatetodo })
        }
        catch (err) {
            console.log(err)
        }
    }
}

export const deleteTodo = (id) => {
    return async (dispatch) => {
        try {
            const deletedtodo = (await axios.delete(`/api/todos/${id}`)).data;
            dispatch({ type: DELETE_TODO, deletedtodo })
        }
        catch (err) {
            console.log(err)
        }
    }
}

export const setView = (view) => {
    return (dispatch) => {
        dispatch({ type: SET_VIEW, view })
    }
}

//Reducers
const todoReducer = (state = [], action) => {
    if (action.type === LOAD_TODO) {
        state = action.todos.sort((a, b) => a.id - b.id);
    }

    if (action.type === ADD_TODO) {
        state = [...state, action.addtodo].sort((a, b) => a.id - b.id);
    }

    if (action.type === UPDATE_TODO) {
        state = [...state.filter(todo => todo.id !== action.updatetodo.id), action.updatetodo].sort((a, b) => a.id - b.id);
    }

    if (action.type === DELETE_TODO) {
        state = state.filter(todo => todo.id !== action.deletedtodo.id).sort((a, b) => a.id - b.id);
    }

    return state;
}

const viewReducer = (state = 'SHOW_ALL', action) => {
    if (action.type === SET_VIEW) {
        state = action.view;
    }
    return state
}

//Combining reducers and create store.
const reducer = combineReducers({ todos: todoReducer, view: viewReducer })
const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;