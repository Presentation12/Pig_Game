let activePlayer = 0;
const win_number = 100;

function restartGame() {
  document.querySelector("#score--0").textContent = "0";
  document.querySelector("#score--1").textContent = "0";

  document.querySelector("#current--0").textContent = "0";
  document.querySelector("#current--1").textContent = "0";

  document.querySelector(`#name--0`).textContent = "Player 1";
  document.querySelector(`#name--1`).textContent = "Player 2";
}

function rollDice() {
  let secretNumber = Math.trunc(Math.random() * 6) + 1;
  document.querySelector(".dice").src = `dice-${secretNumber}.png`;
  return secretNumber;
}

function changeActivePlayer() {
  if (activePlayer == 1) {
    activePlayer = 0;
  } else if (activePlayer == 0) {
    activePlayer = 1;
  }
  document.querySelector(".player--active").classList.remove("player--active");
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add("player--active");
}

function changeCurrent(player, current) {
  document.querySelector(`#current--${player}`).textContent = current;
}

function changeScore(player, score) {
  document.querySelector(`#score--${player}`).textContent = score;
}

function getCurrent(player) {
  return Number(document.querySelector(`#current--${player}`).textContent);
}

function getScore(player) {
  return Number(document.querySelector(`#score--${player}`).textContent);
}

activePlayer;
document.querySelector(".btn--new").addEventListener("click", function () {
  restartGame();
});

document.querySelector(".btn--roll").addEventListener("click", function () {
  let number = rollDice();

  if (number == 1) {
    // get current
    let current = getCurrent(activePlayer);

    // get score
    let score = getScore(activePlayer);

    // change current if > score
    if (current > score) score = current;
    changeScore(activePlayer, score);

    // current = 0 again
    changeCurrent(activePlayer, 0);

    // change player
    changeActivePlayer();
  } else {
    // increments current
    let current = getCurrent(activePlayer);
    current += number;
    changeCurrent(activePlayer, current);
  }
});

document.querySelector(".btn--hold").addEventListener("click", function () {
  // gets current and score
  let current = getCurrent(activePlayer);
  let score = getScore(activePlayer);
  // score = score + current (hold)
  score += current;
  // current = 0 again
  current = 0;
  //changes score and current
  changeScore(activePlayer, score);
  changeCurrent(activePlayer, current);

    // score greater than win_amount, winner!
  if (score >= win_number) {
    document.querySelector(`#name--${activePlayer}`).textContent = "Winner!";
  } else {
    changeActivePlayer();
  }
});
