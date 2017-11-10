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
    "password": "1234"
  },
  {
    "name": "Bob",
    "uid": "2",
    "password": "stringypassword75"
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

app.get("/urls", (req, res) => {
  let templateVars = {
    urls: urlDatabase,
    username: req.cookies.username
  };
// Grants the urls_index template access to the value of the templateVars object
  res.render("urls_index", templateVars);
})

app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});

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

// Support for login cookie
app.post('/login', (req, res) => {
  const username = req.body.username;
  const inputPass = req.body.inputPass;
  const user = findUser(username, inputPass);
  if (user) {
    res.cookie("username", user.name);
    res.redirect('/urls');
  } else {
    res.redirect('login');
  }
});

// Login check
app.get('/', (req, res) => {
  let loggedIn = false;
  if (req.cookies.username === true) {
    let id = req.cookies.username;
    loggedIn = true;
  }
  res.render('index', {loggedIn, admin});
});

app.post('/Logout', (req, res) => {
  res.clearCookie(username);
  res.redirect('/urls');
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
