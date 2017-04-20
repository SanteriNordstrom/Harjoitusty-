var express = require('express');
var app = express();
var exphbs = require('express-handlebars');
var mongoose = require("mongoose");
var Tilaajat = require('./models/tilaajat.js');
var bodyparser = require('body-parser');

var opts = {
  server: {
    socketOptions: {keepAlive: 120}
  }
};
app.use(bodyparser.urlencoded({extended: false}));
mongoose.connect('mongodb://turku:turkupass@ds163020.mlab.com:63020/harjoitustyo', opts);

app.set('view engine', 'hbs');
app.engine('hbs', exphbs({defaultLayout:'layout.hbs',
                          extname:'hbs'
 }));

app.set('port', process.env.PORT || 3000  );

app.get('/', function(req, res) {
  res.render('home');
});
app.get('/lehti-tilaukset', function(req, res) {
  res.render('lehtitilaukset');
});

app.post('/lehti-tilaukset', function(req, res) {
  Tilaajat.update(
    {nimi: req.body.nimi},
    {$push: {email: req.body.email}},
    {upsert: true},
    function(err) {
      if(err) {
        console.log(err.stack);
        return res.redirect(303, '/');
      }
      return res.redirect(303, '/');
    }
  );
});
app.use(function(req, res) {
        res.type('text/plain');
        res.status(404);
        res.send('Virhe 404- Ei löytynyt');
});
app.use(function(err, req, res, next) {
 console.log(err.stack);
 res.type('text/plain');
 res.status(500);
 res.send('Virhe 500 - palvelinpuolen virhe');
});

app.listen(app.get('port'), function() {
 console.log('Express kuuntelee http://localhost:' +
 app.get('port') + 'CTRL-C sammuttaa expressin');
});
