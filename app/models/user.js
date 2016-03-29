module.exports = function(mongoose) {

	var Schema = mongoose.Schema;
	var mongoosePages = require('mongoose-pages');

	// create a schema
	var userSchema = new Schema({
		//Define schema object
		name: Object,
		username: String,
		
	}, {collection: 'user'});
	mongoosePages.skip(userSchema); // makes the findPaginated() method available

	return mongoose.model('user', userSchema);
}
