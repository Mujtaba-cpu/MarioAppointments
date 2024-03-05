const Appointment = require('../models/appointmentModel');

// Get all appointments
const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new appointment
const createAppointment = async (req, res) => {
    const appointmentData = req.body; // Assuming appointment data is sent in the request body
  
    try {
      const appointment = new Appointment(appointmentData);
      const newAppointment = await appointment.save();
      res.status(201).json(newAppointment);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  

// Get a single appointment by ID
const getAppointmentBySerialNumber = async (req, res) => {
    try {
      const appointment = await Appointment.findOne({ serialNumber: req.params.serialNumber });
      if (appointment) {
        res.json(appointment);
      } else {
        res.status(404).json({ message: 'Appointment not found' + req.params.serialNumber});
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  

// Update an appointment by ID
const updateAppointment = async (req, res) => {
    try {
      const appointment = await Appointment.findOne({ serialNumber: req.params.serialNumber });
      if (appointment) {
        // Update appointment properties here based on request body
        appointment.numberOfPassengers = req.body.numberOfPassengers;
        appointment.isReturn = req.body.isReturn;
        appointment.pickupTime = req.body.pickupTime;
        appointment.pickupLocation = req.body.pickupLocation;
        appointment.destination = req.body.destination;
        appointment.returnTime = req.body.returnTime;
        appointment.returnLocation = req.body.returnLocation;
        appointment.returnDestination = req.body.returnDestination;
        
        const updatedAppointment = await appointment.save();
        res.json(updatedAppointment);
      } else {
        res.status(404).json({ message: 'Appointment not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  

// Delete an appointment by ID
const deleteAppointment = async (req, res) => {
    try {
      const appointment = await Appointment.findOneAndDelete({ serialNumber: req.params.serialNumber });
      if (appointment) {
        res.json({ message: 'Appointment deleted' });
      } else {
        res.status(404).json({ message: 'Appointment not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

module.exports = {
  getAllAppointments,
  createAppointment,
  getAppointmentBySerialNumber,
  updateAppointment,
  deleteAppointment,
};
