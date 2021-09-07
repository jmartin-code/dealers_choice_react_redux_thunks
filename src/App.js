import React, { Component } from 'react';
import { connect } from 'react-redux'

import { fetchTodos, addTodo } from './store';

class App extends Component {
    constructor() {
        super()
        this.state = {
            title: '',
            content: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleInputChange(e) {
        // console.log(e.target.value)
        this.setState({
            input: e.target.value
        });
        // console.log(this.state.input)
    }

    handleChange(e) {
        // console.log(e.target.value)
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.addBuilding(this.state.input);
        console.log('added')
    }

    componentDidMount() {
        this.props.loadTodos();
    }

    render() {
        const { todos } = this.props;
        // console.log(todos)
        const { handleChange, handleSubmit, handleInputChange } = this;

        return (
            <div>
                <nav>
                    <div>
                        <h1>MY TODO</h1>
                        <h1>APP</h1>
                    </div>
                    <div>
                        <label>
                            SELECT:
                            <select onChange={handleChange}>
                                <option value='SHOW_ALL'>SHOW ALL</option>
                                <option value="BRONX">TODO</option>
                                <option value="BROOKLYN">DONE</option>
                            </select>
                        </label>
                    </div>
                </nav>
                <form onSubmit={handleSubmit}>
                    <label>
                        Title:
                        <br />
                        <input type='text' value={this.state.title} onChange={handleInputChange} />
                    </label>
                    <label>
                        Content:
                        <br />
                        <textarea type='text' value={this.state.content} onChange={handleInputChange} />
                    </label>
                    <button type="submit">Add</button>
                </form>
                <main>
                    <div className="container">
                        {todos.map(todo => {
                            return (
                                <div className='todo-card' key={todo.id}>
                                    <h3>{todo.title}</h3>
                                    <p>Content</p>
                                    <p>{todo.content}</p>
                                    <button>Edit</button>
                                    <button>Delete</button>
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
        }
    }
}

export default connect(mapState, mapDispatch)(App)