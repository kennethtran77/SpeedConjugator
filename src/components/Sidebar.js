import React from 'react';

import Pronouns from './Pronouns';
import Tenses from './Tenses';
import Verbs from './Verbs';

import './Sidebar.css';

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDropdown: ''
        };
        
        this.createTogglebox = this.createTogglebox.bind(this);
    }

    updateDropdown(newDropdown) {
        this.setState({
            currentDropdown: this.state.currentDropdown === newDropdown ? '' : newDropdown
        });
    }

    /*
    category: e.g. tense, pronoun
    value: e.g. PRESENT, IMPARFAIT
    elementId: e.g. present-indicatif
    innerHTML: e.g. Présent Indicatif
    */
    createTogglebox(category, value, elementId, innerHTML) {
        return (
            <div>
                <input
                    type="checkbox" id={elementId} value={value}
                    checked={this.props.getChecked(category, value)}
                    onChange={() => this.props.toggleChecked(category, value)}/>
                <label htmlFor={elementId}>{innerHTML}</label>
            </div>
        );
    }

    render() {
        return (
            <div id="sidebar-root">
                <div id="sidebar">
                    <button onClick={() => this.updateDropdown('pronouns')}>Pronouns</button>
                    <button onClick={() => this.updateDropdown('tenses')}>Tenses</button>
                    <button onClick={() => this.updateDropdown('verbs')}>Verbs</button>
                </div>
                { this.state.currentDropdown === 'pronouns' && <Pronouns createTogglebox={this.createTogglebox} />}
                { this.state.currentDropdown === 'tenses' && <Tenses createTogglebox={this.createTogglebox} /> }
                { this.state.currentDropdown === 'verbs' && <Verbs createTogglebox={this.createTogglebox} /> }
                {/* { this.state.currentDropdown === 'pronouns' && <Pronouns getChecked={this.props.getChecked} toggleChecked={this.props.toggleChecked} />}
                { this.state.currentDropdown === 'tenses' && <Tenses getChecked={this.props.getChecked} toggleChecked={this.props.toggleChecked} /> } */}
            </div>
        )
    }
}


export default Sidebar;