var config   = require('./config');
var MongoClient = require('mongodb').MongoClient;
var gulp = require('gulp'),
	template = require('gulp-template'),
    gulp_data = require('gulp-data'),
    rename = require('gulp-rename');
// var argv = require('yargs').argv;



gulp.task('gen', function () {
    MongoClient.connect(config.db, function(err, db) {
        db.listCollections({}).toArray().then(function(items) {

            items.forEach(function(item) {
                db.collection(item.name, function(err, col) {
                    col.findOne({}, function(err, data){
                        console.log('Schema table ' + item.name);
                        var schema = '';
                        for (var _k in data){
                            var a = Object.prototype.toString.call(data[_k]);
                            if(_k != '_id'){
                                schema += _k + ': ' + refineType(a) + ',\n\t\t';
                            }
                        }
                        genCtrl(item.name);
                        genModels(item.name, schema);
                    })
                });
            })
        });
    });
    
});

function refineType(stringType) {
    return stringType.replace('[object ','').replace(']','');
}

function genCtrl (name){
    gulp.src('./template/ctrlTemplate.js')
    .pipe(gulp_data(function (){
        return {name : name}
    }))
    .pipe(template())
    .pipe(rename(name+'.js'))
    .pipe(gulp.dest('./app/controllers/'));
}

function genModels (name, data){
    gulp.src('./template/modelsTemplate.js')
    .pipe(gulp_data(function (){
        return {name : name, data: data}
    }))
    .pipe(template())
    .pipe(rename(name+'.js'))
    .pipe(gulp.dest('./app/models/'));
}

// gulp.task('genCtrl', function () {
//     var name = argv.apiname;  
//     gulp.src('./template/ctrlTemplate.js')
//     .pipe(template({name: name}))
//     .pipe(rename(name+'.js'))
//     .pipe(gulp.dest('./app/controllers/'));
// });

// gulp.task('genModels', function () {
//     var name = argv.apiname;  
//     gulp.src('./template/modelsTemplate.js')
//     .pipe(template({name: name}))
//     .pipe(rename(name+'.js'))
//     .pipe(gulp.dest('./app/models/'));
// });

// gulp.task('gen', ['genCtrl', 'genModels']);