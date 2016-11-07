var config = require('../config');
var jwt = require("jsonwebtoken");
var _ = require("underscore");
var userMdl = require("../models/user");
middleware = {}

middleware.authentication = function (req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.body.token|| req.params["token"] || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, config.secret, function (err, decoded) {
            if (err) {
                return res.json({status: false, message: 'Failed to authenticate token.'});
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });

    } else {

        // if there is no token
        // return an error
        return res.status(403).send({
            status: false,
            message: 'No token provided.'
        });
    }
}
middleware.role = function (roles) {
    return function (req, res, next) {
        userRole = req.decoded.role;
        if(_.isArray(roles)){
            if(_.indexOf(roles,userRole)===-1){
                res.send({status:false,messege:"Role rejected"});
            }else{
                next();
            }
        }else{
            if(userRole!=roles){
                res.send({status:false,messege:"Role rejected"});
            }else{
                next();
            }
        }
    }
}
middleware.UserExist = function (req, res, next) {//usage:SignUp
    userMdl.findOne({
        username: req.body.username
    }, function (err, user) {
        if (!user) {
            next();
        } else {
            res.send({success: false, message: "User exist!"});
        }
    })
}

module.exports = middleware;