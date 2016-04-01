var MongoClient = require('mongodb').MongoClient;
var DB_CONFIG = require('./config/db.json');
var faker = require('faker');
var name = "name";
var func = "firstName";
// console.log(faker[name][func]());
MongoClient.connect("mongodb://" +DB_CONFIG.host + ":" + DB_CONFIG.port + "/" + DB_CONFIG.name, function(err, db) {
    if(err) { return console.dir(err); }
    
    DB_CONFIG.collections.forEach(function(_collection) {
        db.collection(_collection.name, function(err, collection) {
            for (var i = 0; i < 10; i ++) {
              var obj = {};
              _collection.schema.forEach(function (field) {  
                  switch (field.type) {
                      case 'String':
                            if (field.faker) {
                                obj[field.name] = faker[field.faker.split('.')[0]][field.faker.split('.')[1]]();  
                            } else {
                                obj[field.name] = faker.lorem.sentence();
                            }
                            break;
                      case 'Date' :
                            obj[field.name] = new Date();
                            break;
                      case 'Boolean' :
                            obj[field.name] = true;
                            break;
                  }
              })
              collection.insert(obj);  
            }
        });
    })

});
