const express = require('express')
const app = express()
const port = 8000

app.set('view engine', 'ejs');
//this will set ejs as the view engine
app.set('views', './views');
// this will set views to look for views in the views folder

//this tells the index/root that all routes will be handled by index.js files in routes folder
app.use('/', require('./routes'));
//this tells the app to fetch all the routes from index file in routes folder
//this acts as a middleware for routes

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})