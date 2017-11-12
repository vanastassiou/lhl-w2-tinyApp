const userDatabase = [
  {
    uid: "1",
    email: "weebl@weebl.com",
    password: "1234"
  },
  {
    uid: "2",
    email: "bob@weebl.com",
    password: "stringypassword75"
  }
];

function checkCredentials(inputEmail, inputCode) {
  return userDatabase.find((input) =>
    input.email === inputEmail && input.password === inputCode
  );
};

console.log(checkCredentials("weebl@weebl.com", "1234"));
