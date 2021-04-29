import React from 'react';

class Tenses extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (
            <div id="dropdown">
                <h2>Tenses</h2>
                <div className="options">
                    <input
                        type="checkbox" id="present" value="present"
                        checked={this.props.getChecked('tenses', 'present')}
                        onChange={() => this.props.toggleChecked('tenses', 'present')}/>
                    <label htmlFor="present">Présent</label>
                    <br/>
                    <input
                        type="checkbox" id="passe-compose" value="passe-compose"
                        checked={this.props.getChecked('tenses', 'passe-compose')}
                        onChange={() => this.props.toggleChecked('tenses', 'passe-compose')} />
                    <label htmlFor="passe-compose">Passé composé</label>
                    <br/>
                    <input
                        type="checkbox" id="imparfait" value="imparfait"
                        checked={this.props.getChecked('tenses', 'imparfait')}
                        onChange={() => this.props.toggleChecked('tenses', 'imparfait')} />
                    <label htmlFor="imparfait">Imparfait</label>
                </div>
            </div>
        );
    }
}

export default Tenses;