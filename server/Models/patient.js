const mongoose = require('mongoose');
const {Schema} = mongoose;

const patientSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: { 
        type: String, 
        required: true
    },
    phoneNumber: {
        type: String,
        minLength: 12,
        maxLength: 16
    },
    email: String,
    dob: {
        type: Date,
        required: true
    },
    address: String,
    city: {
        type: String
    },
    province: {
        type: String,
        enum: ['British Columbia', 'Newfoundland and Labrador', 'Prince Edward Island', 'Nova Scotia', 'New Brunswick', 'Quebec', 'Ontario', 'Manitoba', 'Saskatchewan', 'Alberta', 'Yukon', 'Northwest Territories', 'Nunavut']
    },
    postalCode: {
        type: String,
        minLength: 6,
        maxLength: 7
    },
    sex: {
        type: String,
        enum: ['M', 'F'],
        required: true,
    },
    conditions: [String],
    medications: [String],
    insurance: {
        type: String,
    },
    creditCard: {
        type: String,
        minLength: 16,
        maxLength: 16
    },
    phn: {
        type: String,
        minLength: 10,
        maxLength: 10
    },
    clinics: [Schema.Types.ObjectId]
},
{
    timestamps: true
})

module.exports = mongoose.model('Patient', patientSchema)