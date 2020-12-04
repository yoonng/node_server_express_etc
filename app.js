var express = require(`express`)
var app = express()
var bodyParser = require('body-parser')
var OrientDB = require('orientjs')
var mysql = require('mysql')

var dbConnection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'admin',
    password: '123456',
    database: 'userinfo'
})

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine', 'ejs') // embeded Javascript
// set port
app.listen(3000, function() {
    console.log("test");
})

// url routing
app.get('/', function(req, res) {
    // res.send("<h1>Hello</h1>")
    res.sendFile(__dirname + "/public/main.html")
})

app.get('/main', function(req, res) {
    res.sendFile(`${__dirname}/public/main.html`)
})

app.post('/form_post', function(req, res) {
    var email = req.body.email
    // res.send(email)
    res.render('template_email.ejs', {'email' : email})
    // res.json({'email' : email})
})

app.post('/ajax_send_email', function(req, res) {
    var email = req.body.email
    console.log(`ajax : ${email}`)

    var responseData = {'result' : 'ok', 'email' : email}
    res.json(responseData)

    // save data
    dbConnection.connect()
    var query = dbConnection.query('select * from emailinfo', function(err, rows, fields) {
        if(err) throw  err;
        console.table(rows)
    })

    dbConnection.end()
})

