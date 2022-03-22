const Discord = require("discord.js");
const KarmaBot = require("./Client");

/**
 * @template {keyof Discord.ClientEvents} K
 * @param {KarmaBot} client
 * @param {Discord.ClientEvents[K]} args
 */

function Run(client, ...args) {}

/**
 * @template {keyof Discord.ClientEvents} K
 */
class Listener {
	/**
	 * @param {K} event
	 * @param {Run<K>} run
	 */
	constructor(event, run) {
		this.event = event;
		this.run = run;
	}
}

module.exports = Listener;
