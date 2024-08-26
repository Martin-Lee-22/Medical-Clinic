const mongoose = require('mongoose');
const {Schema} = mongoose;

const roomSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    clinicID: {
        type: Schema.Types.ObjectId,
        required: true
    },
    occupied: {
        type: Boolean
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Room', roomSchema);