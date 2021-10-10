const mongoose = require('mongoose');
const config = require('../Configs/config');

mongoose
	.connect(config.MongoURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(console.log('Connected to database!'));

const ChannelSchema = new mongoose.Schema({
	_id: {
		type: String,
	},
	chatbot: {
		type: String,
	},
});

module.exports = mongoose.model('chatbot', ChannelSchema);
