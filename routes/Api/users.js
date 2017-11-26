var express = require('express');
var router = express.Router();
var usersCtrl = require("../../controllers/Api/users");
var authMid = require("../../middlewares/authentication");

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/signup', authMid.UserExist, usersCtrl.signup);
router.post('/signin', usersCtrl.signin);
router.all('/authCheck', authMid.authentication, authMid.role(["user", "admin"]), usersCtrl.authCheck);

module.exports = router;