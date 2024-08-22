const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const moment = require('moment');
const multer = require('multer');
const path = require('path');

const doctorModel = require('./models/doctors');
const ServiceModel = require('./models/service');
const AppointmentModel = require('./models/Appointments');

const app = express();
app.use(cors());
app.use(express.json());





// Serve static files from the "uploads" directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Set up storage for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Destination folder for uploaded images
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Naming the file with current timestamp
    }
});

const upload = multer({ storage });

mongoose.connect("mongodb://localhost:27017/hospitalDB");

app.get('/', (req, res) => {
    doctorModel.find({})
        .then(users => res.json(users))
        .catch(err => res.json(err));
});

app.get('/getdoctor/:id', (req, res) => {
    const id = req.params.id;
   doctorModel.findById({ _id: id })
        .then(users => res.json(users))
        .catch(err => res.json(err));
});

// Route to add a new doctor
app.post("/Adddoctor", upload.single('image'), (req, res) => {
    const newDoctor = {
        name: req.body.name,
        spec: req.body.spec,
        description: req.body.description,
        image: req.file ? req.file.filename : null // Save image filename if uploaded
    };

    doctorModel.create(newDoctor)
        .then(doctor => res.json(doctor))
        .catch(err => res.status(400).json(err));
});
app.put('/updatedoctor/:id', upload.single('image'), (req, res) => {
    const id = req.params.id;

    const updateData = {
        name: req.body.name,
        spec: req.body.spec,
        description: req.body.description,
    };

    if (req.file) {
        updateData.image = req.file.filename; // Save image filename if uploaded
    }

    doctorModel.findByIdAndUpdate({ _id: id }, updateData, { new: true })
        .then(doctor => res.json(doctor))
        .catch(err => res.json(err));
});


app.delete('/deleteUser/:id', (req, res) => {
    const id = req.params.id;
    doctorModel.findByIdAndDelete({ _id: id })
        .then(result => res.json(result))
        .catch(err => res.json(err));
});
                      

///service/////


// Route to add a new doctor
app.post("/Addservice", upload.single('image'), (req, res) => {
    const newService = {
        name: req.body.name,
        spec: req.body.spec,
        description: req.body.description,
        image: req.file ? req.file.filename : null // Save image filename if uploaded
    };

    ServiceModel.create(newService)
        .then(doctor => res.json(doctor))
        .catch(err => res.status(400).json(err));
});

app.get('/getservices', (req, res) => {
    ServiceModel.find({})
        .then(users => res.json(users))
        .catch(err => res.json(err));
});

app.get('/getservice/:id', (req, res) => {
    const id = req.params.id;
   ServiceModel.findById({ _id: id })
        .then(users => res.json(users))
        .catch(err => res.json(err));
});

app.put('/updateservice/:id', upload.single('image'), (req, res) => {
    const id = req.params.id;

    const updateData = {
        name: req.body.name,
        spec: req.body.spec,
        description: req.body.description,
    };

    if (req.file) {
        updateData.image = req.file.filename; // Save image filename if uploaded
    }

   ServiceModel.findByIdAndUpdate({ _id: id }, updateData, { new: true })
        .then(service => res.json(service))
        .catch(err => res.json(err));
});



app.delete('/deleteservice/:id', (req, res) => {
    const id = req.params.id;
    ServiceModel.findByIdAndDelete({ _id: id })
        .then(result => res.json(result))
        .catch(err => res.json(err));
});


app.get('/Appointments', (req, res) => {
    AppointmentModel.find({})
    .then(appointments => res.json(appointments))
    .catch(err => res.json(err))
})


app.get('/getAppointment/:id', (req, res) =>{
    const id = req.params.id;
    AppointmentModel.findById({_id:id})
    .then(appointments => res.json(appointments))
    .catch(err => res.json(err))
})

app.put('/updateAppointment/:id', (req, res) =>{
    const id = req.params.id;
    AppointmentModel.findByIdAndUpdate({_id:id}, {
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        dob: req.body.dob,
        gender: req.body.gender,
        date: req.body.date,
        time: req.body.time,
        phone: req.body.phone,
        doctor: req.body.doctor,
        reason: req.body.reason

    })
    .then(appointments => res.json(appointments))
    .catch(err => res.json(err))
})

app.delete('/deleteAppointment/:id', (req, res) => {
    const id = req.params.id;
    AppointmentModel.findByIdAndDelete({_id: id})
    .then(res => res.json(res))
    .catch(err => res.json(err))
})

   app.post("/createAppointment", (req, res) =>{
    AppointmentModel.create(req.body)
    .then(appointments => res.json(appointments))
    .catch(err => res.json(err))
})


app.listen(3001, () => {
    console.log("server is running");
});

