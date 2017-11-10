// Importing modules

// cookie-parser not so great for sessions
const cookieParser = require('cookie-parser');
// Attaches the "session" to req, providing an object representing the loaded session
//const cookieSession = require('cookie-session');
const express = require('express');
const bodyParser = require('body-parser');
//const bcrypt = require('bcrypt');
const app = express();
const PORT = process.env.PORT || 8080; // default port 8080

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};
const userDatabase = [
  {
    "name" : "Weebl",
    "uid": "1",
    "password": "1234",
    "email": "weebl@weebl.com"
  },
  {
    "name": "Bob",
    "uid": "2",
    "password": "stringypassword75",
    "email" : "bob@weebl.com"
  },
]

// Calling middleware

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
//app.use(cookieSession({
//   keys: ["whatevs"]
// }))

// Route definitions to follow

app.get("/", (req, res) => {
  res.end("This is the root directory of the website. You should go elsewhere...BUT WHERE??");
});

// Spits out urlDatabase object contents in JSON format.
app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});
// Congratulatons! You just made an API!

//Task 6: Use New Cookie in the _header. Change your templateVars (multiple endpoints) to pass in a user (object) property instead of the previously implemented username (string) prop

app.get("/urls", (req, res) => {
  let templateVars = {
    urls: urlDatabase,
    username: req.cookies.username,
    loggedIn: (req.cookies.username) ? true : false
  };
  res.render("urls_index", templateVars);
})

app.get("/urls/new", (req, res) => {
  let templateVars = {
    username: req.cookies.username,
    loggedIn: (req.cookies.username) ? true : false
  };
  res.render("urls_new", templateVars);
})

// Express understands : as prepended to a variable
app.get("/urls/:id", (req, res) => {
  let templateVars = { shortURL: req.params.id };
  res.render("urls_show", templateVars);
});

// app.post("/urls", (req, res) => {
//   console.log(req.body);
//   res.send("Ok");
// });

// Support for redirecting visitors to shortURL to longURL
app.get("/u/:shortURL", (req, res) => {
  //req.params: a property that is an object containing properties mapped to “params”. E.g. given route /user/:name, “name” property of the object is available as req.params.name. Defaults to {}.
  let longURL = urlDatabase[req.params.shortURL];
  res.redirect(longURL);
});

// Support for deleting URLs from database
app.post("/urls/:id/delete", (req, res) => {
  delete urlDatabase[req.params.id];
  console.log(urlDatabase);
  res.redirect("/urls");
});

// Support for updating value of existing shortURL
app.post("/urls/:id", (req, res) => {
  urlDatabase[req.params.id] = req.body.longURLName;
  res.redirect("/urls");
});

//Task 7: Create a Login Page
//Create a GET /login endpoint, which returns a new login page (you'll have to create it). Move the entire login form from the _header partial into the new login page, then modify the form to ask for an email and password.

// Modify the existing POST /login endpoint so that it uses the new form data and sets the user_id cookie on successful login. In order to do this, the endpoint will first need to try and find a user that matches the email submitted via the login form. If a user with that e-mail cannot be found, return a response with a 403 status code.

//If a user with that e-mail address is located, compare the password given in the form with the existing user's password. If it does not match, return a response with a 403 status code.

//If both checks pass, set the user_id cookie with the matching user's random ID, then redirect to /.

app.post('/login', (req, res) => {
  const username = req.body.username;
  const inputPass = req.body.inputPass;
  const user = findUser(username, inputPass);
  if (user) {
    res.cookie("username", user.name);
    res.redirect('/urls');
  } else {
    res.redirect('/login');
  }
});

app.post('/logout', (req, res) => {
  res.clearCookie("username");
  res.redirect('/urls');
});

app.get("/register", (req, res) => {
  res.render("register", templateVars);
})

app.post("/register", (req, res) => {
  let newUserId = generateRandomString();
  let newUserObject = { id: newUserId; email: req.body.email; password: req.body.password };
  userDatabase.push(newUserObject);
  res.cookie('user_id', user[newUserId]);
  res.redirect('/urls');
// Task 5: Handle Registration Errors
// if email or pass are empty, reply with 400
// If newUserEmail already exists, reply with 400

});

// @jensen recommends "shortid" package
function generateRandomString() {
  let result = Math.random().toString(36).substring(2,8);
  return result;
}

function findUserById(uid) {
  // find() returns value of first element of array that satisfies provided testing function
  return userDatabase.find(function (user) {
    return user.uid === uid;
  });
  console.log('Found', username);
}

function findUser(username, inputCode) {
  // find() returns value of first element  array that satisfies provided testing function
  return userDatabase.find((user) =>
    user.name === username && user.password === inputCode
  );
  console.log('Found', username);
}

app.listen(PORT, () => {
  console.log(`Bingeley bingeley beep! TinyURL clone app listening on port ${PORT}.`);
});
