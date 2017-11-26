var express = require('express');
var router = express.Router();
var equipmentsCtrl = require("../../controllers/Api/equipments");
var authMid = require("../../middlewares/authentication");

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/add', authMid.authentication, authMid.role(["parent", "admin"]), equipmentsCtrl.add);
router.post('/edit', authMid.authentication, authMid.role(["parent", "admin"]), equipmentsCtrl.edit);
router.post('/detail', authMid.authentication, authMid.role(["parent", "admin"]), equipmentsCtrl.detail);
router.post('/myequipments', authMid.authentication, authMid.role(["parent", "admin"]), equipmentsCtrl.myequipments);

module.exports = router;