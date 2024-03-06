const Appointment = require('../models/appointmentModel');
const mongoose = require('mongoose');

const appointmentController = {
  //get all appointments
  async getAllAppointments(req, res) {
    const appointments = await Appointment.find({}).sort({ createdAt: -1 });
    res.status(200).json({ appointments });
  },

  //get a single appointment by Id
  async getAppointmentById(req, res) {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid Id' });
    }
    const appointment = await Appointment.findOneById(id);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.status(200).json({ appointment });
  },

  //create new appointment
  async createAppointment(req, res) {
    const { numberOfPassengers, isReturn, pickupTime, pickupLocation, destination, returnTime, returnLocation, returnDestination, contactNumber } = req.body;

    let emptyFields = [];
    if (typeof isReturn === 'undefined') emptyFields.push('isReturn');
    if (!numberOfPassengers) emptyFields.push('numberOfPassengers');
    if (!pickupTime) emptyFields.push('pickupTime');
    if (!pickupLocation) emptyFields.push('pickupLocation');
    if (!destination) emptyFields.push('destination');
    if (isReturn && !returnTime) emptyFields.push('returnTime');
    if (isReturn && !returnLocation) emptyFields.push('returnLocation');
    if (isReturn && !returnDestination) emptyFields.push('returnDestination');
    if (!contactNumber) emptyFields.push('contactNumber');
    if (emptyFields.length > 0) {
      return res.status(400).json({ message: `The following fields are empty: ${emptyFields.join(', ')}` });
    }

    try {
      const appointment = await Appointment.create({ numberOfPassengers, isReturn, pickupTime, pickupLocation, destination, returnTime, returnLocation, returnDestination, contactNumber });
      res.status(200).json({ appointment });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  //update appointment
  async updateAppointment(req, res) {
    const id = req.params.id;
    

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid Id' });
    }

    const appointment = await Appointment.findByIdAndUpdate(id , req.body, { new: true });

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    try {
      appointment.numberOfPassengers = req.body.numberOfPassengers;
      appointment.isReturn = req.body.isReturn;
      appointment.pickupTime = req.body.pickupTime;
      appointment.pickupLocation = req.body.pickupLocation;
      appointment.destination = req.body.destination;
      appointment.returnTime = req.body.returnTime;
      appointment.returnLocation = req.body.returnLocation;
      appointment.returnDestination = req.body.returnDestination;
      appointment.contactNumber = req.body.contactNumber;

      await appointment.save();
      res.status(200).json({ appointment });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  //delete appointment
  async deleteAppointment(req, res) {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid serial number' });
    }

    const appointment = await Appointment.findByIdAndDelete(id);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.status(200).json({ appointment});
  }
}

  
  


  module.exports = appointmentController;
