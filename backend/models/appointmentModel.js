const mongoose = require ('mongoose')

const appointmentSchema = new mongoose.Schema({
    serialNumber: {
      type: Number,
      unique: true,
      required: true,
      default: function () {
        return Math.floor(Math.random() * 1000000);
      },
    },
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
