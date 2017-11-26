var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var placesSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    location: [String],
    icon: String,
    masters: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }],
});


module.exports = mongoose.model('Places', placesSchema);