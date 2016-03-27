'use strict';

module.exports = function(model) {

    var <%= name %>Ctrl = {};

    <%= name %>Ctrl.list = function (req, res, next) {
        model.findPaginated({}, function (err, <%= name %>) {
            if (err) { return next(err); }
            res.json(<%= name %>.documents);  
        }, 10, parseInt(req.params.page));
    };
    
    <%= name %>Ctrl.search = function(req, res, next) {
        model.find(req.query, function (err, <%= name %>) {
            if (err) { return next(err); }
            res.json(<%= name %>);  
        });
    }

    <%= name %>Ctrl.get = function (req, res, next) {
        model.findById(req.params.id, function (err, <%= name %>) {
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
        model.findOneAndUpdate({_id: req.params.id}, req.body, function (err, <%= name %>) {
            if (err) { return next(err); }
            res.json(<%= name %>); 
        })
    }

    <%= name %>Ctrl.remove = function(req, res, next) {
        model.remove({ _id: req.params.id }, function (err) {
          if (err) return handleError(err);
          res.json({id: req.params.id, message: 'delete completed'});
        });
    }
    
    return <%= name %>Ctrl;
}