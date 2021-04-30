import React from 'react';

import './Card.css';

import { tenses, pronouns, numbers, genders } from '../values.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FrenchVerbs = require('french-verbs');
const Lefff = require('french-verbs-lefff/dist/conjugations.json');

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            seen: 0,
            correct: 0,
            incorrect: 0,
            value: '',
            currentPronoun: '',
            currentGender: '',
            currentNumber: '',
            currentTense: this.chooseRandomTense(),
            currentVerb: '',
            currentReflexive: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.randomize();
    }

    handleChange(e) {
        this.setState({
            value: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();

        let correctAnswer = this.getCorrectAnswer();

        let userAnswer = this.state.value.toLowerCase().trim();

        // TODO - better answer checker
        if (userAnswer === correctAnswer) {
            alert('Correct!');
        } else {
            alert(`Incorrect... Correct answer: ${correctAnswer}`);
        }

        // Update stats
        this.setState({
            correct: userAnswer === correctAnswer ? this.state.correct + 1 : this.state.correct,
            incorrect: userAnswer === correctAnswer ? this.state.incorrect : this.state.incorrect + 1
        });

        // Randomize the card
        this.randomize();
    }

    getCorrectAnswer() {
        let pronounObject = pronouns[this.state.currentPronoun];

        let params = {
            'aux': FrenchVerbs.alwaysAuxEtre(this.state.currentVerb) ? 'ETRE' : 'AVOIR'
        }

        // reflexive verbs must be transitive
        let reflexive = FrenchVerbs.isTransitive(this.state.currentVerb) && this.state.currentReflexive;

        if (reflexive) {
            params['aux'] = 'ETRE';
            params['agreeGender'] = this.state.currentGender;
            params['agreeNumber'] = this.state.currentNumber;
        }

        // Fetch the conjugation
        return FrenchVerbs.getConjugation(Lefff, this.state.currentVerb, this.state.currentTense, pronounObject.index, params, reflexive);
    }

    randomize() {
        let newTense = this.chooseRandomTense();
        let newPronoun = this.chooseRandomPronoun(newTense);
        let newVerb = this.chooseRandomVerb();
        let newReflexive = this.props.getChecked('verbs', 'reflexive') && FrenchVerbs.isTransitive(newVerb) ? Math.random() < 0.5 : false;

        // If gender or number of the new pronoun is `any`, then pick a random one
        let newGender = pronouns[newPronoun].gender === 'A' ? genders[Math.floor(Math.random() * genders.length)] : pronouns[newPronoun].gender;
        let newNumber = pronouns[newPronoun].number === 'A' ? numbers[Math.floor(Math.random() * numbers.length)] : pronouns[newPronoun].number;

        this.setState({
            seen: this.state.seen + 1,
            value: '',
            currentPronoun: newPronoun,
            currentGender: newGender,
            currentNumber: newNumber,
            currentTense: newTense,
            currentVerb: newVerb,
            currentReflexive: newReflexive
        });
    }

    chooseRandomVerb() {
        let keys = Object.keys(Lefff);
        let randomKey = Lefff[keys[keys.length * Math.random() << 0]];

        // Prevent selecting verbs with incomplete data
        while (Object.keys(keys).some(key => keys[key] === null))
            randomKey = Lefff[keys[keys.length * Math.random() << 0]];

        return randomKey.W[0];
    }

    chooseRandomPronoun(tense) {
        // Impératif only allows for 'tu' or 'vous'
        let choices = tense === 'IMPERATIF_PRESENT' ? ['tu', 'vous'] : this.props.getKeys('pronouns', true);

        let pronoun = choices[Math.floor(Math.random() * choices.length)];

        // Pick between il/elle or ils/elles
        if (pronoun === 'il/elle/on')
            return ['il', 'elle', 'on'][Math.floor(Math.random() * 3)];
        else if (pronoun === 'ils/elles')
            return ['ils', 'elles'][Math.floor(Math.random() * 2)];

        return pronoun;
    }

    chooseRandomTense() {
        let tenses = this.props.getKeys('tenses', true);
        let randomIndex = Math.floor(Math.random() * tenses.length);
        return tenses[randomIndex];
    }

    render() {
        return (
            <div id="card-root">
                <div id="card">
                    <h3 id='tense'>{ tenses[this.state.currentTense].displayName }</h3>
                    <form onSubmit={this.handleSubmit}>
                        <div id="meta">
                            <div id="pronoun">{ this.state.currentPronoun }</div>
                            <div id="gender"> { this.state.currentGender === 'M' ? <FontAwesomeIcon icon='mars' title='Male'/> : <FontAwesomeIcon icon='venus' title='Female' /> } </div>
                            <div id="number"> { this.state.currentNumber === 'S' ? <FontAwesomeIcon icon='user' title='Singular' /> : <FontAwesomeIcon icon='users' title='Plural' /> } </div>
                            <div id="reflexive">{ this.state.currentReflexive && <FontAwesomeIcon icon='sync' title='Reflexive' /> }</div>
                        </div>
                        <input type="text" value={this.state.value} onChange={this.handleChange}></input>
                        <div id="verb">({this.state.currentVerb})</div>
                        <button type='button' id="randomize" title='Randomize' onClick={() => this.randomize()}><FontAwesomeIcon icon='random' /></button>
                    </form>
                    <div id="stats">
                        <h4><FontAwesomeIcon icon='eye' title='Seen' /> {this.state.seen}</h4>
                        <h4><FontAwesomeIcon icon='check-circle' title='Correct' /> {this.state.correct}</h4>
                        <h4><FontAwesomeIcon icon='times-circle' title='Incorrect' /> {this.state.incorrect}</h4>
                        <h4><FontAwesomeIcon icon='percent' title='Correct/Incorrect Ratio' /> {Math.round((this.state.correct / this.state.incorrect) * 100) / 100}</h4>
                    </div>
                </div>
            </div>
        );
    }
}

export default Card;