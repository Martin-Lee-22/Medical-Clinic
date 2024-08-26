const mongoose = require('mongoose');
const {Schema} = mongoose;

const appointmentSchema = new Schema({
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    doctorID: {
        type: Schema.Types.ObjectId,
        required: true
    },
    patientID: {
        type: Schema.Types.ObjectId,
        required: true
    },
    patientName: String,
    clinicID: {
        type:Schema.Types.ObjectId,
        required: true
    },
    description: {
        type: String
    },
    complete: {
        type: Boolean,
        default: false
    },
    paid: {
        type: Boolean,
        default: false
    },
    price: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Appointment", appointmentSchema)