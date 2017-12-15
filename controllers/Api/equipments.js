var config = require('../../config');
var eqMdl = require("../../models/equipment");
var eqMdl2 = require("../../models/equipment");

controller = {};

controller.savelog = function(req, res, next) {
    var equipmentid = req.body.equipmentid;
    var userid = req.body.userid;
    var pinname = req.body.pinname;
    var pinvalue = req.body.pinvalue;
    //console.log(req.body);


    eqMdl.update({ _id: equipmentid, 'pins.name': pinname }, {
            $push: {
                'pins.$.log': {
                    value: pinvalue,
                    date: new Date(),
                    user: userid
                }
            }
        },
        function(er, ob) {
            if (er != null) console.log(er);

        }
    );
    console.log("log saved eq_id =" + equipmentid);
    var us = req.app.settings.online_users;
    var socket = req.app.settings.socketioObj;
    eqMdl2.findOne({
        _id: equipmentid
    }, function(err, equipment) {
        if (err) throw err;
        for (let i1 = 0; i1 < equipment.users.length; i1++) {
            for (let i = 0; i < us.length; i++) {
                if (us[i].userid == equipment.users[i1]) {
                    var pobj = {
                        equipmentid: req.body.equipmentid,
                        userid: req.body.userid,
                        pinname: req.body.pinname,
                        pinvalue: req.body.pinvalue
                    };
                    us[i].socket.emit('lognotify', pobj);
                    console.log("smart device emited");
                }
            }
        }
        res.json({ success: "ok" });
    });


}
controller.add = function(req, res, next) {
    var eq = new eqMdl();
    eq.users = [req.decoded._id];
    eq.title = req.body.title;
    eq.cat = req.body.cat;
    eq.name = req.body.name;
    eq.placeid = req.body.placeid;
    eq.ip = req.body.ip;
    eq.key = req.body.key;
    console.log(req.body.pins);
    for (var i in req.body.pins) {
        var pin = {
            name: req.body.pins[i].name,
            status: req.body.pins[i].status,
            title: req.body.pins[i].title
        };
        eq.pins.push(pin);
    }

    var error = eq.validateSync();
    if (error) {
        res.send(error);
    } else {
        eq.save(function(err, obj) {
            if (err)
                res.send(err)
            res.json({ success: true, message: "Equipment added", obj: obj });
        })
    }
}
controller.edit = function(req, res, next) {
    var obj = {};
    if (req.body.title) obj.title = req.body.title;
    if (req.body.cat) obj.cat = req.body.cat;
    if (req.body.name) obj.name = req.body.name;
    if (req.body.placeid) obj.placeid = req.body.placeid;
    if (req.body.ip) obj.ip = req.body.ip;
    if (req.body.pins) obj.pins = req.body.pins;
    if (req.body.key) obj.key = req.body.key;
    eqMdl.findByIdAndUpdate(req.body._id, obj, function(error, model) {
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
        users: req.decoded._id
    }, function(err, equipments) {
        if (err) throw err;
        res.json(equipments);
    });
}
controller.delete = function(req, res, next) {
    eqMdl.findByIdAndRemove(req.body.id, function(err, e) {
        if (err) throw err;
        res.json(e);
    });
}
module.exports = controller;