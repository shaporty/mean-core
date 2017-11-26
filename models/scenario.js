var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var scenariosSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    equipments: [{
        equipmentid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Equipments'
        },
        value: String,
        settings: [{
            name: String,
            value: String
        }],
        delay: Number,
        sort: Number
    }],
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }]
});



module.exports = mongoose.model('Scenarios', scenariosSchema);