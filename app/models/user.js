module.exports = function(mongoose) {

	var Schema = mongoose.Schema;

	// create a schema
	var userSchema = new Schema({
		//Define schema object
		name: Object,
		username: String,
		
	}, {collection: 'user'});

	return mongoose.model('user', userSchema);
}
