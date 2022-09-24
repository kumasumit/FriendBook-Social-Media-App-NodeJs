const express = require('express')
const app = express()
const port = 8000



//this tells the index/root that all routes will be handled by index.js files in routes folder
app.use('/', require('./routes'));
//this tells the app to fetch all the routes from index file in routes folder
//this acts as a middleware for routes

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})