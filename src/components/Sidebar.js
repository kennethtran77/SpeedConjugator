import React from 'react';

import Tenses from './Tenses.js';

import './Sidebar.css';

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDropdown: ''
        };
    }

    updateDropdown(newDropdown) {
        this.setState({
            currentDropdown: this.state.currentDropdown === newDropdown ? '' : newDropdown
        });
    }

    render() {
        return (
            <div id="sidebar-root">
                <div id="sidebar">
                    <button onClick={() => this.updateDropdown('pronouns')}>Pronouns</button>
                    <button onClick={() => this.updateDropdown('tenses')}>Tenses</button>
                    <button onClick={() => this.updateDropdown('moods')}>Moods</button>
                </div>
                { this.state.currentDropdown === 'tenses' && <Tenses getChecked={this.props.getChecked} toggleChecked={this.props.toggleChecked} /> }
            </div>
        )
    }
}


export default Sidebar;