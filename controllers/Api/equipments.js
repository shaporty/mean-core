var config = require('../../config');
var eqMdl = require("../../models/equipment");

controller = {};

controller.add = function(req, res, next) {
    var eq = new eqMdl();
    eq.users = [req.decoded._id];
    eq.title = req.body.title;
    eq.code = req.body.code;
    eq.typeid = req.body.typeid;
    eq.placeid = req.body.placeid;
    eq.details = req.body.details;
    var error = eq.validateSync();
    if (error) {
        res.send(error);
    } else {
        eq.save(function(err) {
            if (err)
                res.send(err)
            res.json({ success: true, message: "Equipment added" });
        })
    }
}
controller.edit = function(req, res, next) {
    var obj = {};
    if (req.body.title) obj.title = req.body.title;
    if (req.body.code) obj.code = req.body.code;
    if (req.body.typeid) obj.typeid = req.body.typeid;
    if (req.body.placeid) obj.placeid = req.body.placeid;
    if (req.body.details) obj.details = req.body.details;
    eqMdl.findByIdAndUpdate(req.body.id, obj, function(error, model) {
        if (error) throw error;
        res.json(model);
    });
}
controller.detail = function(req, res, next) {
    eqMdl.findOne({
        _id: req.body.id
    }, function(err, equipment) {
        if (err) throw err;
        res.json(equipment);
    });
}
controller.myequipments = function(req, res, next) {
    eqMdl.find({
        masters: req.decoded._id
    }, function(err, equipments) {
        if (err) throw err;
        res.json(equipments);
    });
}
module.exports = controller;