var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var iottypesSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    icon: String,
    details: String,

});



module.exports = mongoose.model('Iottypes', iottypesSchema);