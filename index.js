const Client = require("./Client/Bot"),
	client = new Client();

client.start(client.config.main.token);
