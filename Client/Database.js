const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

mongoose
	.connect(process.env.MONGO, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(console.log("Connected to database!"));

const ChannelSchema = new Schema(
	{
		ID: {
			type: String,
		},
		data: {
			type: String,
		},
	},
	{ collection: "jsons" }
);

module.exports = mongoose.model("chatbot", ChannelSchema);
