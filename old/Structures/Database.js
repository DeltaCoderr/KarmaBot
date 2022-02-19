const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

mongoose
	.connect(config.MongoURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(console.log('Connected to database!'));

const ChannelSchema = new Schema({
	_id : {
		type: ObjectId,
	},
	ID: {
		type: String,
	},
	data: {
		type: String,
	},
},
{ collection: 'jsons' });

module.exports = mongoose.model('chatbot', ChannelSchema);
