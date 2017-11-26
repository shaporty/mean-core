var config = require('../../config');
var scenarioMdl = require("../../models/scenario");

controller = {};

controller.add = function(req, res, next) {
    var scenario = new scenarioMdl();
    scenario.users = [req.decoded._id];
    scenario.title = req.body.title;
    scenario.equipments = req.body.equipments;
    var error = scenario.validateSync();
    if (error) {
        res.send(error);
    } else {
        scenario.save(function(err) {
            if (err)
                res.send(err)
            res.json({ success: true, message: "Scenario added" });
        })
    }
}
controller.edit = function(req, res, next) {
    var obj = {};
    if (req.body.title) obj.title = req.body.title;
    if (req.body.equipments) obj.equipments = req.body.equipments;
    scenarioMdl.findByIdAndUpdate(req.body.id, obj, function(error, model) {
        if (error) throw error;
        res.json(model);
    });
}
controller.detail = function(req, res, next) {
    scenarioMdl.findOne({
        _id: req.body.id
    }, function(err, scenario) {
        if (err) throw err;
        res.json(scenario);
    });
}
controller.myscenarios = function(req, res, next) {
    scenarioMdl.find({
        masters: req.decoded._id
    }, function(err, scenarios) {
        if (err) throw err;
        res.json(scenarios);
    });
}
module.exports = controller;