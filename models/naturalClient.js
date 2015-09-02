var mongoose = require('../lib/mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
  name: {
    type: String,
    required: true
  },
  secondname: {
    type: String
  },
  surname: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date
  },
  passportSeries: {
    type: String
  },
  passportNumber: {
    type: String
  },
  email: {
    type: String
  },
  phone: {
  	type: String
  },
  note: {
  	type: String
  }
});

exports.NaturalClient = mongoose.model('NaturalClient', schema);