const mongoose = require('mongoose')
const moment = require('moment');

const appointmentSchema = new mongoose.Schema({
  numberOfPassengers: {
    type: Number,
    required: true,
  },
  isReturn: {
    type: Boolean,
    required: true,
  },
  pickupDate: {
    type: Date,
    required: true,
  },
  pickupTime: {
    type: String,
    validate: {
      validator: function (value) {
        // Check if the value is a valid time format
        return moment(value, 'HH:mm', true).isValid();
      },
      message: props => `${props.value} is not a valid time format (HH:mm)`,
    },
    required: true,
  },
  pickupLocation: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  returnTime: {
    type: String,
    required: function () {
      return this.isReturn;
    },
  },
  returnDate: {
    type: Date,
    required: function () {
      return this.isReturn;
    },
  },
  returnLocation: {
    type: String,
    required: function () {
      return this.isReturn;
    },
  },
  returnDestination: {
    type: String,
    required: function () {
      return this.isReturn;
    },
  },
  contactNumber: {
    type: String,

  },
  adInfo: {
    type: String,
  },
  priceQuote: {
    type: Number,

  },
  email: {
    type: String,

  },
  username: {
    type: String,
    required: true,
  },
  customerName: {
    type: String,

  },
  status: {
    type: String,
    enum: ['cancelled', 'completed', 'pending'],
    default: 'pending'
  },
}, { timestamps: true })

module.exports = mongoose.model('Appointment', appointmentSchema);
