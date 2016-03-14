'use strict';

module.exports = function(model) {

    var userCtrl = {};

    userCtrl.list = function (req, res, next) {
        model.find({}, function (err, users) {
            if (err) { return next(err); }
            res.json(users);  
        });
    };
    
    userCtrl.search = function(req, res, next) {
        model.find(req.query, function (err, users) {
            if (err) { return next(err); }
            res.json(users);  
        });
    }

    userCtrl.get = function (req, res, next) {
        model.findById(req.params.uid, function (err, user) {
            if (err) { return next(err); }
            res.json(user);
        });
    };

    userCtrl.post = function (req, res, next) {
        model.create(req.body, function (err, user) {
            if (err) { return next(err); }
            res.json(user);
        });
    };

    userCtrl.put = function(req, res, next) {
        model.findOneAndUpdate({_id: req.body.uid}, req.body, function (err, user) {
            if (err) { return next(err); }
            res.json(user); 
        })
    }

    userCtrl.remove = function(req, res, next) {
        model.remove({ _id: req.params.uid }, function (err) {
          if (err) return handleError(err);
          res.json({id: req.params.uid, message: 'delete completed'});
        });
    }
    
    return userCtrl;
}