// document.body.children[1].href = "https://google.com";

const remainig_chars = document.querySelector("#remaining-chars");
const input = document.querySelector("#input-counter");

function consoleInput() {
  let entered_text = input.value;
  console.log(entered_text);
}
function changeChars() {
  let val = input.value;
  var maxVal = 60;

  var res = maxVal - val.length;
  if (res < 10 || res > 60) {
    input.style.background = "#d16c64";
    input.style.color = "black";
  } else {
    input.style.color = "black";
    input.style.background = "white";
  }

  remainig_chars.innerHTML = res;
}

input.addEventListener("input", changeChars);
