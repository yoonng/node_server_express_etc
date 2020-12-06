var express = require(`express`)
var app = express()
var router = express.Router();
var path = require('path')
var mysql = require('mysql')

var dbConnection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'userinfo'
})

router.post('/form_post', function(req, res) {
    var email = req.body.email
    // res.send(email)
    res.render('template_email.ejs', {'email' : email})
    // res.json({'email' : email})
})

router.post('/ajax_send_email', function(req, res) {
    var email = req.body.email
    console.log(`ajax : ${email}`)

    var responseData = {'result' : 'ok', 'email' : email}
    res.json(responseData)

    // save data
    var query = dbConnection.query('select * from emailinfo', function(err, rows, fields) {
        if(err) throw  err;
        console.table(rows)
    })

    dbConnection.end();
})

module.exports = router;
