import React from 'react';

class Tenses extends React.Component {
    render() {
        return (
            <div id="dropdown">
                <h2>Tenses</h2>
                <h3>Indicatif</h3>
                { this.props.createTogglebox('tenses', 'PRESENT', 'present-indicatif', 'Présent') }
                { this.props.createTogglebox('tenses', 'PASSE_COMPOSE', 'passe-compose', 'Passé Composé') }
                { this.props.createTogglebox('tenses', 'IMPARFAIT', 'imparfait-indicatif', 'Imparfait') }
                { this.props.createTogglebox('tenses', 'PASSE_SIMPLE', 'passe-simple', 'Passé Simple') }
                { this.props.createTogglebox('tenses', 'PLUS_QUE_PARFAIT', 'plus-que-parfait', 'Plus-Que-Parfait') }
                { this.props.createTogglebox('tenses', 'CONDITIONNEL_PRESENT', 'conditionnel-present', 'Conditionnel Présent') }
                <h3>Subjonctif</h3>
                { this.props.createTogglebox('tenses', 'SUBJONCTIF_PRESENT', 'present-subjonctif', 'Subjonctif Présent') }
                { this.props.createTogglebox('tenses', 'SUBJONCTIF_IMPARFAIT', 'imparfait-subjonctif', 'Subjonctif Imparfait') }
                <h3>Impératif</h3>
                { this.props.createTogglebox('tenses', 'IMPERATIF_PRESENT', 'present-imperatif', 'Présent') }
            </div>
        );
    }
}

export default Tenses;