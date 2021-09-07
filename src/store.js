import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

//Action Type
const LOAD_TODO = 'LOAD_TODO';
const ADD_TODO = 'ADD_TODO';
const DELETE_TODO = 'DELETE_TODO';
const SET_VIEW = 'SET_VIEW';

//Reducers
const todoReducer = (state = [], action) => {
    if (action.type === LOAD_TODO) {
        state = action.todos;
    }

    if (action.type === ADD_TODO) {
        state = [...state, action.addtodo];
    }

    if (action.type === DELETE_TODO) {
        state = state.filter(todo => todo.id !== action.deletedtodo.id)
    }

    return state;
}

const viewReducer = (state = '', action) => {
    if (action.type === SET_VIEW) {
        
    }
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

const store = createStore(reducer, applyMiddleware(thunk));

export default store;