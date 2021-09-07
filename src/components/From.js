import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../store';

const Form = ({ addTodo }) => {
    const [todo, setTodo] = useState({
        title: '',
        content: ''
    });

    const handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setTodo((prev) => ({
            ...prev, [name]: value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addTodo(todo);

        setTodo({
            title: '',
            content: ''
        })
        console.log('Todo Added')
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Title
                <br />
                <input type='text' size="50" required name='title' value={todo.title} onChange={handleChange} />
            </label>
            <label>
                Content
                <br />
                <textarea type='text' cols="52" name='content' value={todo.content} onChange={handleChange} />
            </label>
            <button>Add</button>
        </form>
    )
}

const mapState = (state) => state;
const matDispatch = (dispatch) => {
    return {
        addTodo: (todo) => {
            return dispatch(addTodo(todo))
        }
    }
}
export default connect(mapState, matDispatch)(Form)