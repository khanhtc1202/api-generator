'use strict';

module.exports = function(model) {

    var companyCtrl = {};

    companyCtrl.list = function (req, res, next) {
        var page = 1;
        if(req.params.page) {page = parseInt(req.params.page);}
        model.findPaginated({}, function (err, company) {
            if (err) { return next(err); }
            res.json(company.documents);  
        }, 10, page);
    };
    
    companyCtrl.search = function(req, res, next) {
        model.find(req.query, function (err, company) {
            if (err) { return next(err); }
            res.json(company);  
        });
    }

    companyCtrl.get = function (req, res, next) {
        model.findById(req.params.id, function (err, company) {
            if (err) { return next(err); }
            res.json(company);
        });
    };

    companyCtrl.post = function (req, res, next) {
        model.create(req.body, function (err, company) {
            if (err) { return next(err); }
            res.json(company);
        });
    };

    companyCtrl.put = function(req, res, next) {
        model.findOneAndUpdate({_id: req.params.id}, req.body, function (err, company) {
            if (err) { return next(err); }
            res.json(company); 
        })
    }

    companyCtrl.remove = function(req, res, next) {
        model.remove({ _id: req.params.id }, function (err) {
          if (err) return handleError(err);
          res.json({id: req.params.id, message: 'delete completed'});
        });
    }
    
    return companyCtrl;
}