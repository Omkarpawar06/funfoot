const mongoose = require('mongoose');

const slotBookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  startHour: {
    type: Number,
    required: true
  },
  endHour: {
    type: Number,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('SlotBooking', slotBookingSchema);
