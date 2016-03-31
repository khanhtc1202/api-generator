var config   = require('./config');
var MongoClient = require('mongodb').MongoClient;
var gulp = require('gulp'),
	template = require('gulp-template'),
    gulp_data = require('gulp-data'),
    // copy = require('gulp-copy'),
    rename = require('gulp-rename');

gulp.task('gen', function () {
    adminInitialize();
    MongoClient.connect(config.db, function(err, db) {
        db.listCollections({}).toArray().then(function(items) {

            items.forEach(function(item) {
                if(item.name.indexOf('.') < 0){ 
                    db.collection(item.name, function(err, col) {
                        col.findOne({}, function(err, data){
                            console.log('Schema table ' + item.name);
                            var schema = '';
                            var dataStructure = [];
                            delete data['_id'];
                            for (var _k in data){
                                var dataType = typeof data[_k];
                                if(dataType != 'object'){
                                    schema += _k + ': ' + refineType(dataType) + ',\n\t\t';
                                    dataStructure.push({'name': _k , 'type': dataType});
                                }else{
                                    schema += _k + ': {\n';
                                    for(var key in data[_k]){
                                        schema += '\t\t\t' + key + ': ' + refineType(typeof data[_k][key]) + ',\n';
                                        dataStructure.push({'name': _k+'.'+key , 'type': typeof data[_k][key]});
                                    }
                                    schema += '\t\t},\n';
                                }
                            }
                            console.log(dataStructure);
                            genAdmin(item.name, dataStructure);
                            genCtrl(item.name);
                            genModels(item.name, schema);
                        })
                    });
                }
            })
        });
    });
});

function refineType(stringType) {
    return stringType.charAt(0).toUpperCase() + stringType.slice(1);
}

function genCategoryContent(categoryName, dataStructure) {
    var categoryContent;
    categoryContent = categoryName+'\n\tvar '+categoryName+' = nga.entity(\''+categoryName+'\').identifier(nga.field(\'_id\'));';
    categoryContent += genListViewContent(categoryName, dataStructure);
    categoryContent += genCreateContent(categoryName, dataStructure);
    categoryContent += genEditContent(categoryName, dataStructure);
    categoryContent += '\n\t// <%= categoryContent %>';
    return categoryContent;
}

function genListViewContent(categoryName, dataStructure) {
    var listViewContent = '\n\t'+categoryName+'.listView()\n\t\t.fields([';
    for(var item in dataStructure){
        listViewContent += '\n\t\t\tnga.field(\''+dataStructure[item]['name']+'\'),';
    }
    return listViewContent+'\n\t\t])'+'\n\t\t.listActions([\'edit\', \'delete\']);';
}

function genCreateContent(categoryName, dataStructure) {
    var createContent = '\n\t'+categoryName+'.creationView()\n\t\t.fields([';
    for(var item in dataStructure){
        createContent += '\n\t\t\tnga.field(\''+dataStructure[item]['name']+'\').validation({ required: true }),';
    }
    return createContent+'\n\t\t]);';
}

function genEditContent(categoryName, dataStructure) {
    return '\n\t'+categoryName+'.editionView().fields('+categoryName+'.creationView().fields());';
}

function genCategoryEntity(categoryName) {
    var categoryEntity;
    categoryEntity = categoryName+'\n\tadmin.addEntity('+categoryName+');\n\t// <%= categoryEntity %>';
    return categoryEntity;
}

function genCategoryMenu(categoryName) {
    var categoryMenu;
    categoryMenu = categoryName+'\n\t\t.addChild(nga.menu('+categoryName+').icon(\'<span class="glyphicon glyphicon-user"></span>\'))\n\t\t// <%= categoryMenu %>';
    return categoryMenu;
}

function genAdmin(categoryName, dataStructure) {
    gulp.src('./manager/admin.js')
    .pipe(gulp_data(function (){
        return {
            categoryEntity : genCategoryEntity(categoryName),
            categoryMenu : genCategoryMenu(categoryName),
            categoryContent : genCategoryContent(categoryName, dataStructure),
        }
    }))
    .pipe(template())
    .pipe(rename('admin.js'))
    .pipe(gulp.dest('./manager/'));
}

function copyFile(sourceFile, fileName, destFile) {
    gulp.src(sourceFile)
    .pipe(rename(fileName))
    .pipe(gulp.dest(destFile));
}

function adminInitialize() {
    gulp.src('./template/adminTemplate.js')
    .pipe(rename('admin.js'))
    .pipe(gulp.dest('./manager/'));
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

// function genCategoryManager(categoryName, showData, createData) {
//     gulp.src('./template/categoryTemplate.js')
//     .pipe(gulp_data(function (){
//         return {
//                 categoryName : categoryName,
//                 showData : showData,
//                 createData : createData
//                 }
//     }))
//     .pipe(template())
//     .pipe(rename(categoryName+'.js'))
//     .pipe(gulp.dest('./manager/'));
// }