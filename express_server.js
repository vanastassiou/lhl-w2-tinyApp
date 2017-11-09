// Importing modules

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = process.env.PORT || 8080; // default port 8080
const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

// Calling middleware

app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());


// Route definitions to follow

app.get("/", (req, res) => {
  res.end("This is the root directory of the website. You should go elsewhere...BUT WHERE??");
  res.redirect(longURL);
});


// Spits out urlDatabase object contents in JSON format.
app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});
// Congratulatons! You just made an API!

app.get("/urls", (req, res) => {
  let templateVars = {urls: urlDatabase};
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

//Modify routes on server in to render templates properly.
// Pass username to each EJS template to verify user is logged in and what username is

app.post('/login', (req, res) => {
  const username = req.body.username;
  const inputPass = req.body.inputPass;
  res.cookie('username', username);
  console.log;
  res.redirect('/urls');
});

// @jensen recommends "shortid" package
function generateRandomString() {
  let result = Math.random().toString(36).substring(2,8);
  return result;
}

app.listen(PORT, () => {
  console.log(`Bingeley bingeley beep! TinyURL clone app listening on port ${PORT}.`);
});
