require("dotenv").config();
const KarmaClient = require("./Library/KarmaClient");

const client = new KarmaClient({
	intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"],
});

(async () => await client.start(process.env.TOKEN))();
