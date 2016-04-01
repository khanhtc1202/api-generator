var config   = require('./config');
var MongoClient = require('mongodb').MongoClient;
var gulp = require('gulp'),
	template = require('gulp-template'),
    gulp_data = require('gulp-data'),
    rename = require('gulp-rename');

gulp.task('gen', function () {
    var adminData = {};
    MongoClient.connect(config.db, function(err, db) {
        db.listCollections({}).toArray().then(function(items) {

            items.forEach(function(item) {
                if(item.name.indexOf('.') < 0){ 
                    db.collection(item.name, function(err, col) {
                        col.findOne({}, function(err, data){
                            console.log('Schema table ' + item.name);
                            var value = genSchemaAndDataStructure(data);
                            adminData[item.name] = value.dataStructure;
                            genCtrl(item.name);
                            genModels(item.name, value.schema);
                        })
                    });
                }
            })
        });
        setTimeout(function(){
            genAdmin(adminData);
            console.log('Gen admin page completed!');
        },10000);
    });
});

function refineType(stringType) {
    return stringType.charAt(0).toUpperCase() + stringType.slice(1);
}

function genSchemaAndDataStructure(data){
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
    return {
        schema : schema,
        dataStructure : dataStructure
    }
}

function genCategoryContent(adminData) {
    var categoryContent ='';
    for(var key in adminData){
        var dataStructure = adminData[key];
        categoryContent += (key+'\n\tvar '+key+' = nga.entity(\''+key+'\').identifier(nga.field(\'_id\'));');
        categoryContent += genListViewContent(key, dataStructure);
        categoryContent += genCreateContent(key, dataStructure);
        categoryContent += genEditContent(key, dataStructure);
        categoryContent += '\n\t// ';
    }
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

function genCategoryEntity(adminData) {
    var categoryEntity = '';
    for(var key in adminData){
        categoryEntity += (key+'\n\tadmin.addEntity('+key+');\n\t// ');
    }
    return categoryEntity;
}

function genCategoryMenu(adminData) {
    var categoryMenu = '';
    for(var key in adminData){
        categoryMenu += (key+'\n\t\t.addChild(nga.menu('+key+').icon(\'<span class="glyphicon glyphicon-user"></span>\'))\n\t\t// ');
    }
    return categoryMenu;
}

function genAdmin(adminData) {
    gulp.src('./template/adminTemplate.js')
    .pipe(gulp_data(function (){
        return {
            categoryEntity : genCategoryEntity(adminData),
            categoryMenu : genCategoryMenu(adminData),
            categoryContent : genCategoryContent(adminData),
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
