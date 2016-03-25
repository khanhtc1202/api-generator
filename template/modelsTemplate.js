module.exports = function(mongoose) {

	var Schema = mongoose.Schema;

	// create a schema
	var <%= name %>Schema = new Schema({
		//Define schema object
		<%= data %>
	}, {collection: '<%= name %>'});

	return mongoose.model('<%= name %>', <%= name %>Schema);
}
