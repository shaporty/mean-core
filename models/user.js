var md5 = require('md5');
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var usersSchema = new Schema({
    username: {
        type: String,
        minlength: [5, "username must more than 5 character"],
        required: true
    },
    password: {
        type: String,
        minlength: [8, "password must more than 8 character"],
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'reseller', 'parent', 'children']
    },
    email: {
        type: String,
    },
    mobile: {
        type: String,
        required: true
    }
});

usersSchema.pre('save', function(next) {
    this.password = md5(this.password);
    next();
});

module.exports = mongoose.model('Users', usersSchema);