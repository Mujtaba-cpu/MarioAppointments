const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

// Get all appointments
router.get('/', appointmentController.getAllAppointments);

// Get appointment by ID
router.get('/:id', appointmentController.getAppointmentById);

// Get appointments by date
router.post('/date', appointmentController.getAppointmentsByDate);

// Get appointments by field
router.post('/search', appointmentController.getAppointmentsByField);

// Create a new appointment
router.post('/', appointmentController.createAppointment);

// Update an existing appointment
router.patch('/:id', appointmentController.updateAppointment);

// Delete an appointment
router.delete('/:id', appointmentController.deleteAppointment);

//Update status of an appointment
router.patch('/:id/status', appointmentController.changeAppointmentStatus);
module.exports = router;
