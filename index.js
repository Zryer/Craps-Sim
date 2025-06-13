let passLine = false;
let bankRoll = 1000;
let rollStreak = 0;
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
}

function compare(numOne, numTwo, pass) {
  const total = numOne + numTwo;
  if (pass == false && (total == 2 || total == 3 || total == 12)) {
    document.querySelector("#statusMessage").innerHTML = `CRAPS`;
    bankRoll -= 50;
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
    document.querySelector("#statusMessage").innerHTML = `The point is ${total}`;
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
    bankRoll -= 50;
    point = "Try again!";
    statsUpdate();
    return;
  }
  if (pass == true && total == point) {
    document.querySelector("#statusMessage").innerHTML = "You made the point!";
    passLine = false;
    rollStreak += 1;
    bankRoll += 50;
    point = "You made the point! Roll again for a new point!";
    statsUpdate();
    return;
  }
  if (pass == true) {
    document.querySelector("#statusMessage").innerHTML = `You rolled a ${total}`;
    rollStreak += 1;
    statsUpdate();
    return;
  }
  // if (numOne == numTwo) {
  //     return document.querySelector("#statusMessage").innerHTML = `You rolled a hard ${total}`;
  // }
}

document.querySelector("#rollButton").onclick = update;
