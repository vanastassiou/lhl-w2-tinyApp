const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080; // default port 8080
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs")

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

app.get("/", (req, res) => {
  res.end("This is the root directory of the website! We actually don't want you to be here. You should go elsewhere...BUT WHERE??");
});

app.listen(PORT, () => {
  console.log(`TinyURL clone app listening on port ${PORT}!`);
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

app.post("/urls", (req, res) => {
  console.log(req.body);  // debug statement to see POST parameters
  res.send("Ok");         // Respond with 'Ok' (we will replace this)
});

// Remember -- can access value of key in object with objectName[keyName]
app.get("/u/:shortURL", (req, res) => {
  let longURL = urlDatabase[req.params.shortURL];
  res.redirect(longURL);
});

// Add a POST route that removes a URL resource: POST /urls/:id/delete
// (You will probably need Javascript's delete operator to remove the URL)
app.post("/urls/:id/delete", (req, res) => {
  urlDatabase.removeFromObjectByKey(`${id}`);
  res.send(`Deleted ${id}`);
  // Then redirect the client back to the urls_index page ("/urls").
  res.redirect("/urls");
});

// @jensen recommends "shortid" package
function generateRandomString() {
  let result = Math.random().toString(36).substring(2,8);
  return result;
}

app.get("/ohai", (req, res) => {
  res.end("<html><body>OMGOMGOMGOMG I'M IN SPACE</body></html>\n");
});
