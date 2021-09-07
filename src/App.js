import React, { Component } from 'react';
import { connect } from 'react-redux'

import { fetchTodos, addTodo, deleteTodo, updateTodo, setView } from './store';

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

    handleChange(e, id) {
        if (e.target.name === 'view') {
            const view = e.target.value
            // console.log(view)
            this.props.setView(view)
        }
        else if (e.target.type === 'checkbox') {
            const value = e.target.checked
            this.props.updateTodo(id, value);
        }
        else {
            const value = e.target.value;
            const name = e.target.name;
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
                <nav>
                    <div>
                        <h1>MY TODO</h1>
                        <h1>APP</h1>
                    </div>
                    <div>
                        <label>
                            SELECT VIEW:
                            <select name="view" onChange={handleChange}>
                                <option value='SHOW_ALL'>SHOW ALL</option>
                                <option value="TODO">TODO</option>
                                <option value="DONE">DONE</option>
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
        addTodo: (todo) => {
            return dispatch(addTodo(todo))
        },
        deleteTodo: (id) => {
            return dispatch(deleteTodo(id))
        },
        updateTodo: (id, check) => {
            return dispatch(updateTodo(id, check))
        },
        setView: (view) => {
            return dispatch(setView(view))
        }
    }
}

export default connect(mapState, mapDispatch)(App)