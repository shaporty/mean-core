var jwt = require("jsonwebtoken");
var md5 = require('md5');

var config = require('../../config');

var userMdl = require("../../models/user");

controller = {};

controller.signup = function(req, res, next) {
    var usr = new userMdl();
    usr.username = req.body.username;
    usr.password = req.body.password;
    usr.role = "admin";
    usr.mobile = req.body.mobile;
    usr.email = req.body.email;
    var error = usr.validateSync();
    if (error) {
        res.send(error);
    } else {
        usr.save(function(err) {
            if (err)
                res.send(err)
            res.json({ success: true, message: "User added" });
        })
    }
}
controller.signin = function(req, res, next) {
    userMdl.findOne({
        username: req.body.username
    }, function(err, user) {

        if (err) throw err;

        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {

            // check if password matches
            if (user.password != md5(req.body.password)) {
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            } else {

                // if user is found and password is right
                // create a token
                usr = {};
                usr._id = user._id;
                usr.username = user.username;
                usr.role = user.role;
                var token = jwt.sign(usr, config.secret, {
                    expiresIn: 60 * 60 // expires in seconds
                });

                // return the information including token as JSON
                res.json({
                    success: true,
                    id:user._id,
                    username:user.username,
                    role:user.role,
                    token: token
                });
            }

        }

    });
}
controller.authCheck = function(req, res, next) {
    
    var date = new Date();
    var now = Math.round(date.getTime() / 1000);
    var left = req.decoded.exp - now;
    req.decoded.now = now;
    req.decoded.lft = left;
    res.send({ status: true, info: req.decoded });
}

module.exports = controller;