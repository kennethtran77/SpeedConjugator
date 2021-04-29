import React from 'react';

import Sidebar from './components/Sidebar.js';
import Card from './components/Card.js';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: {
        tenses: {
          'present': true,
          'passe-compose': false,
          'imparfait': false
        },
        moods: {
          'imperatif': true,
          'subjonctif': false
        },
        pronouns: {
          'je': true,
          'tu': true,
          'il/elle': true,
          'nous': true,
          'vous': true,
          'ils/elles': true
        }
      }
    }

    this.getChecked = this.getChecked.bind(this);
    this.toggleChecked = this.toggleChecked.bind(this);
  }

  toggleChecked(category, key) {
    // Make sure at least one checkbox is checked at all times
    if (this.state.checked[category][key]) {
      let checkedCount = 1;

      for (let k in this.state.checked[category]) {
        if (k !== key) {
          if (this.state.checked[category][k]) {
            checkedCount += 1;
          }
        }
      }

      if (checkedCount === 1) {
        return;
      }
    }

    // clone checked object
    let newChecked = { ...this.state.checked };

    // Mutate array nested in the new checked object
    newChecked[category][key] = !newChecked[category][key];

    this.setState({
      checked: newChecked
    });
  }

  getChecked(category, key) {
    return this.state.checked[category][key];
  }

  render() {
    return (
      <div className="row">
        <div className="left">
          <Sidebar getChecked={this.getChecked} toggleChecked={this.toggleChecked} />
        </div>
        <div className="right">
          <Card getChecked={this.getChecked}/>
        </div>
      </div>
    );
  }
}

export default App;
