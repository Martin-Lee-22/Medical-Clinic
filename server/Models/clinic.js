const mongoose = require('mongoose');
const {Schema} = mongoose;

const clinicSchema = new Schema({
    name: {
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
    phoneNumber: {
        type: String,
        required: true
    },
    fax: String,
    email: String,
    rooms:[String],
    hoursOfOperation:{
        Sunday: {
            start:{type: String},
            end:{type: String},
            start_meridiem:{type: String},
            end_meridiem:{type: String},
            closed:{type: Boolean}
        },
        Monday: {
            start:{type: String},
            end:{type: String},
            start_meridiem:{type: String},
            end_meridiem:{type: String},
            closed:{type: Boolean}
        },
        Tuesday: {
            start:{type: String},
            end:{type: String},
            start_meridiem:{type: String},
            end_meridiem:{type: String},
            closed:{type: Boolean}
        },
        Wednesday: {
            start:{type: String},
            end:{type: String},
            start_meridiem:{type: String},
            end_meridiem:{type: String},
            closed:{type: Boolean}
        },
        Thursday: {
            start:{type: String},
            end:{type: String},
            start_meridiem:{type: String},
            end_meridiem:{type: String},
            closed:{type: Boolean}
        },
        Friday: {
            start:{type: String},
            end:{type: String},
            start_meridiem:{type: String},
            end_meridiem:{type: String},
            closed:{type: Boolean}
        },
        Saturday: {
            start:{type: String},
            end:{type: String},
            start_meridiem:{type: String},
            end_meridiem:{type: String},
            closed:{type: Boolean}
        }
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Clinic', clinicSchema);