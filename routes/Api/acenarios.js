var express = require('express');
var router = express.Router();
var scenariosCtrl = require("../../controllers/Api/scenarios");
var authMid = require("../../middlewares/authentication");

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/add', authMid.authentication, authMid.role(["parent", "admin"]), scenariosCtrl.add);
router.post('/edit', authMid.authentication, authMid.role(["parent", "admin"]), scenariosCtrl.edit);
router.post('/detail', authMid.authentication, authMid.role(["parent", "admin"]), scenariosCtrl.detail);
router.post('/myequipments', authMid.authentication, authMid.role(["parent", "admin"]), scenariosCtrl.myscenarios);

module.exports = router;