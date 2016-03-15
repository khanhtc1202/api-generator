'use strict';

module.exports = function(model) {

    var <%= name %>Ctrl = {};

    <%= name %>Ctrl.list = function (req, res, next) {
        model.find({}, function (err, <%= name %>) {
            if (err) { return next(err); }
            res.json(<%= name %>);  
        });
    };
    
    <%= name %>Ctrl.search = function(req, res, next) {
        model.find(req.query, function (err, <%= name %>) {
            if (err) { return next(err); }
            res.json(<%= name %>);  
        });
    }

    <%= name %>Ctrl.get = function (req, res, next) {
        model.findById(req.params.uid, function (err, <%= name %>) {
            if (err) { return next(err); }
            res.json(<%= name %>);
        });
    };

    <%= name %>Ctrl.post = function (req, res, next) {
        model.create(req.body, function (err, <%= name %>) {
            if (err) { return next(err); }
            res.json(<%= name %>);
        });
    };

    <%= name %>Ctrl.put = function(req, res, next) {
        model.findOneAndUpdate({_id: req.body.uid}, req.body, function (err, <%= name %>) {
            if (err) { return next(err); }
            res.json(<%= name %>); 
        })
    }

    <%= name %>Ctrl.remove = function(req, res, next) {
        model.remove({ _id: req.params.uid }, function (err) {
          if (err) return handleError(err);
          res.json({id: req.params.uid, message: 'delete completed'});
        });
    }
    
    return <%= name %>Ctrl;
}