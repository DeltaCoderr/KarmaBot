require("dotenv").config();
// const { KarmaClient } = require("./lib/KarmaClient");
const { SapphireClient } = require("@sapphire/framework");

const client = new SapphireClient({
	intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS", "GUILD_PRESENCE"],
});

client.start(process.env.TOKEN);
