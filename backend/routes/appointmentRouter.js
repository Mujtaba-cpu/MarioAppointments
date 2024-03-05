const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

// Get all appointments
router.get('/', appointmentController.getAllAppointments);

// Get appointment by ID
router.get('/:serialNumber', appointmentController.getAppointmentBySerialNumber);

// Create a new appointment
router.post('/', appointmentController.createAppointment);

// Update an existing appointment
router.patch('/:serialNumber', appointmentController.updateAppointment);

// Delete an appointment
router.delete('/:serialNumber', appointmentController.deleteAppointment);

module.exports = router;
