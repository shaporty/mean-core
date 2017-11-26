var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var equipmentsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    placeid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Places',
        required: true
    },
    code: {
        type: String,
    },
    typeid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Iottypes'
    },
    details: {
        ip: String,
        phone: String,
        sendcreadit: Boolean,
        pins: [{
            name: String,
            status: String
        }]
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }]
});

module.exports = mongoose.model('Equipments', equipmentsSchema);