import React from 'react';

import './Card.css';

import { tenses, pronouns, numbers, genders } from '../constants.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FrenchVerbs = require('french-verbs');
const Lefff = require('french-verbs-lefff/dist/conjugations.json');

const verbs = Object.keys(Lefff);

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
            currentReflexive: false,
            inputState: 'waiting' // 'waiting', 'correct', 'incorrect'
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    // Randomize the card upon component mounting
    componentDidMount() {
        this.randomize();
    }

    // Handle changes to the text input
    handleChange(e) {
        if (this.state.inputState === 'waiting') {
            this.setState({
                value: e.target.value
            })
        }
    }

    // Handle submit
    handleSubmit(e) {
        e.preventDefault();

        // Do nothing if the input state is in 'waiting' mode
        if (this.state.inputState !== 'waiting')
            return;

        // Fetch the correct answer and user's answer
        let correctAnswer = this.getCorrectAnswer();
        let userAnswer = this.state.value.toLowerCase().trim();

        // Check if accents are to be ignored
        if (this.props.getChecked('verbs', 'ignore-accents')) {
            // Strip answers of accents
            correctAnswer = correctAnswer.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
            userAnswer = userAnswer.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        }

        let delay = 1000;
        
        if (userAnswer === correctAnswer) {
            this.setState({
                inputState: 'correct',
                correct: this.state.correct + 1
            });
        } else {
            this.setState({
                inputState: 'incorrect',
                incorrect: this.state.incorrect + 1
            });
            delay = 3000;
        }

        // Two second delay
        setTimeout(function() {
            // Update stats
            this.setState({
                inputState: 'waiting'
            });

            // Randomize the card
            this.randomize();
        }.bind(this),
        delay);
    }

    // Return the correct answer given the current card state
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

    // Randomize the card by choosing a new tense, pronoun, verb, and reflexiveness
    randomize() {
        let newTense = this.chooseRandomTense();
        let newPronoun = this.chooseRandomPronoun(newTense);
        let newVerb = this.chooseRandomVerb();
        let newReflexive = this.props.getChecked('verbs', 'reflexive') && FrenchVerbs.isTransitive(newVerb) && newTense !== 'IMPERATIF_PRESENT';

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

    // Generate a random verb. If the user inputted verb list is not empty, pick from there.
    // Otherwise, pick from the database
    chooseRandomVerb() {
        const verbList = this.props.getVerbList();

        // Choose a random verb from the whole database if the verb list is empty
        if (verbList.length <= 0) {
            let randomKey = Lefff[verbs[verbs.length * Math.random() << 0]];

            // Prevent selecting verbs with incomplete data
            while (verbs.some(key => verbs[key] === null))
                randomKey = Lefff[verbs[verbs.length * Math.random() << 0]];
    
            return randomKey.W[0];
        } else {
            // Choose a random verb from the user inputted verb list
            let randomKey = verbList[Math.floor(Math.random() * verbList.length)];
            return randomKey;
        }
    }

    chooseRandomPronoun(tense) {
        // Impératif only allows for 'tu' or 'vous'
        let choices = tense === 'IMPERATIF_PRESENT' ? ['tu', 'vous'] : this.props.getKeys('pronouns', true);

        // Select pronoun
        let pronoun = choices[Math.floor(Math.random() * choices.length)];

        // Pick between il/elle/on or ils/elles
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

    calculateRatio() {
        let ratio = 0;

        if (this.state.correct === 0 & this.state.incorrect === 0) {
            ratio = 0;
        } else {
            ratio = Math.round((this.state.correct / this.state.incorrect) * 100) / 100;
        }

        return ratio;
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
                        <input
                            id="input"
                            type="text"
                            value={this.state.value}
                            onChange={this.handleChange}
                            className={this.state.inputState}
                            autoComplete="off">
                        </input>
                        <div id="verb">({this.state.currentVerb})</div>
                        <button
                            type='button'
                            id="randomize"
                            title='Randomize'
                            onClick={() => this.randomize()}
                            disabled={this.state.inputState !== 'waiting'} >
                        <FontAwesomeIcon icon='random' />
                        </button>
                    </form>
                    { this.state.inputState === 'incorrect' && 
                    <div className="v-margin">
                        Correct answer:
                        <span id="correct-answer"> {this.getCorrectAnswer()}</span>
                    </div>
                    }
                    <div id="stats">
                        <h4><FontAwesomeIcon icon='eye' title='Seen' /> {this.state.seen}</h4>
                        <h4><FontAwesomeIcon icon='check-circle' title='Correct' /> {this.state.correct}</h4>
                        <h4><FontAwesomeIcon icon='times-circle' title='Incorrect' /> {this.state.incorrect}</h4>
                        <h4><FontAwesomeIcon icon='percent' title='Correct/Incorrect Ratio' /> {this.calculateRatio()}</h4>
                    </div>
                </div>
            </div>
        );
    }
}

export default Card;