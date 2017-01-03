const Authentication = require('./controllers/authentication');

module.exports = function (app) {
  app.post('/signup', Authentication.signUp);
}



// basic router setup
// .get refers to the get request / post is another option
// '/' is the route that is selected
// the function is executed whenever a user visits the path
// req = the request from the server, http, route etc
// res is the response we want to send back
// next has to do with error handling
// app.get('/', function(req, res, next) {
//
// });
