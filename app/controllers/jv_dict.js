'use strict';

module.exports = function(model) {

    var jv_dictCtrl = {};

    jv_dictCtrl.list = function (req, res, next) {
        model.find({}, function (err, jv_dict) {
            if (err) { return next(err); }
            res.json(jv_dict);  
        });
    };
    
    jv_dictCtrl.search = function(req, res, next) {
        model.find(req.query, function (err, jv_dict) {
            if (err) { return next(err); }
            res.json(jv_dict);  
        });
    }

    jv_dictCtrl.get = function (req, res, next) {
        model.findById(req.params.uid, function (err, jv_dict) {
            if (err) { return next(err); }
            res.json(jv_dict);
        });
    };

    jv_dictCtrl.post = function (req, res, next) {
        model.create(req.body, function (err, jv_dict) {
            if (err) { return next(err); }
            res.json(jv_dict);
        });
    };

    jv_dictCtrl.put = function(req, res, next) {
        model.findOneAndUpdate({_id: req.body.uid}, req.body, function (err, jv_dict) {
            if (err) { return next(err); }
            res.json(jv_dict); 
        })
    }

    jv_dictCtrl.remove = function(req, res, next) {
        model.remove({ _id: req.params.uid }, function (err) {
          if (err) return handleError(err);
          res.json({id: req.params.uid, message: 'delete completed'});
        });
    }
    
    return jv_dictCtrl;
}