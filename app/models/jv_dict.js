module.exports = function(mongoose) {

	var Schema = mongoose.Schema;

	// create a schema
	var jv_dictSchema = new Schema({
		//Define schema object
		status: Number,
		audio: Array,
		word: String,
		posibilities: Array,
		relatedWord: Array,
		
	}, {collection: 'jv_dict'});

	return mongoose.model('jv_dict', jv_dictSchema);
}
