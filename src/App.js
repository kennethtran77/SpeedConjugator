import React from 'react';

import Sidebar from './components/Sidebar';
import Card from './components/Card';

import './App.css';

import { tenses } from './constants.js';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheckCircle, faTimesCircle, faEye, faPercent, faUsers, faUser, faMars, faVenus, faSync, faRandom } from '@fortawesome/free-solid-svg-icons';

library.add(faCheckCircle, faTimesCircle, faEye, faPercent, faUsers, faUser, faMars, faVenus, faSync, faRandom );

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
          'reflexive': false
        }
      }
    }

    this.state.checked['tenses'][Object.keys(tenses)[0]] = true;

    this.getChecked = this.getChecked.bind(this);
    this.toggleChecked = this.toggleChecked.bind(this);
    this.getKeys = this.getKeys.bind(this);
  }

  toggleChecked(category, key, atleastOne = true) {
    // Make sure at least one checkbox is checked at all times for the given category
    if (atleastOne && this.state.checked[category][key]) {
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
        <div className="section-1">
          <Sidebar getChecked={this.getChecked} toggleChecked={this.toggleChecked} />
        </div>
        <div className="section-2">
          <Card getChecked={this.getChecked} getKeys={this.getKeys}/>
        </div>
      </div>
    );
  }
}

export default App;
