let passLine = false;
let bankRoll = 1000;
let rollStreak = 0;
let betValue4 = 0;
let betValue5 = 0;
let betValue6 = 0;
let betValue8 = 0;
let betValue9 = 0;
let betValue10 = 0;
let betDenom = 50;
let totalBet = 0;
let point = "Roll a 4, 5, 6, 8, 9, or 10 to establish the point!";
statsUpdate();

function randomNum() {
  let number = Math.random();
  number = Math.floor(number * 6) + 1;
  return number;
}

function update() {
  let numberOne = randomNum();
  let numberTwo = randomNum();
  document.querySelector("#img1").src = `./images/dice${numberOne}.png`;
  document.querySelector("#img2").src = `./images/dice${numberTwo}.png`;
  compare(numberOne, numberTwo, passLine);
}

function statsUpdate() {
  document.querySelector("#bankRoll").innerHTML = `${bankRoll}`;
  document.querySelector("#rollStreak").innerHTML = `${rollStreak}`;
  document.querySelector("#point").innerHTML = `${point}`;
  document.querySelector("#totalBet").innerHTML = `${totalBet}`;
  document.querySelector("#board4bet").innerHTML = `Bet: ${betValue4}`;
  document.querySelector("#board5bet").innerHTML = `Bet: ${betValue5}`;
  document.querySelector("#board6bet").innerHTML = `Bet: ${betValue6}`;
  document.querySelector("#board8bet").innerHTML = `Bet: ${betValue8}`;
  document.querySelector("#board9bet").innerHTML = `Bet: ${betValue9}`;
  document.querySelector("#board10bet").innerHTML = `Bet: ${betValue10}`;
  bankRollCheck();
}

function compare(numOne, numTwo, pass) {
  const total = numOne + numTwo;
  if (pass == false && (total == 2 || total == 3 || total == 12)) {
    document.querySelector("#statusMessage").innerHTML = `CRAPS`;
    bankRoll -= 100;
    rollStreak = 0;
    point = "Roll a 4, 5, 6, 8, 9, or 10 to establish the point!";

    statsUpdate();
    return;
  }
  if (pass == false && (total == 7 || total == 11)) {
    document.querySelector("#statusMessage").innerHTML = `Free Money!!!`;
    bankRoll += 100;
    rollStreak += 1;
    point = "Roll a 4, 5, 6, 8, 9, or 10 to establish the point!";
    statsUpdate();
    return;
  }
  if (pass == false) {
    document.querySelector(
      "#statusMessage"
    ).innerHTML = `The point is ${total}`;
    passLine = true;
    rollStreak += 1;
    point = total;
    statsUpdate();
    return;
  }
  if (pass == true && total == 7) {
    document.querySelector("#statusMessage").innerHTML = "You sevened out!";
    passLine = false;
    rollStreak = 0;
    point = "Try again!";
    checkBets(total);
    statsUpdate();
    return;
  }
  if (pass == true && total == point) {
    document.querySelector("#statusMessage").innerHTML = "You made the point!";
    passLine = false;
    rollStreak += 1;
    point = "You made the point! Roll again for a new point!";
    statsUpdate();
    return;
  }
  if (pass == true) {
    document.querySelector(
      "#statusMessage"
    ).innerHTML = `You rolled a ${total}`;
    rollStreak += 1;
    checkBets(total);
    statsUpdate();
    return;
  }
  // if (numOne == numTwo) {
  //     return document.querySelector("#statusMessage").innerHTML = `You rolled a hard ${total}`;
  // }
}

function checkBets(diceValue) {
  switch (diceValue) {
    case 4:
      if (betValue4 > 0) {
        payoutBets(diceValue, betValue4);
      }
      break;
    case 5:
      if (betValue5 > 0) {
        payoutBets(diceValue, betValue5);
      }
      break;
    case 6:
      if (betValue6 > 0) {
        payoutBets(diceValue, betValue6);
      }
      break;
    case 7:
      totalBet = 0;
      betValue4 = 0;
      betValue5 = 0;
      betValue6 = 0;
      betValue8 = 0;
      betValue9 = 0;
      betValue10 = 0;
      break;
    case 8:
      if (betValue8 > 0) {
        payoutBets(diceValue, betValue8);
      }
      break;
    case 9:
      if (betValue9 > 0) {
        payoutBets(diceValue, betValue9);
      }
      break;
    case 10:
      if (betValue10 > 0) {
        payoutBets(diceValue, betValue10);
      }
      break;
  }
}

function payoutBets(diceValue, num) {
  switch (diceValue) {
    case 4:
    case 10:
      bankRoll += (num / 5) * 9;
      statsUpdate();
      break;
    case 5:
    case 9:
      bankRoll += (num / 5) * 7;
      statsUpdate();
      break;
    case 6:
    case 8:
      bankRoll += (num / 6) * 7;
      statsUpdate();
      break;
  }
}

function placeBet4() {
  bankRoll -= 50;
  totalBet += 50;
  document.querySelector("#board4bet").innerHTML = `Bet: ${(betValue4 +=
    betDenom)}`;
  statsUpdate();
}
function placeBet5() {
  bankRoll -= 50;
  totalBet += 50;
  document.querySelector("#board5bet").innerHTML = `Bet: ${(betValue5 +=
    betDenom)}`;
  statsUpdate();
}
function placeBet6() {
  bankRoll -= 60;
  totalBet += 60;
  document.querySelector("#board6bet").innerHTML = `Bet: ${(betValue6 +=
    60)}`;
  statsUpdate();
}
function placeBet8() {
  bankRoll -= 60;
  totalBet += 60;
  document.querySelector("#board8bet").innerHTML = `Bet: ${(betValue8 +=
    60)}`;
  statsUpdate();
}
function placeBet9() {
  bankRoll -= 50;
  totalBet += 50;
  document.querySelector("#board9bet").innerHTML = `Bet: ${(betValue9 +=
    betDenom)}`;
  statsUpdate();
}
function placeBet10() {
  bankRoll -= 50;
  totalBet += 50;
  document.querySelector("#board10bet").innerHTML = `Bet: ${(betValue10 +=
    betDenom)}`;
  statsUpdate();
}
//current total bet
// different bet denominations
//clear bets
// different payouts depending on different bets
function bankRollCheck() {
if (bankRoll < 50) {
document.querySelector("#board4").removeEventListener("click", placeBet4)
document.querySelector("#board5").removeEventListener("click", placeBet5)
document.querySelector("#board6").removeEventListener("click", placeBet6)
document.querySelector("#board8").removeEventListener("click", placeBet8)
document.querySelector("#board9").removeEventListener("click", placeBet9)
document.querySelector("#board10").removeEventListener("click", placeBet10)
}
else {
document.querySelector("#board4").addEventListener("click", placeBet4);
document.querySelector("#board5").addEventListener("click", placeBet5);
document.querySelector("#board6").addEventListener("click", placeBet6);
document.querySelector("#board8").addEventListener("click", placeBet8);
document.querySelector("#board9").addEventListener("click", placeBet9);
document.querySelector("#board10").addEventListener("click", placeBet10);
}
return;
}

document.querySelector("#rollButton").onclick = update;