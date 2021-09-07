import React, { Component } from 'react';
import { connect } from 'react-redux'

import { fetchTodos, addTodo, deleteTodo, updateTodo } from './store';

class App extends Component {
    constructor() {
        super()
        this.state = {
            title: '',
            content: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }

    handleDelete() {

    }

    handleChange(id, e) {
        const name = e.target.name;
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

        if (e.target.type === 'checkbox') {
            this.props.updateTodo(id, value);
        }
        else {
            this.setState({ [name]: value });
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.addTodo(this.state);
        this.setState({
            title: '',
            content: ''
        })
        console.log('Todo Added')
    }

    componentDidMount() {
        this.props.loadTodos();
    }

    render() {
        const { todos, deleteTodo } = this.props;
        const { handleChange, handleSubmit } = this;

        if (!todos) {
            return (<p>...LOADING</p>)
        }

        return (
            <div>
                <nav>
                    <div>
                        <h1>MY TODO</h1>
                        <h1>APP</h1>
                    </div>
                    <div>
                        <label>
                            SELECT VIEW:
                            <select onChange={handleChange}>
                                <option name="view" value='SHOW_ALL'>SHOW ALL</option>
                                <option name="view" value="TODO">TODO</option>
                                <option name="view" value="DONE">DONE</option>
                            </select>
                        </label>
                    </div>
                </nav>
                <form onSubmit={handleSubmit}>
                    <label>
                        Title:
                        <br />
                        <input type='text' name='title' value={this.state.title} onChange={handleChange} />
                    </label>
                    <label>
                        Content:
                        <br />
                        <textarea type='text' name='content' value={this.state.content} onChange={handleChange} />
                    </label>
                    <button>Add</button>
                </form>
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
                                            <input type="checkbox" checked={todo.isCheck} onChange={(e) => handleChange(todo.id, e)} />
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
        addTodo: (todo) => {
            return dispatch(addTodo(todo))
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