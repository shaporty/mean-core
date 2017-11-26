var express = require('express');
var router = express.Router();
var placesCtrl = require("../../controllers/Api/places");
var authMid = require("../../middlewares/authentication");

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/add', authMid.authentication, authMid.role(["parent", "admin"]), placesCtrl.add);
router.post('/edit', authMid.authentication, authMid.role(["parent", "admin"]), placesCtrl.edit);
router.post('/detail', authMid.authentication, authMid.role(["parent", "admin"]), placesCtrl.detail);
router.post('/myplaces', authMid.authentication, authMid.role(["parent", "admin"]), placesCtrl.myplaces);

module.exports = router;