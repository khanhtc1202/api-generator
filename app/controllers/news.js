'use strict';

module.exports = function(model) {

    var newsCtrl = {};

    newsCtrl.list = function (req, res, next) {
        model.find({}, function (err, news) {
            if (err) { return next(err); }
            res.json(news);  
        });
    };
    
    newsCtrl.search = function(req, res, next) {
        model.find(req.query, function (err, news) {
            if (err) { return next(err); }
            res.json(news);  
        });
    }

    newsCtrl.get = function (req, res, next) {
        model.findById(req.params.uid, function (err, news) {
            if (err) { return next(err); }
            res.json(news);
        });
    };

    newsCtrl.post = function (req, res, next) {
        model.create(req.body, function (err, news) {
            if (err) { return next(err); }
            res.json(news);
        });
    };

    newsCtrl.put = function(req, res, next) {
        model.findOneAndUpdate({_id: req.body.uid}, req.body, function (err, news) {
            if (err) { return next(err); }
            res.json(news); 
        })
    }

    newsCtrl.remove = function(req, res, next) {
        model.remove({ _id: req.params.uid }, function (err) {
          if (err) return handleError(err);
          res.json({id: req.params.uid, message: 'delete completed'});
        });
    }
    
    return newsCtrl;
}