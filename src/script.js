'use strict';

// Selecting The Elements
const player_0 = document.querySelector('.player--0');
const player_1 = document.querySelector('.player--1');
const score_0 = document.getElementById('score--0');
const score_1 = document.getElementById('score--1');
const dice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const currentScore0 = document.getElementById('current--0');
const currentScore1 = document.getElementById('current--1');

// Starting Conditions
let scores, activePlayer, currentScore, playing;
const init = function () {
  score_0.textContent = 0;
  score_1.textContent = 0;

  scores = [0, 0];
  activePlayer = 0;
  currentScore = 0;
  playing = true;

  score_0.textContent = 0;
  score_1.textContent = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;

  dice.classList.add('hidden');
  player_0.classList.remove('player--winner');
  player_1.classList.remove('player--winner');
  player_0.classList.add('player--active');
  player_1.classList.remove('player--active');
};
init();

// Switching Player
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;

  player_0.classList.toggle('player--active');
  player_1.classList.toggle('player--active');
};

// Rolling Dice Funcation
btnRoll.addEventListener('click', function () {
  if (playing) {
    // Generating A Dice Roll
    const diceRoll = Math.trunc(Math.random() * 6) + 1;

    // Displaying The Dice
    dice.classList.remove('hidden');
    dice.src = `assets/dice-${diceRoll}.png`;

    if (diceRoll !== 1) {
      currentScore += diceRoll;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch Player
      switchPlayer();
    }
  }
});

// Holding Number
btnHold.addEventListener('click', function () {
  if (playing) {
    // Add Current Score To Main Score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // Declearing The Winner If Score >= 100
    if (scores[activePlayer] >= 100) {
      playing = false;
      dice.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switching Player
      switchPlayer();
    }
  }
});

// Restart Game
btnNew.addEventListener('click', init);
