module.exports = function(mongoose) {

	var Schema = mongoose.Schema;
	var mongoosePages = require('mongoose-pages');

	// create a schema
	var <%= name %>Schema = new Schema({
		//Define schema object
		<%= data %>
	}, {collection: '<%= name %>'});
	mongoosePages.skip(<%= name %>Schema); // makes the findPaginated() method available

	return mongoose.model('<%= name %>', <%= name %>Schema);
}
