// Practice what you learned!

// 1) Select the two <button> elements and store them in two different variables.
//    - Select the first button without adding or using any "id"
//    - Select the second button by using an "id"

const button1 = document.getElementsByTagName("button")[0];
const button2 = document.querySelector("#add_button");

// 2) Add "click" event listener to both buttons (with two different functions).
//    The functions should "console.dir()" the clicked buttons.
//    - Output the first button by using the variable in which it's stored
//    - Output the second button WITHOUT using the variable in which it's stored

function printButton1() {
  console.dir(button1);
}

function printButton2() {
  console.dir(document.querySelector("#add_button"));
}

//button1.addEventListener("click", printButton1);
//button2.addEventListener("click", printButton2);

// 3) Now select and store the paragraphs mentioned in the text you see on the page
//    (first and third paragraph)
//    - Select BOTH paragraphs by drilling into the document and "navigating" to the
//      mentioned elements
//    - If you struggle with DOM drilling, use "ids" instead but watch the solution!

var first_paragraph = document.body.children[2].children[1];
var third_paragraph = document.body.children[2].children[3];

// 4) Change the functions from (2) such that:
//    - The first button removes the third paragraph (i.e. the <p> prior to it)
//    - The second button changes the background color of the first paragraph to blue
function removePar() {
  third_paragraph.remove();
  console.log("Succesfully removed paragraph");
}

function changeBack() {
  first_paragraph.classList.add("button-class");

  // first_paragraph.style.background = "blue";
}

button1.addEventListener("click", removePar);
button2.addEventListener("click", changeBack);

// 5) Solve (4) both by changing the "inline styles" as well as by adding CSS classes
//    Note: You'll have to add those classes to the styles.css file first! {button-class}
