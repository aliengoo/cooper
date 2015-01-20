var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var db = require('monk')('localhost/mydb');
var members = db.get('members');
var tests = db.get('tests');

var app = express();

app.use(cors());
app.use(bodyParser.json());

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

app.listen(3003, function () {
  console.log('I\'m listening...');
});
