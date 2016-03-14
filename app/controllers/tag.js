'use strict';

module.exports = function(model) {

    var tagCtrl = {};

    tagCtrl.list = function (req, res, next) {
        model.find({}, function (err, users) {
            if (err) { return next(err); }
            res.json(users);  
        });
    };

    tagCtrl.search = function(req, res, next) {
        model.find(req.query, function (err, users) {
            if (err) { return next(err); }
            res.json(users);  
        });
    }
    
    tagCtrl.get = function (req, res, next) {
        model.findById(req.params.uid, function (err, user) {
            if (err) { return next(err); }
            res.json(user);
        });
    };

    tagCtrl.post = function (req, res, next) {
        model.create(req.body, function (err, user) {
            if (err) { return next(err); }
            res.json(user);
        });
    };

    tagCtrl.put = function(req, res, next) {
        model.findOneAndUpdate({_id: req.body.uid}, req.body, function (err, user) {
            if (err) { return next(err); }
            res.json(user); 
        })
    }

    tagCtrl.remove = function(req, res, next) {
        model.remove({ _id: req.params.uid }, function (err) {
          if (err) return handleError(err);
          res.json({id: req.params.uid, message: 'delete completed'});
        });
    }

    
    return tagCtrl;
}