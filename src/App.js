import React from 'react';

import Sidebar from './components/Sidebar';
import Card from './components/Card';

import './App.css';

import { tenses } from './values.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: {
        tenses: { },
        pronouns: {
          'je': true,
          'tu': true,
          'il/elle/on': true,
          'nous': true,
          'vous': true,
          'ils/elles': true
        }, verbs: {
          'reflexive': true
        }
      }
    }

    for (let tense in tenses)
      this.state.checked['tenses'][tense] = true;

    this.getChecked = this.getChecked.bind(this);
    this.toggleChecked = this.toggleChecked.bind(this);
    this.getKeys = this.getKeys.bind(this);
  }

  toggleChecked(category, key) {
    // Make sure at least one checkbox is checked at all times
    if (this.state.checked[category][key]) {
      let checkedCount = 1;

      for (let k in this.state.checked[category])
        if (k !== key)
          if (this.state.checked[category][k])
            checkedCount += 1;

      if (checkedCount === 1)
        return;
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

  // Return an array representing the keys from a category from 'checked'
  getKeys(category, checked) {
    let categoryObject = this.state.checked[category];
    return checked ? Object.keys(categoryObject).filter(key => categoryObject[key]) : Object.keys(categoryObject);
  }

  render() {
    return (
      <div className="row">
        <div className="left">
          <Sidebar getChecked={this.getChecked} toggleChecked={this.toggleChecked} />
        </div>
        <div className="right">
          <Card getChecked={this.getChecked} getKeys={this.getKeys}/>
        </div>
      </div>
    );
  }
}

export default App;
