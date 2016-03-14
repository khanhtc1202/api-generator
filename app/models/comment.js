module.exports = function(mongoose) {

	var Schema = mongoose.Schema;

	// create a schema
	var commentSchema = new Schema({
		owner: { type: String, required: true },
		post: Schema.Types.ObjectId,
		content: { type: String, required: true },
		posted: { type: Date, default: Date.now, required: true},
	});

	return mongoose.model('Comment', commentSchema);	
}
