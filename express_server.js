const cookieParser = require('cookie-parser');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 8080;

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
];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

// Routing information follows

app.get("/", (req, res) => {
  res.end("This is as far as you go.");
});

app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

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

app.get("/urls/:id", (req, res) => {
  let templateVars = { shortURL: req.params.id };
  res.render("urls_show", templateVars);
});
app.get("/u/:shortURL", (req, res) => {
  //req.params: a property that is an object containing properties mapped to “params”. E.g. given route /user/:name, “name” property of the object is available as req.params.name. Defaults to {}.
  let longURL = urlDatabase[req.params.shortURL];
  res.redirect(longURL);
});

app.post("/urls/:id/delete", (req, res) => {
  delete urlDatabase[req.params.id];
  console.log(urlDatabase);
  res.redirect("/urls");
});

app.post("/urls/:id", (req, res) => {
  urlDatabase[req.params.id] = req.body.longURLName;
  res.redirect("/urls");
});

app.post('/login', (req, res) => {
  const username = req.body.username;
  const inputPass = req.body.inputPass;
  const user =  checkIfUserExists(username, inputPass);
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
//
app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", (req, res) => {
  if ((req.body.email.length < 1) || (req.body.password.length < 1)) {
    res.status(400);
    res.send("Sorry, I can't create an account with no email or password.");
  } else if (req.body.email == findExistingUserByEmail(req.body.email)) {
    res.status(400);
    res.send("Sorry, this user has already been registered.");
  } else {
    let newUserId = generateRandomString();
    let newUserObject = { id: newUserId, email: req.body.email, password: req.body.password };
    userDatabase.push(newUserObject);
    //Sets cookie named "user_id" corresponding to the contents of the new user
    res.cookie('user_id', newUserId);
    console.log('New user registered:', newUserId);
    res.redirect('/urls');
  }
});

// @jensen recommends "shortid" package
function generateRandomString() {
  let result = Math.random().toString(36).substring(2,8);
  return result;
};

function findExistingUserById(uid) {
  // find() returns value of first element of array that satisfies provided testing function
  return userDatabase.find(function (input) {
    return input.uid === uid;
  });
  console.log('Found', username);
};

function checkIfUserExists(username, inputCode) {
  return userDatabase.find((input) =>
    input.name === username && input.password === inputCode
  );
  console.log('Found', username);
};

function findExistingUserByEmail(email) {
  return userDatabase.find((input) =>
    input.email === email
  );
  console.log('Found', email);
};

app.listen(PORT, () => {
  console.log(`TinyURL clone now listening on port ${PORT}.`);
});
