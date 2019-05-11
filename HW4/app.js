var express = require('express');

var app = express();
app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));

var session = require('express-session');
var profileController = require('./routes/ProfileController.js');


app.use(session({
  secret : 'Supreeth',
  resave : false,
  saveUninitialized : true
}))
app.use('/', profileController);

app.listen(8080,function(){
    console.log('listening on port 8080')
});

module.exports = app;