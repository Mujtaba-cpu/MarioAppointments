const mongoose = require ('mongoose')

const appointmentSchema = new mongoose.Schema({
    numberOfPassengers: {
      type: Number,
      required: true,
    },
    isReturn: {
      type: Boolean,
      required: true,
    },
    pickupTime: {
      type: Date,
      required: function () {
        return !this.isReturn;
      },
    },
    pickupLocation: {
      type: String,
      required: function () {
        return !this.isReturn;
      },
    },
    destination: {
      type: String,
      required: true,
    },
    returnTime: {
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
      required: true,
    },
  });

module.exports = mongoose.model('Appointment', appointmentSchema);
