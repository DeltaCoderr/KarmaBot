/* eslint-disable no-unused-vars */

module.exports = async (client) => {
	console.log('Fetching members.');
	for (const [id, guild] of client.guilds.cache) {
		await guild.members.fetch();
	}
	console.log('Fetched members.');
	console.log(`Logged in as ${client.user.tag}`);
};
