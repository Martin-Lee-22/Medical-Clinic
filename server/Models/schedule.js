const mongoose = require('mongoose');
const {Schema} = mongoose;

const scheduleSchema = new Schema({
    source: Schema.Types.ObjectId,
    sunday: Map,
    monday: Map,
    tuesday: Map,
    wednesday: Map,
    thursday: Map,
    friday: Map,
    saturday: Map
}, {
    timestamps: true
})

module.exports = mongoose.model('Schedule', scheduleSchema);