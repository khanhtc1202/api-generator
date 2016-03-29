module.exports = function(mongoose) {

	var Schema = mongoose.Schema;
	var mongoosePages = require('mongoose-pages');

	// create a schema
	var companySchema = new Schema({
		//Define schema object
		name: String,
		address: String,
		
	}, {collection: 'company'});
	mongoosePages.skip(companySchema); // makes the findPaginated() method available

	return mongoose.model('company', companySchema);
}
