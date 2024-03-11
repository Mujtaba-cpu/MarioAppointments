require('dotenv').config()
const express = require ('express');
const appointmentRoutes = require ('./routes/appointmentRouter');
const mongoose = require ('mongoose');
const cors = require ('cors');
const app = express();

// middleware
app.use(cors())
app.use(express.json())  // parse json bodies into JS objects
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.get('/', (req, res) => {
    res.json('Welcome to the appointment booking API')
})
app.use('/appointments', appointmentRoutes)
app.use('/appointments/:id', appointmentRoutes)
app.use('appointments/date', appointmentRoutes)


// connect to mongodb & listen for requests
mongoose.connect(process.env.DB_URI)
    .then(() => {
        //listen for requests
        app.listen(process.env.PORT, () => {
            console.log('Database Connected and server started on port: ' + process.env.PORT + '...')
        })  // server listens on port 5000
    })
    .catch((err) => {console.log(err)
    })

