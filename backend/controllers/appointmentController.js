require('dotenv').config();
const Appointment = require('../models/appointmentModel');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});


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

  //get appointments from a specific date to another date
  async getAppointmentsByDate(req, res) {
    const { startDate, endDate } = req.body;

    try {
      const appointments = await Appointment.find({
        pickupDate: { $gte: startDate, $lte: endDate }
      }).sort({ pickupDate: 1 });

      res.status(200).json({ appointments });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  //get appointments by a specific field
  async getAppointmentsByField(req, res) {

    const { field, customerName, pickupLocation, destination, username } = req.body;
    if (field === 'customerName') {
      const appointments = await Appointment.find({ customerName: { $regex: new RegExp(customerName, 'i') } }).sort({ createdAt: -1 });
      res.status(200).json({ appointments });
    } else if (field === 'pickupLocation') {
      const appointments = await Appointment.find({ pickupLocation: { $regex: new RegExp(pickupLocation, 'i') } }).sort({ createdAt: -1 });
      res.status(200).json({ appointments });
    } else if (field === 'destination') {
      const appointments = await Appointment.find({ destination: { $regex: new RegExp(destination, 'i') } }).sort({ createdAt: -1 });
      res.status(200).json({ appointments });
    } else if (field === 'username') {
      const appointments = await Appointment.find({ username: { $regex: new RegExp(username, 'i') } }).sort({ createdAt: -1 });
      res.status(200).json({ appointments });
    } else {
      res.status(400).json({ message: 'Invalid field' });
    }
  },



  //create new appointment
  async createAppointment(req, res) {
    const { numberOfPassengers, isReturn, pickupDate, pickupTime, pickupLocation, destination, returnTime, returnDate,
      returnLocation, returnDestination, contactNumber, adInfo, priceQuote, email, username, customerName } = req.body;

    const status = 'pending';
    let emptyFields = [];
    if (typeof isReturn === 'undefined') emptyFields.push('isReturn');
    if (!numberOfPassengers) emptyFields.push('numberOfPassengers');
    if (!pickupDate) emptyFields.push('pickupDate');
    if (!pickupTime) emptyFields.push('pickupTime');
    if (!pickupLocation) emptyFields.push('pickupLocation');
    if (!destination) emptyFields.push('destination');
    if (isReturn && !returnTime) emptyFields.push('returnTime');
    if (isReturn && !returnDate) emptyFields.push('returnDate');
    if (isReturn && !returnLocation) emptyFields.push('returnLocation');
    if (isReturn && !returnDestination) emptyFields.push('returnDestination');
    if (typeof contactNumber === 'undefined' && contactNumber === '') emptyFields.push('contactNumber');
    if (typeof adInfo === 'undefined' && adInfo === '') emptyFields.push('adInfo');
    if (typeof priceQuote === 'undefined' && priceQuote === '') emptyFields.push('priceQuote');
    if (typeof email === 'undefined' && email === '') emptyFields.push('email');
    if (!username) emptyFields.push('username');
    if (typeof customerName === 'undefined' && customerName === '') emptyFields.push('customerName');
    if (emptyFields.length > 0) {
      return res.status(400).json({ message: `The following fields are empty: ${emptyFields.join(', ')}` });
    }

    try {
      const appointment = await Appointment.create({ numberOfPassengers, isReturn, pickupDate, pickupTime, pickupLocation, destination, returnTime, returnDate, returnLocation, returnDestination, contactNumber, adInfo, priceQuote, email, username, customerName, status });
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

    const appointment = await Appointment.findByIdAndUpdate(id, req.body, { new: true });

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    try {
      appointment.numberOfPassengers = req.body.numberOfPassengers;
      appointment.isReturn = req.body.isReturn;
      appointment.pickupDate = req.body.pickupDate;
      appointment.pickupTime = req.body.pickupTime;
      appointment.pickupLocation = req.body.pickupLocation;
      appointment.destination = req.body.destination;
      appointment.returnTime = req.body.returnTime;
      appointment.returnDate = req.body.returnDate;
      appointment.returnLocation = req.body.returnLocation;
      appointment.returnDestination = req.body.returnDestination;
      appointment.contactNumber = req.body.contactNumber;
      appointment.adInfo = req.body.adInfo;
      appointment.priceQuote = req.body.priceQuote;
      appointment.email = req.body.email;
      appointment.username = req.body.username;
      appointment.customerName = req.body.customerName;

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

    res.status(200).json({ appointment });
  },

  //change appointment status
  async changeAppointmentStatus(req, res) {
    const { id } = req.params;
    const { status } = req.body;



    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'Invalid Id' });
    }

    const appointment = await Appointment.findOneAndUpdate({ _id: id }, { status }, { new: true });
    console.log(appointment);

    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: 'sheriar@computersupportcentre.com',
      subject: 'Appointment Status Update',
      text: `Appointment Status has been changed to: ${status}\n\n` +
      `Customer Name: ${appointment.customerName || 'N/A'}\n` +
      `Date: ${appointment.pickupDate || 'N/A'}\n` +
      `Time: ${appointment.pickupTime || 'N/A'}\n` +
      `Pickup Location: ${appointment.pickupLocation || 'N/A'}\n` +
      `Destination: ${appointment.destination || 'N/A'}\n` +
      `Return Time: ${appointment.returnTime || 'N/A'}\n` +
      `Return Date: ${appointment.returnDate || 'N/A'}\n` +
      `Return Location: ${appointment.returnLocation || 'N/A'}\n` +
      `Return Destination: ${appointment.returnDestination || 'N/A'}\n` +
      `Contact Number: ${appointment.contactNumber || 'N/A'}\n` +
      `Additional Info: ${appointment.adInfo || 'N/A'}\n` +
      `Price Quote: ${appointment.priceQuote || 'N/A'}\n` +
      `Email: ${appointment.email || 'N/A'}\n` +
      `Username: ${appointment.username || 'N/A'}\n`
    };

    if (!appointment) {
      return res.status(400).json({ error: 'Appointmnet not found' });
    }

    res.status(200).json(appointment);

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending email:", error);
        res.status(500).send("Error"); // Handle error response
      } else {
        console.log('Email sent:', info.response);
        res.send("Email sent"); // Send success response
      }
    });
  },
}





module.exports = appointmentController;
