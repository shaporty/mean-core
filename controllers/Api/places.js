var config = require('../../config');
var placeMdl = require("../../models/place");

controller = {};

controller.add = function(req, res, next) {
    console.log(req.body);
    var place = new placeMdl();
    place.title = req.body.title;
    place.location = req.body.location;
    place.icon = req.body.icon;
    place.id = req.body.id;
    place.masters = [req.decoded._id];
    var error = place.validateSync();
    if (error) {
        res.send(error);
    } else {
        place.save(function(err,obj) {
            if (err)
                res.send(err)
            res.json({ success: true, message: "Place added" ,obj:obj});
        })
    }
}
controller.edit = function(req, res, next) {
    var obj = {};
    if (req.body.title) obj.title = req.body.title;
    if (req.body.icon) obj.icon = req.body.icon;
    if (req.body.location) obj.location = req.body.location;
    placeMdl.findByIdAndUpdate(req.body.id, obj, function(error, model) {
        if (error) throw error;
        res.json(model);
    });


}
controller.detail = function(req, res, next) {
    placeMdl.findOne({
        _id: req.body.id
    }, function(err, place) {
        if (err) throw err;
        if (!place) {
            res.json({ success: false, message: 'Authentication failed. Place not found.' });
        } else {
            res.json({
                _id: place._id,
                title: place.title,
                icon: place.icon,
                location: place.location
            });
        }

    });
}
controller.myplaces = function(req, res, next) {
    console.log(req.decoded._id);

    placeMdl.find({
        masters: req.decoded._id
    }, function(err, places) {
    console.log(places);

        if (err) throw err;
        res.json(places);
    });

}
controller.delete = function(req, res, next) {
    placeMdl.findByIdAndRemove(req.body.id, function(err, e) {
        if (err) throw err;
        res.json(e);
    });
}
module.exports = controller;