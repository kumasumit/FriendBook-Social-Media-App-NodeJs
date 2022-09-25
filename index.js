const express = require('express');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport_local_strategy');
var cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');

const app = express();
const port = 8000

app.use(sassMiddleware({
  src: './assets/scss',
  dest: './assets/css',
  debug: true,
  outputStyle: 'extended',
  prefix: '/css'
}));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(cookieParser());
app.use(express.static('./assets'))
// for getting static files like images, js files and css files
//we tell the app to look for images, css and script js files in assests folder inside root
//set up express-ejs-layouts
app.use(expressLayouts);
//this tells the app to use express-ejs-layouts
app.set('layout extractStyles',true);
//here we extract the css, styles file
app.set('layout extractScripts',true)
//here we extract the js files, script files
//end the setup for express-ejs-layout
//set up ejs view engine and views folder
app.set('view engine', 'ejs');
//this will set ejs as the view engine
app.set('views', './views');
// this will set views to look for views in the views folder
//end the set up for ejs view engine and views folder
//set up express-sessions and passport
app.use(session({
  name: 'friendbook',
  //todo change the secret in production
  secret: 'blahsomething',
  saveUninitialized: false,
  resave:false,
  cookie: {
      maxAge: (1000*60*100)
  },
  store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/FriendBook-Development' })

}))

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
//here as soon as the passport is initialized and the session is created for logged in user,
//we save the user in locals variable to display it in views

//this all must be done before router is loaded

//this tells the index/root that all routes will be handled by index.js files in routes folder
//use express Router
app.use('/', require('./routes'));
//this tells the app to fetch all the routes from index file in routes folder
//this acts as a middleware for routes

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})