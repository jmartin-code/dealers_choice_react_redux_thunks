import React, { Component } from 'react';
import { connect } from 'react-redux'
import Display from './components/Display';

//Components
import From from './components/From';
import Nav from './components/Nav';

import { fetchTodos, deleteTodo, updateTodo } from './store';

class App extends Component {
    componentDidMount() {
        this.props.loadTodos();
    }

    render() {
        return (
            <div>
                <Nav />
                <From />
                <Display />
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
        }
    }
}

export default connect(mapState, mapDispatch)(App)