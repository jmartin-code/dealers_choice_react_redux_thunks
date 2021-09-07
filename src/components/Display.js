import React from "react";
import { connect } from "react-redux";

import { deleteTodo, updateTodo } from '../store';

const Display = (props) => {
    let { todos } = props;
    const { deleteTodo, updateTodo, view } = props;

    if (view === 'DONE') {
        todos = todos.filter(todo => todo.isCheck)
    }
    if (view === 'TODO') {
        todos = todos.filter(todo => !todo.isCheck)
    }

    const handleChange = (e, id) => {
        const value = e.target.checked
        updateTodo(id, value);
    }

    if (!todos) {
        return (<p>...LOADING</p>)
    }
    return (
        <main>
            <div className="container">
                {todos.map(todo => {
                    return (
                        <div className='todo-card' key={todo.id}>
                            <div>
                                <h3>{todo.title}</h3>
                                <p>Content</p>
                                <p>{todo.content}</p>
                                <label>
                                    Check{' '}
                                    <input type="checkbox" checked={todo.isCheck} onChange={(e) => handleChange(e, todo.id)} />
                                </label>
                            </div>
                            {/* <button>Edit</button> */}
                            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                        </div>
                    )
                })}
            </div>
        </main >
    )
}
const mapState = (state) => state;

const mapDispatch = (dispatch) => {
    return {
        deleteTodo: (id) => {
            return dispatch(deleteTodo(id))
        },
        updateTodo: (id, check) => {
            return dispatch(updateTodo(id, check))
        }
    }
}

export default connect(mapState, mapDispatch)(Display)