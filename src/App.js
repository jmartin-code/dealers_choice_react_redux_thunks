import React, { Component } from 'react';
import { connect } from 'react-redux'

//Components
import From from './components/From';
import Nav from './components/Nav';

import { fetchTodos, deleteTodo, updateTodo } from './store';

class App extends Component {
    constructor() {
        super()
        this.handleChange = this.handleChange.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }

    handleDelete() {

    }

    handleChange(e, id) {
        const value = e.target.checked
        this.props.updateTodo(id, value);

    }

    componentDidMount() {
        this.props.loadTodos();
    }

    render() {
        let { todos, deleteTodo, view } = this.props;
        const { handleChange, handleSubmit } = this;

        if (view === 'DONE') {
            todos = todos.filter(todo => todo.isCheck)
        }
        if (view === 'TODO') {
            todos = todos.filter(todo => !todo.isCheck)
        }

        if (!todos) {
            return (<p>...LOADING</p>)
        }

        return (
            <div>
                <Nav />
                <From />
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
            </div >
        )
    }
}

const mapState = (state) => {
    return state;
}

const mapDispatch = (dispatch) => {
    return {
        loadTodos: () => {
            return dispatch(fetchTodos())
        },
        deleteTodo: (id) => {
            return dispatch(deleteTodo(id))
        },
        updateTodo: (id, check) => {
            return dispatch(updateTodo(id, check))
        }
    }
}

export default connect(mapState, mapDispatch)(App)