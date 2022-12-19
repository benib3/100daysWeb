function postIsValid(enteredTitle, enteredContent) {
  return (
    enteredTitle &&
    enteredContent &&
    enteredTitle.trim() !== "" &&
    enteredContent.trim() !== ""
  );
}
function inputIsValid() {
  return (
    enteredEmail &&
    enteredConfirmEmail &&
    enteredPassword &&
    enteredPassword.trim().length < 6 &&
    enteredEmail === enteredConfirmEmail &&
    enteredEmail.includes("@")
  );
}

module.exports = { postIsValid: postIsValid, inputIsValid: inputIsValid };
