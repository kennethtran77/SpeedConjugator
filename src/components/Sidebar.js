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
        this.setState({ currentDropdown: this.state.currentDropdown === newDropdown ? '' : newDropdown });
    }

    /*
    Return a togglebox to control keys within App.state.checked.

    category: The category of this togglebox.
        e.g. tense, pronoun, verb
    key: The keyname of this togglebox. Should correspond to a key in App.state.checked.
        e.g. PRESENT, IMPARFAIT, reflexive
    elementId: The HTML element ID for this togglebox.
        e.g. present-indicatif
    innerHTML: The displayname for this togglebox.
        e.g. Présent Indicatif
    atleastOne: Require whether or not at least one togglebox of this category must be activated at all times.
    */
    createTogglebox(category, key, elementId, innerHTML, atleastOne = true) {
        return (
            <div>
                <input
                    type="checkbox" id={elementId} value={key}
                    checked={this.props.getChecked(category, key)}
                    onChange={() => this.props.toggleChecked(category, key, atleastOne)}/>
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
                { this.state.currentDropdown === 'pronouns' &&
                    <Pronouns createTogglebox={this.createTogglebox}
                />}
                { this.state.currentDropdown === 'tenses' &&
                    <Tenses createTogglebox={this.createTogglebox} 
                />}
                { this.state.currentDropdown === 'verbs' &&
                    <Verbs
                        createTogglebox={this.createTogglebox}
                        addToVerbList={this.props.addToVerbList}
                        removeFromVerbList={this.props.removeFromVerbList}
                        getVerbList={this.props.getVerbList}
                    />
                }
            </div>
        )
    }
}


export default Sidebar;