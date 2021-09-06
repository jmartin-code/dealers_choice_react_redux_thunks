import React, { Component } from 'react';
import { connect } from 'react-redux'

class App extends Component {
    handleChange(e) {
        console.log(e.target.value)
    }

    render() {

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

                    </div>
                </main>
            </div>
        )
    }
}

export default connect()(App)