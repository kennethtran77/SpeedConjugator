import React from 'react';

import './VerbTags.css';

const Lefff = require('french-verbs-lefff/dist/conjugations.json');
const verbs = Object.keys(Lefff);

class VerbTags extends React.Component {

    constructor(props) {
        super(props);

        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    handleKeyDown(event) {
        const verb = event.target.value.toLowerCase();
        const verbList = this.props.getVerbList();

        if (event.key === 'Enter' && verb) {
            // Check if tag exists
            if (verbList.find(item => item.toLowerCase() === verb))
                return;
            
            // Check if this tag is a verb or has incomplete data
            if (!verbs.includes(verb) || verbs.some(key => verbs[verb] === null)) {
                alert("The verb \"" + verb + "\" was not found.");
                return;
            }

            this.tagInput.value = null;
            this.props.addToVerbList(verb);
        } else if (event.key === 'Backspace' && !verb) {
            if (verbList.length > 0)
                this.props.removeFromVerbList(verbList[verbList.length - 1]);
        }
    }

    render() {
        const verbList = this.props.getVerbList();

        return (
            <div className="verb-tags">
                <ul>
                    { verbList.map((tag, i) => (
                        <li key={tag}>
                            {tag} <button type="button" onClick={() => this.props.removeFromVerbList(tag) }></button>
                        </li>
                    ))}
                    <li className="verb-tags-input">
                        <input type="text" onKeyDown={this.handleKeyDown} ref={c => this.tagInput = c}></input>
                    </li>
                </ul>
            </div>
        )
    }
}

export default VerbTags;