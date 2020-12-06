var express = require(`express`)
var app = express()
var router = express.Router();
var path = require('path')
var main = require('./main')
var email = require('./email')

router.use('/main', main) 
router.use('/email', email) 

// url routing
router.get('/', function(req, res) {
    console.log("call index.js")
    // res.send("<h1>Hello</h1>")
    res.sendFile(path.join(__dirname, "../public/main.html"))
})

module.exports = router;