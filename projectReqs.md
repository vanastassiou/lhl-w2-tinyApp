# Display Reqs

## Site Header:

<!-- * When user is logged in, shows:
  *  user's email
  * logout button
    * button makes a POST request to /logout -->
* If not logged in, shows:
  * link to /login
  * link to /register

# Behaviour Reqa

## GET /

* if logged in, redirect to /urls
* if not logged in, redirect to /login

## GET /urls

* if logged in:
  * returns HTML with:
    * site header
    * list of URLs created by user, each item containing:
      * short URL
      * corresponding long URL
      * edit button which makes GET request to /urls/:id
      * delete button which makes POST request to /urls/:id/delete
      * link to "Create a New Short Link" -> GET request to /urls/new
* if not logged in:
  * returns HTML with a relevant error message

## GET /urls/new

* if logged in:
  * returns HTML with:
    * header
    * form containing:
      * text input field for original (long) URL
      * a submit button which makes a POST request to /urls
* if not logged in:
  * redirects to the /login page

## GET /urls/:id

* if logged in and owns the URL for the given ID:
  * returns HTML with:
    * header
    * short URL (for given ID)
      * form containing:
        * corresponding long URL
        * update button that makes a POST request to /urls/:id
    * if URL for given ID does not exist:
      * Return HTML with relevant error message
* if not logged in:
  * return HTML with a relevant error message
* if logged in but does not own the URL with the given ID:
  * return HTML with a relevant error message

## GET /u/:id

* if URL for given ID exists:
  * redirect to the corresponding long URL
* if URL for given ID does not exist:
  * return HTML with relevant error message

## POST /urls

* if logged in:
  * generate short URL, save it, and associate it with user
  * redirect to /urls/:id, where :id = ID of newly saved URL
* if not logged in:
  * return HTML with relevant error message

## POST /urls/:id
* if user is logged in and owns the URL for the given ID:
  * updates the URL
  * redirects to /urls
* if user is not logged in:
  * returns HTML with a relevant error message
* if user is logged it but does not own the URL for the given ID:
  * returns HTML with a relevant error message

## POST /urls/:id/delete
* if user is logged in and owns the URL for the given ID:
  * deletes the URL
  * redirects to /urls
* if user is not logged in:
  * (Minor) returns HTML with a relevant error message
* if user is logged it but does not own the URL for the given ID:
  * (Minor) returns HTML with a relevant error message

## GET /login

* if user is logged in:
  * (Minor) redirects to /urls
* if user is not logged in:
  * returns HTML with:
  * a form which contains:
  * input fields for email and password
  * submit button that makes a POST request to /login

## GET /register

* if user is logged in:
  * (Minor) redirects to /urls
* if user is not logged in:
  * returns HTML with a form which contains:
  * input fields for email and password
  * a register button that makes a POST request to /register

## POST /login

* if email and password params match an existing user:
  * sets a cookie
  * redirects to /urls
* if email and password params don't match an existing user:
  * returns HTML with a relevant error message

## POST /register

* if email or password are empty:
  * returns HTML with a relevant error message
* if email already exists:
  * returns HTML with a relevant error message
* otherwise:
  * creates a new user
  * encrypts the new user's password with bcrypt
  * sets a cookie
  * redirects to /urls

# POST /logout
* deletes cookie
* redirects to /urls
