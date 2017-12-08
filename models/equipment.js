var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var equipmentsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    placeid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Places',
        required: true
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }],
    title:String,
    cat: String,
    ip: String,
    key: String,
    phone: String,
    sendcreadit: Boolean,
    online:Boolean,
    pins: [{
        name: String,
        status: String,
        title: String,
        log:[{
            value:String,
            date:Date,
            user:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Users',
            }
        }]
    }]
});

module.exports = mongoose.model('Equipments', equipmentsSchema);