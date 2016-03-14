module.exports = function(mongoose) {

	var Schema = mongoose.Schema;

	// create a schema
	var tagSchema = new Schema({
		name: { type: String, required: true },
	});

	return mongoose.model('Tag', tagSchema);	
}
