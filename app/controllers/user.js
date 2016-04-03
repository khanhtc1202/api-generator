'use strict';

module.exports = function(model) {

    var userCtrl = {};

    userCtrl.list = function (req, res, next) {
        var page = 1;
        if(req.params.page) {page = parseInt(req.params.page);}
        model.findPaginated({}, function (err, user) {
            if (err) { return next(err); }
            res.json(user.documents);  
        }, 10, page);
    };
    
    userCtrl.search = function(req, res, next) {
        model.find(req.query, function (err, user) {
            if (err) { return next(err); }
            res.json(user);  
        });
    }

    userCtrl.get = function (req, res, next) {
        model.findById(req.params.id, function (err, user) {
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
        model.findOneAndUpdate({_id: req.params.id}, req.body, function (err, user) {
            if (err) { return next(err); }
            res.json(user); 
        })
    }

    userCtrl.remove = function(req, res, next) {
        model.remove({ _id: req.params.id }, function (err) {
          if (err) return handleError(err);
          res.json({id: req.params.id, message: 'delete completed'});
        });
    }
    
    return userCtrl;
}