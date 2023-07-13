const mongoose = require('mongoose')

const empSchema = mongoose.Schema({
  FirstName: {
    type: String,
    required: true
  },
  LastName: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true
  },
  Department: {
    type: String,
    enum: ['Tech', 'Marketing', 'Operations'],
    required: true
  },
  Salary: {
    type: Number,
    required: true
  },
});

const empModel = mongoose.model('employee',empSchema)

module.exports = {empModel}