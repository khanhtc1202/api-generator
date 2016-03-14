module.exports = function(mongoose) {

	var Schema = mongoose.Schema;

	// create a schema
	var userSchema = new Schema({
		email: { type: String, required: true, unique: true },
		fullname: String,
		password: { type: String, required: true },
		isAdmin: Boolean
	});

	return mongoose.model('User', userSchema);	
}
