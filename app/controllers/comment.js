'use strict';

module.exports = function(model) {

    var commentCtrl = {};

    commentCtrl.list = function (req, res, next) {
        model.find({}, function (err, users) {
            if (err) { return next(err); }
            res.json(users);  
        });
    };
    
    commentCtrl.search = function(req, res, next) {
        model.find(req.query, function (err, users) {
            if (err) { return next(err); }
            res.json(users);  
        });
    }

    commentCtrl.get = function (req, res, next) {
        model.findById(req.params.uid, function (err, user) {
            if (err) { return next(err); }
            res.json(user);
        });
    };

    commentCtrl.post = function (req, res, next) {
        model.create(req.body, function (err, user) {
            if (err) { return next(err); }
            res.json(user);
        });
    };

    commentCtrl.put = function(req, res, next) {
        model.findOneAndUpdate({_id: req.body.uid}, req.body, function (err, user) {
            if (err) { return next(err); }
            res.json(user); 
        })
    }

    commentCtrl.remove = function(req, res, next) {
        model.remove({ _id: req.params.uid }, function (err) {
          if (err) return handleError(err);
          res.json({id: req.params.uid, message: 'delete completed'});
        });
    }
    
    return commentCtrl;
}