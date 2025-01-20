// File: models/FullDayBooking.js

const mongoose = require('mongoose');

const fullDayBookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  message: {
    type: String
  },
  price: {
    type: Number,
    default: 20000
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('FullDayBooking', fullDayBookingSchema);