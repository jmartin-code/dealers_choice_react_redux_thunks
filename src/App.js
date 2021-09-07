import React, { Component } from 'react';
import { connect } from 'react-redux'

import { trackingBuilding, addBuilding } from './store';

class App extends Component {
    constructor() {
        super()
        this.state = {
            input: ''
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
        this.props.trackingBuilding();
    }

    render() {
        const { tracker } = this.props;
        console.log(tracker)
        const { handleChange, handleSubmit, handleInputChange } = this;
        // console.log(tracker)
        const boro = (boroId) => {
            switch (boroId) {
                case "1":
                    return 'MANHATTAN'
                case "2":
                    return 'BRONX'
                case "3":
                    return 'BROOKLYN'
                case "4":
                    return 'QUEENS'
                case "5":
                    return 'STATEN ISLAND'
                default:
                    return "MANHATTAN"
            }
        }
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
                            <select onChange={handleChange}>
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
                    <form onSubmit={handleSubmit}>
                        <label>
                            Enter Building Identifier:
                            <br />
                            <input type='text' value={this.state.input} onChange={handleInputChange} />
                        </label>
                        <button type="submit">Add Building</button>
                    </form>
                    <div className="container">
                        {tracker.map(buildings => {
                            return (
                                {
                                    buildings.map(building => {
                                        <div className='building-card' key={building.id}>
                                            return (
                                            <h2>BUILDING </h2>
                                            <p>{buildings.identifier}</p>
                                            <h4>{building.violations.respondent_house_number} {building.violations.respondent_street}</h4>
                                            <h4>{boro(building.violations.boro)}</h4>
                                            <p>Total Violations = {building.violations.length}</p>
                                            )
                                        </div>
                                    })
                                }
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
        trackingBuilding: () => {
            return dispatch(trackingBuilding())
        },
        addBuilding: (id) => {
            return dispatch(addBuilding(id))
        }
    }
}

export default connect(mapState, mapDispatch)(App)