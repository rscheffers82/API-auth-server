# API server with authentication

This is an API server with authentication build on Node and Express. It serves as a boilerplate for projects that require secure routes to certain parts of an app.

### How it works
Use POST requests to the below links to either signup or sign-in a user using JSON data (email and password)
```javascript
{
	"email": "email@gmail.com",
	"password": "mypassword"
}
```
http://localhost:3000/signup<br>
http://localhost:3000/signin

### Security
Passwords are encrypted using passport and bcrypt in combination with a secret you need to provide in config.js. See step 4 for requirement. Once a user is logged in, the server provides a token to authenticate them on other secure routes.

### Getting started
1. Clone this repo
2. ```npm install```
3. ```npm run dev```
4. create ```config.js```  in the root folder containing
```javascript
    module.exports = {  
      secret: 'replace-me-with-your-secret-string-of-chars'
    };
    ```
5. Ensure you have MongoDB running
6. Create personal routes in [router.js](https://github.com/rscheffers82/server-authentication/blob/master/router.js)

##### Interested? See more of my work at [royscheffers.com](http://royscheffers.com)
