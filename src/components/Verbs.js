import React from 'react';
import VerbTags from './VerbTags'

class Verbs extends React.Component {
    render() {
        return (
            <div id="dropdown">
                <h2>Verbs</h2>
                { this.props.createTogglebox('verbs', 'reflexive', 'reflexive', 'Reflexive Verbs', false) }
                { this.props.createTogglebox('verbs', 'ignore-accents', 'ignore-accents', 'Ignore Accents', false) }
                <br></br>
                <h3>Verb List</h3>
                <VerbTags
                    addToVerbList={this.props.addToVerbList}
                    removeFromVerbList={this.props.removeFromVerbList}
                    getVerbList={this.props.getVerbList}
                />
            </div>
        );
    }
}

export default Verbs;