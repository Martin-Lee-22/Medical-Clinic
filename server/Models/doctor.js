const mongoose = require('mongoose');
const {Schema} = mongoose;

const doctorSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String
    },
    email: String,
    dob: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    province: {
        type: String,
        required: true
    },
    postalCode: {
        type: String,
        required: true
    },
    sex: {
        type: String,
        enum: ['M', 'F'],
        required: true,
    },
    specialties: {
        type: [String]
    },
    clinics: {
        type: [String]
    },
    msp: String,
    color: String,
    title: String
}, {
    timestamps: true
})

module.exports = mongoose.model("Doctor", doctorSchema)