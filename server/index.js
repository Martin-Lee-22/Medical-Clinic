const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials.js')
const corsOptions = require('./Config/corsOptions.js')
require('dotenv').config()

app.use(cookieParser());

app.use(express.json({limit : '50mb',extended : true}))
app.use(express.urlencoded({limit : '50mb',extended : true}))


// Routers
const userRouter = require("./Routes/user.js");
const authRouter = require("./Routes/auth.js");
const doctorRouter = require("./Routes/doctor.js");
const appointmentRouter = require("./Routes/appointment.js");
const clinicRouter = require("./Routes/clinic.js");
const scheduleRouter = require("./Routes/schedule.js")
const roomRouter = require("./Routes/room.js")
const patientRouter = require("./Routes/patient.js")
const imageRouter = require("./Routes/images.js");

// Middlewares

// Handle options credentials check - before CORS! and fetch cookies credentials requirement
app.use(credentials)
// Cross Origin Resource Sharing
app.use(cors(corsOptions));

app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/doctor", doctorRouter);
app.use("/appointments", appointmentRouter);
app.use("/clinics", clinicRouter);
app.use("/schedule", scheduleRouter);
app.use("/room", roomRouter);
app.use("/patients", patientRouter);
app.use("/images", imageRouter);

mongoose.connect(process.env.MONGO_DB_URL).then(
    app.listen(process.env.PORT || 3002, (res, error) => {
        if(error) console.log(`Error: ${error}`);
        console.log(`Server listening: port ${process.env.PORT}`)
        console.log("Connected to Mongo Database!")
        res.send('Server is Functional!')
    })
).catch((error) => {
    console.log(`Failed to connect to Database: ${error}`);
});
