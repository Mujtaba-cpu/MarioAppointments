const mongoose = require ('mongoose')
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
        validator: function(value) {
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
      required: true,
    },
    adInfo: {
      type: String,
    },
    priceQuote: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    customerName: {
      type: String,
      required: true,
    },
  });

module.exports = mongoose.model('Appointment', appointmentSchema);
