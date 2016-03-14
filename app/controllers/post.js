'use strict';

module.exports = function(model) {

    var postCtrl = {};

    postCtrl.list = function (req, res, next) {
        model.find({}, function (err, users) {
            if (err) { return next(err); }
            res.json(users);  
        });
    };
    
    postCtrl.search = function(req, res, next) {
        model.find(req.query, function (err, users) {
            if (err) { return next(err); }
            res.json(users);  
        });
    }
    
    postCtrl.get = function (req, res, next) {
        model.findById(req.params.uid, function (err, user) {
            if (err) { return next(err); }
            res.json(user);
        });
    };

    postCtrl.post = function (req, res, next) {
        model.create(req.body, function (err, user) {
            if (err) { return next(err); }
            res.json(user);
        });
    };

    postCtrl.put = function(req, res, next) {
        model.findOneAndUpdate({_id: req.body.uid}, req.body, function (err, user) {
            if (err) { return next(err); }
            res.json(user); 
        })
    }

    postCtrl.remove = function(req, res, next) {
        model.remove({ _id: req.params.uid }, function (err) {
          if (err) return handleError(err);
          res.json({id: req.params.uid, message: 'delete completed'});
        });
    }
    
    return postCtrl;
}