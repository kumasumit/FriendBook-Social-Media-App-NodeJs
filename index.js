const express = require('express')
const expressLayouts = require('express-ejs-layouts');
const app = express()
const port = 8000


app.use(express.static('./assets'))
app.use(expressLayouts);
// for getting static files like images, js files and css files
//we tell the app to look for images, css and script js files in assests folder inside root
app.set('layout extractStyles',true);
//here we extract the css, styles file
app.set('layout extractScripts',true)
//here we extract the js files
app.set('view engine', 'ejs');
//this will set ejs as the view engine
app.set('views', './views');
// this will set views to look for views in the views folder
//this tells the app to use expressLayouts,
//this must be above app.use routes



//this tells the index/root that all routes will be handled by index.js files in routes folder
app.use('/', require('./routes'));
//this tells the app to fetch all the routes from index file in routes folder
//this acts as a middleware for routes

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})