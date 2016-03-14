module.exports = function(mongoose) {

	var Schema = mongoose.Schema;

	// create a schema
	var postSchema = new Schema({
		title: { type: String, required: true},
		author: Schema.Types.ObjectId,
		body: { type: String, required: true},
		tag: Array,
		posted: { type: Date, default: Date.now, required:true},
	});

	return mongoose.model('Post', postSchema);	
}
