import React, { Component } from 'react';
import { connect } from 'react-redux'

import { trackingBuilding } from './store';

class App extends Component {
    handleChange(e) {
        console.log(e.target.value)
    }

    componentDidMount() {
        this.props.trackingBuilding();
    }

    render() {
        const { tracker } = this.props;
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
                        {tracker.map(building => {
                            return (
                                <div className='building-card' key={building.id}>
                                    <h2>BUILDING </h2>
                                    <p>{building.identifier}</p>
                                    <h4>{building.violations[0].respondent_house_number} {building.violations[0].respondent_street}</h4>
                                    <h4>{boro(building.violations[0].boro)}</h4>
                                    <p>Total Violations = {building.violations.length}</p>
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
        trackingBuilding: () => {
            return dispatch(trackingBuilding())
        }
    }
}

export default connect(mapState, mapDispatch)(App)