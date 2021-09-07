import React from 'react';
import { connect } from 'react-redux';

import { setView } from '../store';

const Nav = ({ setView }) => {
    const handleChange = (e) => {
        const view = e.target.value;
        setView(view)
    }
    return (
        <nav>
            <div>
                <h1>MY TODO</h1>
                <h1>APP</h1>
            </div>
            <div>
                <label>
                    SELECT VIEW:
                    <select name="view" onChange={(e) => handleChange(e)}>
                        <option value='SHOW_ALL'>SHOW ALL</option>
                        <option value="TODO">TODO</option>
                        <option value="DONE">DONE</option>
                    </select>
                </label>
            </div>
        </nav>
    )
}

const mapState = (state) => state;
const mapDispatch = (dispatch) => {
    return {
        setView: (view) => {
            return dispatch(setView(view))
        }
    }
}
export default connect(mapState, mapDispatch)(Nav)