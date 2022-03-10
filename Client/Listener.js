/** @format */

const Discord = require("discord.js");
const Bot = require("./Bot.js");

/**
 * @template {keyof Discord.ClientEvents} K
 * @param {Bot} client
 * @param {Discord.ClientEvents[K]} eventArgs
 */
function RunFunction(client, ...eventArgs) {}

/**
 * @template {keyof Discord.ClientEvents} K
 */
class Listener {
	/**
	 * @param {K} event
	 * @param {RunFunction<K>} runFunction
	 */
	constructor(event, runFunction) {
		this.event = event;
		this.run = runFunction;
	}
}

module.exports = Listener;
