//selects button by id
const calculate_btn = document.querySelector("#calculate-btn");
const high_btn = document.querySelector("#high-btn");
const display_btn = document.querySelector("#display-btn");
const roll_btn = document.querySelector("#roll-btn");

//dice-rolls
const input_numb = document.querySelector("#user-number");
const calc_sum = document.querySelector("#calculated-sum");
const output_user = document.querySelector("#output-user-data");
const input_roller = document.querySelector("#user-target-number");
const dice_rolls = document.querySelector("#dice-rolls");

const output_rolls = document.querySelector("#output-total-rolls");
const output_target = document.querySelector("#output-target-number");

function calculateSum() {
  let maxVal = input_numb.value;
  let sum = 0;

  for (let index = 0; index < maxVal; index++) {
    sum += index;
  }
  calc_sum.innerHTML = sum;
  calc_sum.style.display = "block";
}

function highlightLinks() {
  let section = document.body.children[2];
  let list = section.getElementsByTagName("a");

  for (let a of list) {
    a.style.background = "blue";
  }
}

function displayUser() {
  const loggedUser = {
    NAME: "Max",
    SURNAME: "Maximilion",
    AGE: "32",
  };
  for (let user in loggedUser) {
    var list = document.createElement("li");
    list.innerHTML = user + ": " + loggedUser[user];
    output_user.appendChild(list);
  }
}

function rollDice() {
  let value = input_roller.value;
  var counter = 0;
  let rolled_number = Math.floor(Math.random() * 6) + 1;
  while (rolled_number != value) {
    var list = document.createElement("li");
    rolled_number = Math.floor(Math.random() * 6) + 1;
    counter++;
    list.innerHTML = "Roll: " + counter + ":" + rolled_number;
    dice_rolls.appendChild(list);
  }
  output_rolls.innerHTML = counter;
  output_target.innerHTML = value;
}

calculate_btn.addEventListener("click", calculateSum);
high_btn.addEventListener("click", highlightLinks);
display_btn.addEventListener("click", displayUser);
roll_btn.addEventListener("click", rollDice);
