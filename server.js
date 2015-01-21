var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var db = require('monk')('localhost/mydb');
var members = db.get('members');
var tests = db.get('tests');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');

var jwtSecret = 'oi2323nwfwefmwefwef';

var user = {
  username : 'homer',
  password : 'p'
};

var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(expressJwt({secret : jwtSecret}).unless({path : ['/login']}));

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.get('/motd', function (req, res) {
  res.send({
    message : 'Howdy!'
  });
});

app.post('/api/members/search', function (req, res) {
  members.find(req.body, function (err, docs) {
    if (err) {
      res.send(500, err);
    } else {
      res.json(docs);
    }
  });
});

app.post('/api/test', function (req, res) {
  tests.insert(req.body, function (err, doc) {
    if (err) {
      res.send(500, err);
    } else {
      res.json(doc);
    }
  });
});

app.post('/login', authenticate, function (req, res) {
  var token = jwt.sign({
    username : user.username
  }, jwtSecret);

  res.send({
    token : token,
    user : user
  });
});

function authenticate(req, res, next) {
  var body = req.body;

  if (!body.username || !body.password) {
    res.status(400).end('Must provide username or password');
  } else {
    if (body.username !== user.username || body.password !== user.password) {
      res.status(400).end('Username or password incorrect');
    }
  }

  next();
}

app.listen(3003, function () {
  console.log('I\'m listening...');
});
