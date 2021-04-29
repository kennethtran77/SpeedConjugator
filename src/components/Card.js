import React from 'react';

import './Card.css';

class Card extends React.Component {
    render() {
        return (
            <div id="card">
                
                <h3 id='tense'>Present</h3>
                <form>
                    <div id="pronun">Je</div>
                    <input type="text"></input>
                    <div id="verb">(manger)</div>
                </form>
            </div>
        );
    }
}

export default Card;