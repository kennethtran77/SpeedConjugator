import React from 'react';

class Verbs extends React.Component {
    render() {
        return (
            <div id="dropdown">
                <h2>Verbs</h2>
                { this.props.createTogglebox('verbs', 'reflexive', 'reflexive', 'Reflexive Verbs', false) }
            </div>
        );
    }
}

export default Verbs;