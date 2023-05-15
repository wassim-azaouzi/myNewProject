const mongoose = require('mongoose');
const PersonSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [
            true,
            "firstName is required"
        ]
    },
    lastName: {
        type: String,
        required: [
            true,
            "lastName is required"
        ]
    }    
}, { timestamps: true });
module.exports = mongoose.model('Person', PersonSchema);
