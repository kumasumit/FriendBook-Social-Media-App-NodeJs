const express = require('express')
const router = require('./routes')
const app = express()
const port = 8000


app.get('/', (req, res) => {
    res.send('Hello Sumit!')
  })
//this tells the index/root that all routes will be handled by index.js files in routes folder
router.use('/', require('./routes'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})