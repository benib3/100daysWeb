const User = require("../models/user");
const validation = require("../util/validation");
const validationSession = require("../util/validation-session");
const bcrypt = require("bcryptjs");
function getSignUp(req, res) {
  let sessionInputData = req.session.inputData;

  if (!sessionInputData) {
    sessionInputData = {
      hasError: false,
      email: "",
      confirmEmail: "",
      password: "",
    };
  }

  req.session.inputData = null;

  res.render("signup", {
    inputData: sessionInputData,
  });
}
function getLogin(req, res) {
  let sessionInputData = req.session.inputData;

  if (!sessionInputData) {
    sessionInputData = {
      hasError: false,
      email: "",
      password: "",
    };
  }

  req.session.inputData = null;
  res.render("login", {
    inputData: sessionInputData,
  });
}
async function createUser(req, res) {
  const userData = req.body;
  const enteredEmail = userData.email; // userData['email']
  const enteredConfirmEmail = userData["confirm-email"];
  const enteredPassword = userData.password;

  if (!validation.inputIsValid()) {
    req.session.inputData = {
      hasError: true,
      message: "Invalid input - please check your data.",
      email: enteredEmail,
      confirmEmail: enteredConfirmEmail,
      password: enteredPassword,
    };

    req.session.save(function () {
      res.redirect("/signup");
    });
    return;
  }
  const user = new User(enteredEmail, enteredPassword);
  const existingUser = await user.fetch();

  if (existingUser) {
    req.session.inputData = {
      hasError: true,
      message: "User exists already!",
      email: enteredEmail,
      confirmEmail: enteredConfirmEmail,
      password: enteredPassword,
    };
    req.session.save(function () {
      res.redirect("/signup");
    });
    return;
  }

  await user.saveUser();

  res.redirect("/login");
}
async function loginUser(req, res) {
  const userData = req.body;
  const enteredEmail = userData.email;
  const enteredPassword = userData.password;

  const user = new User(enteredEmail, enteredPassword);
  const existingUser = await user.fetch();

  if (!existingUser) {
    req.session.inputData = {
      hasError: true,
      message: "Could not log you in - please check your credentials!",
      email: enteredEmail,
      password: enteredPassword,
    };
    req.session.save(function () {
      res.redirect("/login");
    });
    return;
  }

  const passwordsAreEqual = await bcrypt.compare(
    enteredPassword,
    existingUser.password
  );

  if (!passwordsAreEqual) {
    req.session.inputData = {
      hasError: true,
      message: "Could not log you in - please check your credentials!",
      email: enteredEmail,
      password: enteredPassword,
    };
    req.session.save(function () {
      res.redirect("/login");
    });
    return;
  }

  req.session.user = { id: existingUser._id, email: existingUser.email };
  req.session.isAuthenticated = true;
  req.session.save(function () {
    res.redirect("/admin");
  });
}
function logOut(req, res) {
  req.session.user = null;
  req.session.isAuthenticated = false;
  res.redirect("/");
}
module.exports = {
  getSignUp: getSignUp,
  getLogin: getLogin,
  createUser: createUser,
  loginUser: loginUser,
  logOut: logOut,
};
