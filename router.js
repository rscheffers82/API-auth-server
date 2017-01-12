const passport = require('passport');
const passportService = require('./services/passport');
const Authentication = require('./controllers/authentication');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', {session: false});

module.exports = function (app) {
  app.get('/', requireAuth, function(req, res){
    res.send({ message: 'You are now authenticated' });
  })

  app.post('/signin', requireSignin, Authentication.signIn);
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
