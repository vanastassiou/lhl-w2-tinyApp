const express = require("express");
const expressAction = express();
const PORT = process.env.PORT || 8080; // default port 8080
const bodyParser = require("body-parser");

expressAction.use(bodyParser.urlencoded({extended: true}));

expressAction.set("view engine", "ejs")

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

expressAction.get("/", (request, response) => {
  response.end("This is the root directory of the website! We actually don't want you to be here. You should go elsewhere...BUT WHERE??");
});

expressAction.listen(PORT, () => {
  console.log(`TinyURL clone app listening on port ${PORT}!`);
});

// Spits out urlDatabase object contents in JSON format.
expressAction.get("/urls.json", (request, response) => {
  response.json(urlDatabase);
});
// Congratulatons! You just made an API!

expressAction.get("/urls", (request, response) => {
  let templateVars = {urls: urlDatabase};
  response.render("urls_index", templateVars);
})

expressAction.get("/urls/:id", (request, response) => {
  let templateVars = { shortURL: request.params.id };
  response.render("urls_show", templateVars);
});

expressAction.get("/urls/new", (request, response) => {
  response.render("urls_new");
});

expressAction.post("/urls", (request, response) => {
  console.log(request.body);  // debug statement to see POST parameters
  response.send("Ok");         // Respond with 'Ok' (we will replace this)
});

function generateRandomString() {
  let result = Math.random().toString(36).substring(2,8);
  return result;
}

expressAction.get("/ohai", (request, response) => {
  response.end("<html><body>OMGOMGOMGOMG I'M IN SPACE</body></html>\n");
});
