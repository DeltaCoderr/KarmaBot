require("dotenv").config();
const KarmaBot = require("./Structures/Client");

const client = new KarmaBot();

client.init(process.env.TOKEN);
