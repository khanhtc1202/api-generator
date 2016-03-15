module.exports = function(mongoose) {

	var Schema = mongoose.Schema;

	// create a schema
	var newsSchema = new Schema({
		//Define schema object
		name: String,
		age: String,
		
	}, {collection: 'news'});

	return mongoose.model('news', newsSchema);
}
