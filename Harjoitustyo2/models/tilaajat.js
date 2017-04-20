var mongoose = require('mongoose');

var tilaajatSchema = mongoose.Schema({
  nimi: String,
  email: String,
});

var Tilaajat = mongoose.model('tilaajat', tilaajatSchema);
module.exports = Tilaajat;
