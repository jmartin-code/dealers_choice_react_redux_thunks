import React, { Component } from 'react';
import { connect } from 'react-redux'

import { loadBuilding } from './store';
import store from './store'

class App extends Component {
    handleChange(e) {
        console.log(e.target.value)
    }

    componentDidMount() {
        this.props.loadBuilding();
    }

    render() {
        // console.log(this.props)
        const { tracker } = this.props;
        console.log(tracker)
        return (
            <div>
                <nav>
                    <div>
                        <h1>NYC BUILDING</h1>
                        <h1>VIOLATION TRACKER</h1>
                    </div>
                    <div>
                        <label>
                            SELECT BOROUGH:
                            <select onChange={this.handleChange}>
                                <option value='SHOW_ALL'>SHOW ALL</option>
                                <option value="BRONX">BRONX</option>
                                <option value="BROOKLYN">BROOKLYN</option>
                                <option value="MANHATTAN">MANHATTAN</option>
                                <option value="QUEENS">QUEENS</option>
                                <option value="STATEN_ISLAND">STATEN ISLAND</option>
                            </select>
                        </label>
                    </div>
                </nav>

                <main>
                    <div className="container">
                        <div className='building-card'>
                            <h1>hello</h1>
                            <h1>{tracker.length}</h1>
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}

const mapState = (state) => {
    return state;
}

const mapDispatch = (dispatch) => {
    return {
        loadBuilding: () => {
            return dispatch(loadBuilding())
        }
    }
}

export default connect(mapState, mapDispatch)(App)