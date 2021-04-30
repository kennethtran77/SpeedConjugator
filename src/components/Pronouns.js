import React from 'react';

class Pronouns extends React.Component {
    render() {
        return (
            <div id="dropdown">
                <h2>Pronouns</h2>
                { this.props.createTogglebox('pronouns', 'je', 'je', 'Je') }
                { this.props.createTogglebox('pronouns', 'tu', 'tu', 'Tu') }
                { this.props.createTogglebox('pronouns', 'il/elle/on', 'il-elle-on', 'Il/Elle/On') }
                { this.props.createTogglebox('pronouns', 'nous', 'nous', 'Nous') }
                { this.props.createTogglebox('pronouns', 'vous', 'vous', 'Vous') }
                { this.props.createTogglebox('pronouns', 'ils/elles', 'ils-elles', 'Ils/Elles') }
                {/* <div className="options">
                    <input
                        type="checkbox" id="je" value="je"
                        checked={this.props.getChecked('pronouns', 'je')}
                        onChange={() => this.props.toggleChecked('pronouns', 'je')}/>
                    <label htmlFor="je">Je</label>
                    <br/>
                    <input
                        type="checkbox" id="tu" value="tu"
                        checked={this.props.getChecked('pronouns', 'tu')}
                        onChange={() => this.props.toggleChecked('pronouns', 'tu')}/>
                    <label htmlFor="tu">Tu</label>
                    <br/>
                    <input
                        type="checkbox" id="il-elle" value="il/elle"
                        checked={this.props.getChecked('pronouns', 'il/elle')}
                        onChange={() => this.props.toggleChecked('pronouns', 'il/elle')}/>
                    <label htmlFor="il-elle">Il/Elle</label>
                    <br/>
                    <input
                        type="checkbox" id="nous" value="nous"
                        checked={this.props.getChecked('pronouns', 'nous')}
                        onChange={() => this.props.toggleChecked('pronouns', 'nous')}/>
                    <label htmlFor="nous">Nous</label>
                    <br/>
                    <input
                        type="checkbox" id="vous" value="vous"
                        checked={this.props.getChecked('pronouns', 'vous')}
                        onChange={() => this.props.toggleChecked('pronouns', 'vous')}/>
                    <label htmlFor="vous">Vous</label>
                    <br/>
                    <input
                        type="checkbox" id="ils-elles" value="ils/elles"
                        checked={this.props.getChecked('pronouns', 'ils/elles')}
                        onChange={() => this.props.toggleChecked('pronouns', 'ils/elles')}/>
                    <label htmlFor="ils-elles">Ils/Elles</label>
                </div> */}
            </div>
        );
    }
}

export default Pronouns;