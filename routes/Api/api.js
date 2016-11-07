var express = require('express');
var router = express.Router();
var roles = require("../../middlewares/authentication");
var util = require('util');

/* GET home page. */
router.all('/',roles.role(["admin","user"]), function(req, res, next) {
  res.send(util.inspect(req.headers));
});

module.exports = router;
