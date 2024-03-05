const express = require ('express');
const mongoose = require ('mongoose');
//const cors = require ('cors');
const bodyParser = require ('body-parser');

const app = express();
const port = 3000;

// middleware
app.use(express.json())  // parse json bodies into JS objects
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// connect to mongodb & listen for requests
mongoose.connect("mongodb+srv://root:<root123>@mario.s95acud.mongodb.net/")
    .then(() => {
        //listen for requests
        app.listen(3000, () => {
            console.log('connected to db and server started on port: ' + 3000 + '...')
        })  // server listens on port 5000
    })
    .catch((err) => {console.log(err)
    })

