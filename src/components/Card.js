import React from 'react';

import './Card.css';

import { tenses, pronouns, numbers, genders } from '../values.js';

const FrenchVerbs = require('french-verbs');
const Lefff = require('french-verbs-lefff/dist/conjugations.json');

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            seen: 1,
            correct: 0,
            incorrect: 0,
            value: '',
            currentPronoun: '',
            currentGender: '',
            currentNumber: '',
            currentTense: this.chooseRandomTense(),
            currentVerb: ''
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

        let pronoun = pronouns[this.state.currentPronoun];

        // Fetch the conjugation
        let correctAnswer = FrenchVerbs.getConjugation(Lefff, this.state.currentVerb, this.state.currentTense, pronoun.index, {
            agreeGender: this.state.currentGender,
            agreeNumber: this.state.currentNumber
        });

        let userAnswer = this.state.value.toLowerCase().trim();

        // TODO - better answer checker
        if (userAnswer === correctAnswer) {
            alert('Correct!');
        } else {
            alert('Incorrect...');
        }

        // Update stats
        this.setState({
            seen: this.state.seen + 1,
            correct: userAnswer === correctAnswer ? this.state.correct + 1 : this.state.correct,
            incorrect: userAnswer === correctAnswer ? this.state.incorrect : this.state.incorrect + 1
        });

        // Randomize the card
        this.randomize();
    }

    randomize() {
        let newTense = this.chooseRandomTense();
        let newPronoun = this.chooseRandomPronoun(newTense);

        // If gender or number of the new pronoun is any, then pick a random one
        let newGender = pronouns[newPronoun].gender === 'A' ? genders[Math.floor(Math.random() * genders.length)] : pronouns[newPronoun].gender;
        let newNumber = pronouns[newPronoun].number === 'A' ? numbers[Math.floor(Math.random() * numbers.length)] : pronouns[newPronoun].number;

        this.setState({
            value: '',
            currentPronoun: newPronoun,
            currentGender: newGender,
            currentNumber: newNumber,
            currentTense: newTense,
            currentVerb: this.chooseRandomVerb()
        });
    }

    chooseRandomVerb() {
        let keys = Object.keys(Lefff);
        return Lefff[keys[keys.length * Math.random() << 0]].W[0];
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
                        <div id="pronoun">{ this.state.currentPronoun }</div>
                        <div id="gender"> ({ this.state.currentGender }) </div>
                        <div id="number"> ({ this.state.currentNumber }) </div>
                        <input type="text" value={this.state.value} onChange={this.handleChange}></input>
                        <div id="verb">({this.state.currentVerb})</div>
                    </form>
                    <div id="stats">
                        <h4>Seen: {this.state.seen}</h4>
                        <h4>Correct: {this.state.correct}</h4>
                        <h4>Incorrect: {this.state.incorrect}</h4>
                        <h4>Correct/Incorrect Ratio: {this.state.correct / this.state.incorrect}</h4>
                    </div>
                </div>
            </div>
        );
    }
}

export default Card;