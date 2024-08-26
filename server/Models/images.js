const mongoose = require('mongoose');
const {Schema} = mongoose;

const imageSchema = new Schema({
    image:String,
    source:String
}, 
{
    timestamps: true,
    collection: "Images"
});

module.exports = mongoose.model('Image', imageSchema);