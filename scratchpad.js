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

// function findCherries(fruit) {
//     return fruit.name === 'cherries';
}

findExistingUserByEmail("weebl@weebl.com");
findExistingUserByEmail("weebl@weebl.com");
